// @flow

import logger from './logger';

import { computeTodayNoon, oldRequestAssignments, requestAssignments } from './helpers';
import { happyEmail, sadEmail, reminderEmail } from './emails';
import locations from './locations';

function lunchCron(db: Object, transporter: Object): Function {
  return async () => {
    logger.info('Lunch beat');
    const noon = computeTodayNoon();

    let matching = [];
    let cancelled = [];

    try {
      ({ matching, cancelled } = await requestAssignments(db, noon));
    } catch (e) {
      logger.error(`unable to use new assignment using old ${e}`);
      ({ matching, cancelled } = await oldRequestAssignments(db, noon));
    }

    const assignments = (await Promise.all(matching.map(db.getUsers))).map((group, i) => {
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

    const cancellation = (await db.getUsers(cancelled)).map(user => {
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
      cancelled: cancellation,
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
