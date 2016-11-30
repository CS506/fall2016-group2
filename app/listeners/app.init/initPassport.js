"use strict";

var passport = require("passport")
    , config = require("../../configs/oauth.js")
    , LocalStrategy = require("passport-local").Strategy
    , FacebookStrategy = require('passport-facebook').Strategy;

module.exports = initPassport;

function initPassport (app) {
  var User = app.models.User;
  var opts = {session: true};

  passport.use(new LocalStrategy(opts, authorize));

  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
  },
      function(accessToken, refreshToken, profile, done) {
          User.findOne( {serviceId: profile.id}, function (error, user) {
              if (error) {
                  return done(err);
              }

              if(!user) {
                  user = new User({
                      //Remove whitespace from the display name
                      username: profile.displayName.replace(/\s/g, ''),
                      serviceId: profile.id
                  });
                  user.save(function(err) {
                      if (err) console.log(err);
                      return done(err, user);
                  });
              } else {
                  return done(null, user);
              }
          });
      }
  ));

  function authorize (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
}
