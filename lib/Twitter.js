'use strict';

require('dotenv').config();

const Twit = require('twit');

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY
  , consumer_secret: process.env.CONSUMER_SECRET
  , access_token: process.env.ACCESS_TOKEN
  , access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

module.exports = class Twitter {

  constructor() {
    this.count = 100;
  }

  tweet(params) {
    T.post('statuses/update', params, (err, data, response) => {
      if(err) console.log('err = ', err);
      console.log('statuses/update text => ', data.text);
    });
  }

  follow(params) {
    // var params = {user_id: opts.user_id, follow: true};
    T.post('friendships/create', params, (err, data, response) => {
      if(err) {
        console.log(err);
        return;
      }
      console.log(data);
    });
  }

  unfollow(params) {
    // var params = {user_id: opts.user_id};
    T.post('friendships/destroy', params, (err, data, response) => {
      if(err) {
        console.log(err);
        return;
      }
      console.log(data);
    });
  }
}