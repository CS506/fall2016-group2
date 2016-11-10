'use strict';

var mongodb = require ('@onehilltech/blueprint-mongodb')
  , validator = require('validator')
  ;

var schema = new mongodb.Schema({
    username: {
        index: { unique: true },
        type: String,
        required: true,
        trim: true,
        validate: [
            validator.isAlphanumeric,
            validator.isLowercase
        ]
    },
    password: {type: String, required: true},
    tags: { type: Array }
});

// The password should be encrypted and stored in the database.

schema.methods.verifyPassword = function (password) {
  return this.password === password;
};

const COLLECTION_NAME = 'users';
module.exports = mongodb.model (COLLECTION_NAME, schema);
