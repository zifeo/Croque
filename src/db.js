// @flow

import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import config from './config';

type Noon = Date;
type User = {
  lang: 'fr' | 'en' | 'both',
  firstname: string,
  name: string,
  email: string,
  lastSeen: string,
  reminder: boolean,
};

function noonToString(noon: Noon): string {
  return noon.toISOString().substr(0, 10);
}

function injectOps(db: Object): Object {
  /* eslint-disable no-param-reassign */

  db.getUser = async (email: string): Promise<Object> => db.get(['users', email]).value();

  db.getUsers = async (emails: Array<string>): Promise<Array<Object>> =>
    emails.map(email => db.get(['users', email]).value());

  db.updateUser = async (email: string, values: Object): Promise<void> => {
    const oldValues = await db.getUser(email);
    return db
      .set(['users', email], {
        lang: 'both',
        reminder: true,
        ...oldValues,
        ...values,
      })
      .write();
  };

  db.getMiam = async (noon: Noon): Promise<Array<Object>> => db.get(['miams', noonToString(noon)]).value();

  db.updateMiam = async (noon: Noon, values: Object): Promise<void> => {
    const oldValues = await db.getMiam(noon);
    return db
      .set(['miams', noonToString(noon)], {
        ...oldValues,
        ...values,
      })
      .write();
  };

  db.getReminderUsers = async (): Promise<Array<string>> =>
    db
      .get('users')
      .filter(u => u.reminder)
      .value();

  /* eslint-enable no-param-reassign */
  return db;
}

function lowdbFactory(): Promise<Object> {
  const file = new FileAsync(config.lowdb.file);
  return low(file).then(db => {
    db.defaults(config.lowdb.defaults).write();
    return injectOps(db);
  });
}

export default lowdbFactory;
export type { User };
