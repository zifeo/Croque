// @flow

import logger from './logger';

import { computeTodayNoon, findGroups } from './helpers';
import { happyEmail, sadEmail, reminderEmail } from './emails';
import locations from './locations';

function lunchCron(db: Object, transporter: Object): Function {
  return async () => {
    logger.info('Lunch beat');
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
      logger.info(`assigning group ${i} at ${location.id} for ${group.map(u => `${u.email}:${u.lang}`)}`);
      for (const user of group) {
        const others = group.filter(u => u.email !== user.email).map(u => `${u.firstname} (${u.email})`);
        const message = {
          to: user.email,
          subject: 'Croque lunch!',
          text: happyEmail(user.firstname, others, location),
        };
        transporter.sendMail(message).catch(logger.error);
      }
      return {
        location: location.id,
        users: group.map(u => u.email),
      };
    });

    const cancelled = usersCancelled.map(user => {
      logger.warn(`cancelling ${user.email} (${user.lang})`);
      const message = {
        to: user.email,
        subject: 'Croque lunch!',
        text: sadEmail(user.firstname),
      };
      transporter.sendMail(message).catch(logger.error);
      return user.email;
    });

    await db.updateMiam(noon, {
      assignments,
      cancelled,
    });
  };
}

function reminderCron(db: Object, transporter: Object): Function {
  return async () => {
    logger.info('Reminder beat');

    const users = await db.getReminderUsers();

    users.forEach(user => {
      logger.info(`reminder for ${user.email} (${user.lang})`);
      const message = {
        to: user.email,
        subject: 'Reminder: Croque lunch!',
        text: reminderEmail(user.firstname),
      };
      transporter.sendMail(message).catch(logger.error);
    });
  };
}

export { lunchCron, reminderCron };
