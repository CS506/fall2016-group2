'use strict';

var mongodb = require ('@onehilltech/blueprint-mongodb')
  ;

var posts = require ('../models/Post');

var schema = new mongodb.Schema({
  username: {unique: true, type: String, required: true, trim: true},
  password: {type: String, required: true},
  tags: {type: [String], required: false}
});

// The password should be encrypted and stored in the database.

schema.methods.verifyPassword = function (password) {
  return this.password === password;
};

const COLLECTION_NAME = 'users';
module.exports = mongodb.model (COLLECTION_NAME, schema);
