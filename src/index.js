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

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  Raven.config('', {
    release: 'latest',
  }).install();
}

const port = 9000;
const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {},
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

app.get('/', (req, res) => res.render('main'));

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!(name && email && message) || message.indexOf('viagra') > -1) {
    res.status(400).send('0');
  } else {
    const mail = {
      replyTo: `"${name}" ${email}`,
      subject: `Web · message de ${name}`,
      text: message,
    };
    transporter.sendMail(mail, err => {
      if (err) {
        winston.error('mail failure:', err);
        res.status(502).send('0');
      } else {
        winston.info('mail sent to', mail.replyTo);
        res.status(200).send('1');
      }
    });
  }
});

if (isProduction) {
  // must be last
  app.use(Raven.errorHandler());
}

app.use((req, res) => res.redirect('/'));

app.listen(port, () => {
  winston.info('Running on', port);
});
