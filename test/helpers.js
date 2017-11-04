// @flow

import 'babel-polyfill';
import chai from 'chai';
import Chance from 'chance';
import _ from 'lodash';
import { findGroups, decompose345, findDecomposition } from '../src/helpers';
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
    it('should return null for 0, 1, 2', async () => {
      should.not.exist(decompose345(0));
      should.not.exist(decompose345(1));
      should.not.exist(decompose345(2));
    });

    it('should find a decomposition for 5', async () => {
      decompose345(5).should.deep.equal([0, 0, 1]);
    });

    it('should find a decomposition otherwise', async () => {
      for (let n = 3; n < 1000; n += 1) {
        if (n !== 5) {
          const sol = decompose345(n);
          should.exist(sol);
          const [a, b, c] = sol;
          (3 * a + 4 * b + 5 * c).should.equal(n);
        }
      }
    });
  });

  describe('when composing group', async () => {
    it('should fail for 0, 1, 2', async () => {
      should.not.exist(findDecomposition(0, 0, 0));
      should.not.exist(findDecomposition(1, 0, 0));
      should.not.exist(findDecomposition(2, 0, 0));
      should.not.exist(findDecomposition(0, 1, 0));
      should.not.exist(findDecomposition(0, 2, 0));
      should.not.exist(findDecomposition(0, 0, 1));
      should.not.exist(findDecomposition(0, 0, 2));
      should.not.exist(findDecomposition(1, 1, 0));
      should.not.exist(findDecomposition(0, 1, 1));
      should.not.exist(findDecomposition(1, 0, 1));
    });

    it('should find groups without additional', async () => {
      for (let e = 3; e < 100; e += 1) {
        for (let f = 3; f < 100; f += 1) {
          const sol = findDecomposition(e, f, 0);
          should.exist(sol);
        }
      }
    });

    it('should find groups with additional', async () => {
      for (let e = 3; e < 50; e += 1) {
        for (let f = 3; f < 50; f += 1) {
          for (let a = 3; a < 50; a += 1) {
            const sol = findDecomposition(e, f, a);
            should.exist(sol);
          }
        }
      }
    });
  });

  describe('when grouping users', async () => {
    it('should not loose any user', async () => {
      for (let x = 0; x < 10; x += 1) {
        const frs = _.range(x).map(u => forgeUser(u, 'fr'));
        for (let y = 0; y < 10; y += 1) {
          const ens = _.range(y).map(u => forgeUser(100 + u, 'en'));
          for (let z = 0; z < 10; z += 1) {
            const anys = _.range(z).map(u => forgeUser(200 + u, 'both'));

            const users = frs.concat(ens).concat(anys);
            const sol = findGroups(users);
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
