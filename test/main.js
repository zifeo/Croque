// @flow

import 'babel-polyfill';

import chai from 'chai';

const should = chai.should();

describe('Test', () => {
  describe('when', async () => {
    it('should work', async () => {
      const a = 1;
      should.exist(a);
      a.should.equal(1);
    });
  });
});
