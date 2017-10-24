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
import expressSession from 'express-session';
import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import moment from 'moment-timezone';

const tz = "Europe/Zurich"

function computeNextNoon() {
  let nextNoon = moment.tz(tz);
  if (nextNoon.isoWeekday() === 6) {
    nextNoon = nextNoon.add(2, 'd');
  } else if (nextNoon.isoWeekday() === 7) {
    nextNoon = nextNoon.add(1, 'd');
  }
  if (nextNoon.hours() >= 12) {
    if (nextNoon.isoWeekday() === 5) {
      nextNoon = nextNoon.add(3, 'd');
    } else {
      nextNoon = nextNoon.add(1, 'd');
    }
  }
  return nextNoon
    .hours(12)
    .minutes(15)
    .seconds(0)
    .milliseconds(0);
}

low(new FileAsync('db.json')).then(db => {
  db
    .defaults({
      users: {},
      miams: {},
    })
    .write();

  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    Raven.config('', {
      release: 'latest',
    }).install();
  }

  const tequilaStrategy = new tequilaPassport.Strategy({
    service: 'Croque',
    request: ['uniqueid', 'name', 'firstname', 'email'],
    // require: "group=openstack-sti"
  });
  passport.use(tequilaStrategy);
  passport.serializeUser((tequilaInfo, done) => {
    const { id, tequila } = tequilaInfo;
    const { firstname, name, uniqueid, email } = tequila;
    const user = db.get(['users', uniqueid]).value();
    db
      .set(['users', uniqueid], {
        lang: 'both',
        ...user,
        slug: id,
        firstname,
        name,
        uniqueid,
        email,
        lastSeen: moment.tz(tz).toISOString(),
      })
      .write()
      .then(() => done(null, uniqueid), err => done(err, uniqueid));
  });

  passport.deserializeUser((id, done) => {
    const user = db.get(['users', id]).value();
    done(null, user);
  });
  // myStrategy.globalLogout("/")

  const port = 9000;
  const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      lang(lang, options) {
        if (options) {
          return options.data.root.user.lang === lang ? 'checked' : '';
        }
        return lang.data.root.user.lang;
      },
    },
  });

  const poolConfig = {
    pool: true,
    host: 'mail.infomaniak.com',
    port: 587,
    requireTLS: true,
    auth: {
      user: 'cluster@zifeo.com',
      pass: 'Mwxn_C8yIYEn',
    },
  };

  const mailConfig = {
    from: 'cluster@zifeo.com',
  };

  const transporter = nodemailer.createTransport(poolConfig, mailConfig);
  transporter.verify((err, success) => {
    if (err) {
      winston.error('mail transport failure:', err);
    } else {
      winston.info('mail transport ready:', success);
    }
  });

  const app = express();
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'views'));
  app.enable('trust proxy');
  if (isProduction) {
    app.enable('view cache');
    // must first use
    app.use(Raven.requestHandler());
  } else {
    app.disable('view cache');
  }
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(compression());
  app.use(
    expressSession({
      secret: 'MSMj3XUex1X9V4et9Uqaz8KlsUajRYPHNPShK8x',
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.user = req.user;
    const nextNoon = computeNextNoon();
    req.nextNoon = nextNoon.toISOString();
    res.locals.nextNoon = nextNoon.format('dddd d MMM');
    res.locals.nextNoonToNow = nextNoon.fromNow();
    res.locals.joining = !req.user
      ? false
      : db
          .get(['miams', req.nextNoon])
          .includes(req.user.uniqueid)
          .value();
    next();
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
      const user = db.get(['users', uniqueid]).value();
      db
        .set(['users', uniqueid], {
          ...user,
          lang,
        })
        .write()
        .then(() => res.redirect('/'));
    }
  });
  app.get('/joining', tequilaStrategy.ensureAuthenticated, (req, res) => {
    const { uniqueid } = req.user;
    const miam = ['miams', req.nextNoon];
    const upsert = db.has(miam).value() ? Promise.resolve() : db.set(miam, []).write();
    upsert.then(() =>
      db
        .get(miam)
        .push(uniqueid)
        .write()
        .then(() => res.redirect('/'))
    );
  });
  app.get('/pending', tequilaStrategy.ensureAuthenticated, (req, res) => {
    const { uniqueid } = req.user;
    db
      .get(['miams', req.nextNoon])
      .remove(u => u === uniqueid)
      .write()
      .then(() => res.redirect('/'));
  });

  app.use('/', express.static(path.join(__dirname, 'static')));

  if (isProduction) {
    // must be last
    app.use(Raven.errorHandler());
  }
  app.use((req, res) => res.redirect('/'));

  app.listen(port, () => {
    winston.info('Running on', port);
  });
});
