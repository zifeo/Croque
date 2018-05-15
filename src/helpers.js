// @flow

import moment from 'moment-timezone';
import seedrandom from 'seedrandom';
import assert from 'assert';
import _ from 'lodash';
import config from './config';
import type { User } from './db';

function setToNoon(date) {
  return date
    .hours(12)
    .minutes(10)
    .seconds(0)
    .milliseconds(0);
}

function computeTodayNoon() {
  return setToNoon(moment.tz(config.tz));
}

function computeNextNoon() {
  // returns next noon by skipping weekend
  const d = moment.tz(config.tz);

  switch (d.isoWeekday()) {
    case 1:
      return setToNoon(d.add(1, 'd'));

    case 2:
      return setToNoon(d.hours() < 11 && d.minutes() < 30 ? d : d.add(2, 'd'));

    case 3:
      return setToNoon(d.add(1, 'd'));

    case 4:
      return setToNoon(d.hours() < 11 && d.minutes() < 30 ? d : d.add(5, 'd'));

    case 5:
      return setToNoon(d.add(4, 'd'));

    case 6:
      return setToNoon(d.add(3, 'd'));

    case 7:
      return setToNoon(d.add(2, 'd'));

    default:
      throw new Error('inconsistent weekday');
  }
}

function randomFactory(seed: string) {
  const random = seedrandom(seed);
  const between = (min: number, max: number) => Math.round(random() * (max - min) + min);
  const shuffle = (arr: Array<any>) => {
    const ret = [...arr];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = between(0, i);
      const s = ret[i];
      ret[i] = ret[j];
      ret[j] = s;
    }
    return ret;
  };
  return { random, between, shuffle };
}

function decompose345(n: number): ?Array<number> {
  // returns [a, b, c] for n = 3a + 4b + 5c or null
  // by preferring a, then b and last c

  if (n <= 2) {
    return null;
  }

  if (n === 5) {
    return [0, 0, 1];
  }

  for (let m3 = Math.floor(n / 3), m4 = 0; m3 >= 0; m3 -= 1, m4 += 1) {
    if (m3 * 3 + m4 * 4 === n) {
      return [m3, m4, 0];
    }
  }

  throw new Error('invalid decompose345 detected');
}

function findDecomposition(nEn: number, nFr: number, nAny: number): ?Array<number> {
  // returns balanced number in [0, nAny] as the number of any to balance with fr

  if (nEn + nFr + nAny <= 2) {
    return null;
  }

  let ret = null;
  let max = 0;
  let balance = nAny;

  for (; balance >= 0; balance -= 1) {
    const [ae, be, ce] = decompose345(nEn + nAny - balance) || [0, 0, 0];
    const [af, bf, cf] = decompose345(nFr + balance) || [0, 0, 0];
    const score = 3 * (ae + af) + 4 * (be + bf) + 5 * (ce + cf);
    if (score > max) {
      max = score;
      ret = balance;
    }
  }

  return ret;
}

function makeGroup(users: Array<User>): Array<Array<User>> {
  // returns [group1, group2, ...] for group of 3, 4 or 5

  if (users.length === 0) {
    return [];
  }

  const decomposition = decompose345(users.length);
  if (!decomposition) {
    return [];
  }

  const [n3, n4, n5] = decomposition;
  assert(n3 * 3 + n4 * 4 + n5 * 5 === users.length);
  const groups = [];

  let n = 0;
  for (; n < n3 * 3; n += 3) {
    groups.push(users.slice(n, n + 3));
  }
  for (; n < n3 * 3 + n4 * 4; n += 4) {
    groups.push(users.slice(n, n + 4));
  }
  for (; n < n3 * 3 + n4 * 4 + n5 * 5; n += 5) {
    groups.push(users.slice(n, n + 5));
  }
  return groups;
}

function findGroups(users: Array<User>): Array<User> {
  // returns [groupsEn, groupsFr, cancelled] for groups of users
  const seed = new Date().toISOString().slice(0, 10);
  const rand = randomFactory(seed);

  const usersEn = rand.shuffle(users.filter(u => u.lang === 'en'));
  const usersFr = rand.shuffle(users.filter(u => u.lang === 'fr'));
  const usersAny = rand.shuffle(users.filter(u => u.lang === 'both'));

  const balance = findDecomposition(usersEn.length, usersFr.length, usersAny.length);
  const poolEn = balance !== null ? usersEn.concat(usersAny.splice(balance)) : usersEn;
  const poolFr = balance !== null ? usersFr.concat(usersAny.splice(0, balance)) : usersFr;

  const groupsEn = makeGroup(poolEn);
  const groupsFr = makeGroup(poolFr);
  const cancelled = _.difference(users, _.flatten(groupsEn.concat(groupsFr)));

  return [groupsEn, groupsFr, cancelled];
}

export { computeTodayNoon, computeNextNoon, decompose345, findDecomposition, makeGroup, findGroups };
