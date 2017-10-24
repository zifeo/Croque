// @flow

import moment from 'moment-timezone';
import config from './config';

function computeNextNoon() {
  let nextNoon = moment.tz(config.tz);
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

export { computeNextNoon };
