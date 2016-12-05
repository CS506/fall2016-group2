"use strict";

// The oauth.js file will need to be created and configured. See ouathExample.js for details
var passport = require("passport");
var config = require("../../configs/oauth.js");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = initPassport;

function initPassport(app) {
    var User = app.models.User;
    var opts = {session: true};

    passport.use(new LocalStrategy(opts, authorize));

    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function (token, tokenSecret, profile, done) {
            User.findOne({serviceId: profile.id}, function (error, user) {
                if (error) {
                    return done(error);
                }

                if (!user) {
                    user = new User({
                        // Remove whitespace from the display name
                        username: profile.displayName.replace(/\s/g, ""),
                        serviceId: profile.id
                    });
                    user.save(function (err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(null, user);
                }
            });
        }
    ));

    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({serviceId: profile.id}, function (error, user) {
                if (error) {
                    return done(error);
                }

                if (!user) {
                    user = new User({
                        // Remove whitespace from the display name
                        username: profile.displayName.replace(/\s/g, ""),
                        serviceId: profile.id
                    });
                    user.save(function (err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(null, user);
                }
            });
        }
    ));

    function authorize(username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
}
