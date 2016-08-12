'use strict';

const fs           = require('fs');
const path         = require('path');
const axios        = require('axios');
const randomstring = require("randomstring");
const Moniker      = require('moniker');
const Twitter      = require('./Twitter');


// curl "http://npmsearch.com/query?q=a&fields=name,repository,rating&sort=rating:desc"
module.exports = class Odai {

  static generateAnnouncementTweet(packageName) {
    const npmUrl = 'https://www.npmjs.com/package/';
    return `${packageName}  ${npmUrl}${packageName}`;
  }

  static getToday() {
    const dt = new Date();
    const month = dt.getMonth() + 1;
    const date = dt.getDate();
    return `${month}/${date}`;
  }

  static generateSeed() {
    const patterns = [Moniker.adjective, Moniker.noun, Moniker.verb];
    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  static announce(odaiNumber) {
    const url = "http://npmsearch.com/query";

    // const keyword = randomstring.generate({length: 1, charset: 'alphabetic'});
    const words = Moniker.generator([this.generateSeed()]);
    const keyword = words.choose();
    console.log(keyword);

    const from = Math.floor(Math.random() * 100);
    const params = {
      params: {
        q: keyword,
        fields: 'name,repository,rating',
        sort: 'rating:desc',
        from: from
      }
    };

    axios.get(url, params)
    .then( response => {
      if(response.status !== 200) throw new Exception();

      const status = this.getToday() + ` ${odaiNumber}\n` + response.data.results.slice(0, 3).map( repository => this.generateAnnouncementTweet(repository.name) ).join("\n");

      new Twitter().tweet({status: status})
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });

  }
};
