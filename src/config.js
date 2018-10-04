// @flow

const config = {
  production: process.env.NODE_ENV === 'production',
  url: process.env.CROQUE_URL,
  port: 9000,
  raven: process.env.CROQUE_RAVEN,
  tz: 'Europe/Zurich',
  tequila: {
    service: 'Croque',
    request: ['uniqueid', 'name', 'firstname', 'email'],
    allows: 'categorie=shibboleth',
    // require: "group=student"
  },
  lowdb: {
    file: 'db/db.json',
    defaults: {
      users: {},
      miams: {},
    },
  },
  session: {
    secret: process.env.CROQUE_SECRET,
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  nodemailer: {
    mail: {
      from: process.env.CROQUE_MAIL_FROM,
      replyTo: process.env.CROQUE_MAIL_REPLY_TO,
    },
    pool: {
      pool: true,
      maxConnections: 5,
      maxMessages: 200,
      rateLimit: 8,
      rateDelta: 1000,
      host: process.env.CROQUE_MAIL_HOST,
      port: process.env.CROQUE_MAIL_PORT,
    },
  },
  handlebars: {
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      lang(lang: Object, options: ?Object) {
        if (options) {
          const { user } = options.data.root;
          return user && user.lang === lang ? 'checked' : '';
        }
        return lang.data.root.user.lang;
      },
    },
  },
};

export default config;
