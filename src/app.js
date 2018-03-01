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
import { computeNextNoon, computeNoon, findGroups } from './helpers';
import { happyEmail, sadEmail } from './emails';
import locations from './locations';
import lowdbFactory from './db';
import config from './config';

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
  const beat = new Cron.CronJob(
    '00 00 12 * * 1-5',
    async () => {
      winston.info('Beat');
      const noon = computeNoon();
      const miam = await db.getMiam(noon);
      if (!miam) {
        return;
      }

      const { joiners } = miam;
      const users = await db.getUsers(joiners);
      const [groupsEn, groupsFr, usersCancelled] = findGroups(users);

      const assignments = groupsEn.concat(groupsFr).map((group, i) => {
        const location = locations[i % locations.length];
        winston.info(`assigning group ${i} at ${location.id} for ${group.map(u => `${u.uniqueid}:${u.lang}`)}`);
        for (const user of group) {
          const others = group.filter(u => u.uniqueid !== user.uniqueid).map(u => u.firstname);
          const message = {
            to: user.email,
            subject: 'Today Croque lunch!',
            text: happyEmail(user.firstname, others, location),
          };
          transporter.sendMail(message).then(winston.info);
        }
        return {
          location: location.id,
          users: group.map(u => u.uniqueid),
        };
      });

      const cancelled = usersCancelled.map(user => {
        winston.warn(`cancelling ${user.uniqueid} (${user.lang}`);
        const message = {
          to: user.email,
          subject: 'Today Croque lunch!',
          text: sadEmail(user.firstname),
        };
        transporter.sendMail(message).then(winston.info);
        return user.uniqueid;
      });

      await db.updateMiam(noon, {
        assignments,
        cancelled,
      });
    },
    null,
    false,
    config.tz
  );
  beat.start();

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
    res.locals.nextNoon = nextNoon.format('dddd D MMM');
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
