var blueprint = require("@onehilltech/blueprint");
var passport = require("passport");

function GoogleAuthController () {
  blueprint.BaseController.call(this);
}

blueprint.controller(GoogleAuthController);

// function googleAuth
GoogleAuthController.prototype.googleAuth = function () {
  return function (req, res, next) {
    //passport.authenticate("google", {scope: "https://www.googleapis.com/auth/plus.login" }, function (err, user) {
    passport.authenticate("google", {scope: "profile" }, function (err, user) {
      if (err) {
        return res.status(500).render("login.handlebars", {
          error: "Internal Server Error."
        });
      }
      if (!user) {
        return res.status(422).render("login.handlebars", {
          error: "Invalid Username or Password."
        });
      }
    })(req, res, next);
  };
};

// function googleCallback
GoogleAuthController.prototype.googleCallback = function () {
  return function (req, res, next) {
    passport.authenticate("google", function (err, user) {
      if (err) {
        return res.status(500).render("login.handlebars", {
          error: "Google auth error"
        });
      }
      if (!user) {
        return res.status(422).render("login.handlebars", {
          error: "User not found."
        });
      }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        req.session.save(() => {
          res.redirect("/home");
        });
      });
    })(req, res, next);
  };
};

module.exports = GoogleAuthController;
