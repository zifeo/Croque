// @flow

import winston from 'winston';

import { computeTodayNoon, findGroups } from './helpers';
import { happyEmail, sadEmail, reminderEmail } from './emails';
import locations from './locations';

function lunchCron(db: Object, transporter: Object): Function {
  return async () => {
    winston.info('Lunch beat');
    const noon = computeTodayNoon();
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
          subject: 'Croque lunch!',
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
      winston.warn(`cancelling ${user.uniqueid} (${user.lang})`);
      const message = {
        to: user.email,
        subject: 'Croque lunch!',
        text: sadEmail(user.firstname),
      };
      transporter.sendMail(message).then(winston.info);
      return user.uniqueid;
    });

    await db.updateMiam(noon, {
      assignments,
      cancelled,
    });
  };
}

function reminderCron(db: Object, transporter: Object): Function {
  return async () => {
    winston.info('Reminder beat');

    const users = await db.getReminderUsers();

    users.forEach(user => {
      winston.info(`reminder for ${user.uniqueid} (${user.lang})`);
      const message = {
        to: user.email,
        subject: 'Reminder: Croque lunch!',
        text: reminderEmail(user.firstname),
      };
      transporter.sendMail(message).then(winston.info);
    });
  };
}

export { lunchCron, reminderCron };
