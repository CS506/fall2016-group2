"use strict";

var mongodb = require("@onehilltech/blueprint-mongodb");
var validator = require("validator");

var schema = new mongodb.Schema({
  username: {
    index: { unique: true },
    type: String,
    required: true,
    trim: true,
    validate: validator.isAlphanumeric
  },

    // removed the required parameter for now
  password: {type: String},
  serviceId: {type: String},

  tags: {
    type: [String],
    lowercase: true
  }
});

// The password should be encrypted and stored in the database.

schema.methods.verifyPassword = function (password) {
  return this.password === password;
};

module.exports = mongodb.model("users", schema);
