// @flow

import moment from 'moment-timezone';
import seedrandom from 'seedrandom';
import assert from 'assert';

import config from './config';
import type { User } from './db';

function computeNoon() {
  return moment
    .tz(config.tz)
    .hours(12)
    .minutes(15)
    .seconds(0)
    .milliseconds(0);
}

function computeNextNoon() {
  // returns next noon by skipping weekend
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

function decompose3or4(n: number): ?Array<number> {
  // returns [a, b] for n = 3a + 4b or null
  if (n <= 2) {
    return null;
  }

  let m3 = (n - n % 3) / 3;
  let m4 = 0;

  for (; m3 >= 0; m3 -= 1, m4 += 1) {
    if (m3 * 3 + m4 * 4 === n) {
      return [m3, m4];
    }
  }

  assert(n === 5);
  return null;
}

function group3or4or5<T>(elems: Array<T>, opts: Array<T>) {
  // returns [[group1, group2, ...], opts left] for group1 of 3, 4 or 5 completed with opts or null
  if (elems.length + opts.length < 3) {
    return null;
  }

  if (elems.length === 5 && opts.length === 0) {
    return [[elems], opts];
  }

  let added = 0;
  let decomposition = decompose3or4(elems.length);
  while (!decomposition && added < opts.length) {
    added += 1;
    decomposition = decompose3or4(elems.length + added);
  }

  assert(!!decomposition);
  const [n3, n4] = decomposition;
  const pool = elems.concat(opts.slice(0, added));
  const groups = [];

  let n = 0;
  for (; n < n3 * 3; n += 3) {
    groups.push(pool.slice(n, n + 3));
  }
  for (; n < n3 * 3 + n4 * 4; n += 4) {
    groups.push(pool.slice(n, n + 4));
  }

  return [groups, opts.slice(added)];
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

function matchMaking(users: Array<User>) {
  // returns [groupsEn, groupsFr, cancelled] for groups of users
  const seed = new Date().toISOString().slice(0, 10);
  const rand = randomFactory(seed);

  const usersEn = rand.shuffle(users.filter(u => u.lang === 'en'));
  const usersFr = rand.shuffle(users.filter(u => u.lang === 'fr'));
  const usersAny = rand.shuffle(users.filter(u => u.lang === 'both'));

  const groupsEn = group3or4or5(usersEn, usersAny);
  const usersFrWithLeft = usersFr.concat(groupsEn ? groupsEn[1] : usersAny);
  const groupsFr = group3or4or5(usersFrWithLeft, []);

  return [
    groupsEn ? groupsEn[0] : [],
    groupsFr ? groupsFr[0] : [],
    [].concat(!groupsEn ? usersEn : []).concat(!groupsFr ? usersFrWithLeft : []),
  ];
}

export { computeNoon, computeNextNoon, matchMaking, randomFactory, group3or4or5, decompose3or4 };
