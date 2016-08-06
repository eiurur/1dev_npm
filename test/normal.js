'use strict';

const assert = require('assert');
const OneDevNpm = require('../lib/OneDevNpm');

describe('normal', () => {
  it('Odai announce', (done) => {
    OneDevNpm.announce();
    assert(1 === 1);
    // .then(result => done());
  });
});
