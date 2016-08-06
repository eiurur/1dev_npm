'use strict';

const fs = require('fs');
const path = require('path');
const Odai = require('./Odai');

// curl "http://npmsearch.com/query?q=a&fields=name,repository,rating&sort=rating:desc"
module.exports = class OneDevNpm {
  static announce() {
    Odai.announce();
  }
};
