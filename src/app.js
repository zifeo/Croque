// @flow

import 'babel-polyfill';

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import winston from 'winston';
import Raven from 'raven';
import nodemailer from 'nodemailer';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import passport from 'passport';
import tequilaPassport from 'passport-tequila';
import session from 'cookie-session';
import moment from 'moment-timezone';
import _ from 'lodash';
import Cron from 'cron';
import { computeNextNoon } from './helpers';
import lowdbFactory from './db';
import config from './config';
import { lunchCron, reminderCron } from './crons';

if (config.production) {
  Raven.config(config.raven, {
    release: 'latest',
  }).install();
}

process.on('unhandledRejection', err => {
  winston.error(err);
  if (config.production) {
    Raven.captureException(err);
  }
});

process.on('SIGINT', () => {
  process.exit();
});

const transporter = nodemailer.createTransport(config.nodemailer.pool, config.nodemailer.mail);
transporter.verify((err, success) => {
  if (err) {
    winston.error('mail transport failure:', err);
  } else {
    winston.info('mail transport ready:', success);
  }
});

lowdbFactory().then(db => {
  const lunchBeat = new Cron.CronJob('00 00 12 * * 2,4', lunchCron(db, transporter), null, false, config.tz);
  lunchBeat.start();

  //const reminderBeat = new Cron.CronJob('00 00 10 * * 2,4', reminderCron(db, transporter), null, false, config.tz);
  //reminderBeat.start();

  const tequilaStrategy = new tequilaPassport.Strategy(config.tequila);
  passport.use(tequilaStrategy);
  passport.serializeUser((tequilaInfo, done) => {
    const { id, tequila } = tequilaInfo;
    const { firstname, name, uniqueid, email } = tequila;
    db
      .updateUser(uniqueid, {
        slug: id,
        firstname,
        name,
        uniqueid,
        email,
        lastSeen: moment.tz(config.tz).toISOString(),
      })
      .then(() => done(null, uniqueid), err => done(err, uniqueid));
  });
  passport.deserializeUser((id, done) => {
    db.getUser(id).then(user => done(null, user));
  });

  const app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  app.engine('hbs', expressHandlebars.create(config.handlebars).engine);
  app.enable('trust proxy');

  if (config.production) {
    app.enable('view cache');
    // must be first use
    app.use(Raven.requestHandler());
  } else {
    app.disable('view cache');
  }

  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(compression());
  app.use(session(config.session));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.user = req.user;
    const nextNoon = computeNextNoon();
    req.nextNoon = nextNoon;
    res.locals.nextNoon = nextNoon.format('dddd D MMMM');
    res.locals.nextNoonToNow = nextNoon.fromNow();

    db.getMiam(nextNoon).then(noon => {
      res.locals.joining = !req.user ? false : noon && noon.joiners.includes(req.user.uniqueid);
      next();
    });
  });

  app.get('/', (req, res) => res.render('main'));

  app.get('/drink', tequilaStrategy.ensureAuthenticated, (req, res) => res.redirect('/'));
  app.get('/sober', tequilaStrategy.globalLogout('/'));

  app.get('/lang/:lang', tequilaStrategy.ensureAuthenticated, (req, res, next) => {
    const { lang } = req.params;
    const { uniqueid } = req.user;
    if (lang !== 'fr' && lang !== 'en' && lang !== 'both') {
      next();
    } else {
      db.updateUser(uniqueid, { lang }).then(() => res.redirect('/'));
    }
  });

  app.get('/subscribe', tequilaStrategy.ensureAuthenticated, (req, res) => {
    const { uniqueid } = req.user;
    db.updateUser(uniqueid, { reminder: true }).then(() => res.redirect('/'));
  });
  app.get('/unsubscribe', tequilaStrategy.ensureAuthenticated, (req, res) => {
    const { uniqueid } = req.user;
    db.updateUser(uniqueid, { reminder: false }).then(() => res.redirect('/'));
  });

  app.get('/joining', tequilaStrategy.ensureAuthenticated, (req, res) => {
    const { uniqueid } = req.user;

    db.getMiam(req.nextNoon).then(noon => {
      const joiners = _.uniq(((noon && noon.joiners) || []).concat(uniqueid));
      db.updateMiam(req.nextNoon, { joiners }).then(() => res.redirect('/'));
    });
  });
  app.get('/pending', tequilaStrategy.ensureAuthenticated, (req, res) => {
    const { uniqueid } = req.user;

    db.getMiam(req.nextNoon).then(noon => {
      const joiners = (noon && noon.joiners.filter(u => u !== uniqueid)) || [];
      db.updateMiam(req.nextNoon, { joiners }).then(() => res.redirect('/'));
    });
  });

  app.use('/', express.static(path.join(__dirname, 'static')));

  if (config.production) {
    // must be last
    app.use(Raven.errorHandler());
  }

  app.use((req, res) => res.redirect('/'));

  app.listen(config.port, () => {
    winston.info('Running on', config.port);
  });
});
