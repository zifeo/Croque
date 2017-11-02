// @flow

import 'babel-polyfill';
import chai from 'chai';
import Chance from 'chance';
import _ from 'lodash';
import { matchMaking, decompose3or4, group3or4or5 } from '../src/helpers';
import type { User } from '../src/db';

const chance = new Chance();

function forgeUser(uniqueid: string, lang: string): User {
  return {
    lang,
    slug: chance.word(),
    firstname: chance.first(),
    name: chance.last(),
    uniqueid,
    email: chance.email(),
    lastSeen: chance.date().toISOString(),
  };
}

const should = chai.should();

describe('Match making', () => {
  describe('when decomposing a number by 3 or 4', async () => {
    it('should return null for 0, 1, 2, 5', async () => {
      should.not.exist(decompose3or4(0));
      should.not.exist(decompose3or4(1));
      should.not.exist(decompose3or4(2));
      should.not.exist(decompose3or4(5));
    });

    it('should find a decomposition otherwise', async () => {
      for (let n = 3; n < 1000; n += 1) {
        if (n !== 5) {
          const sol = decompose3or4(n);
          should.exist(sol);
          const [a, b] = sol;
          (3 * a + 4 * b).should.equal(n);
        }
      }
    });
  });

  describe('when composing group', async () => {
    it('should fail for 0, 1, 2', async () => {
      should.not.exist(group3or4or5([], []));
      should.not.exist(group3or4or5([1], []));
      should.not.exist(group3or4or5([1, 2], []));
      should.not.exist(group3or4or5([1], [2]));
      should.not.exist(group3or4or5([], [1, 2]));
    });

    it('should find optimal groups', async () => {
      // FIX by using sat solver
      // decompose3or4([1, 2, 3], [4]).should.deep.equal([[1, 2, 3, 4], []]);
      // decompose3or4([1, 2, 3], [4, 5]).should.deep.equal([[1, 2, 3, 4, 5], []]);
    });

    it('should find groups without additional', async () => {
      for (let n = 3; n < 1000; n += 1) {
        const elems = _.range(n);
        const sol = group3or4or5(elems, []);
        should.exist(sol);
        const [groups, left] = sol;
        left.should.deep.equal([]);
        groups.should.have.lengthOf.at.least(Math.floor(n / 3));
        _.flatten(groups).should.deep.equal(elems);
      }
    });

    it('should find groups with one additional', async () => {
      for (let n = 2; n < 1000; n += 1) {
        const elems = _.range(n);
        const opts = _.range(1);
        const sol = group3or4or5(elems, opts);
        should.exist(sol);
        const [groups, left] = sol;
        groups.should.have.lengthOf.at.least(Math.floor(n / 3));
        _.flatten(groups)
          .concat(left)
          .should.deep.equal(elems.concat(opts));
      }
    });

    it('should find groups with additional', async () => {
      for (let n = 0; n < 1000; n += 1) {
        const elems = _.range(n);
        const opts = _.range(10);
        const sol = group3or4or5(elems, opts);
        should.exist(sol);
        const [groups, left] = sol;
        left.should.have.lengthOf.at.least(7);
        groups.should.have.lengthOf.at.least(Math.floor(n / 3));
        _.flatten(groups)
          .concat(left)
          .should.deep.equal(elems.concat(opts));
      }
    });
  });

  describe('when grouping users', async () => {
    it('should not loose any user', async () => {
      for (let x = 0; x < 10; x += 1) {
        const frs = _.range(x).map(u => forgeUser(u, 'fr'));
        for (let y = 0; y < 10; y += 1) {
          const ens = _.range(y).map(u => forgeUser(u, 'en'));
          for (let z = 0; z < 10; z += 1) {
            const anys = _.range(z).map(u => forgeUser(u, 'both'));

            const users = frs.concat(ens).concat(anys);
            const sol = matchMaking(users);
            const [groupsEn, groupsFr, cancelled] = sol;
            _.flattenDeep(sol).should.deep.members(users);

            if (y >= 3) {
              groupsEn.should.have.lengthOf.at.least(Math.floor(y / 3));
              _.flatten(groupsEn).should.deep.include.members(ens);
            }

            if (x >= 3) {
              groupsFr.should.have.lengthOf.at.least(Math.floor(x / 3));
              _.flatten(groupsFr).should.deep.include.members(frs);
            }

            if (x + z < 3) {
              cancelled.should.have.lengthOf.at.least(x);
            }

            if (y + z < 3) {
              cancelled.should.have.lengthOf.at.least(y);
            }
          }
        }
      }
    });
  });
});
