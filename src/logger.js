// @flow

import winston from 'winston';
import config from './config';

const logger = winston.createLogger({
  level: config.production ? 'info' : 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
