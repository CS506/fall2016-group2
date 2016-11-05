var blueprint = require('@onehilltech/blueprint')
  , User = require('../models/User')
  , passport = require('passport')
  ;

function AuthController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (AuthController);

AuthController.prototype.login = function () {
    return function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return res.sendStatus(422);
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.redirect(200, '/users/me');
            });
        })(req, res, next);
    };
};

AuthController.prototype.logout = function () {
  return function (req, res) {
    req.logout ();
    res.redirect(200, '/login');
  }
};

AuthController.prototype.createAccount = function () {
    return function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        if (username && password) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return next(err); }
                if (user) { return res.sendStatus(409); }
                User.create({ username: username, password: password }, function (createErr, newuser) {
                    if (createErr) { return next(createErr); }
                    if (!newuser) { return res.sendStatus(500); }
                    return res.sendStatus(201);
                })
            })
        } else { return res.sendStatus(400); }
    }
}

module.exports = AuthController;
