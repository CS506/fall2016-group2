var blueprint = require("@onehilltech/blueprint");
var passport = require("passport");
var User = blueprint.app.models.User;

function AuthController() {
  blueprint.BaseController.call(this);
}

blueprint.controller(AuthController);

AuthController.prototype.login = function () {
  return function (req, res, next) {
    passport.authenticate("local", function (err, user) {
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
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/home");
      });
    })(req, res, next);
  };
};

AuthController.prototype.logout = function () {
  return function (req, res) {
    req.logout();
    res.redirect("/login");
  };
};

AuthController.prototype.createAccount = function () {
  return function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
      User.findOne({username: username}, function (err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          return res.sendStatus(409);
        }
        User.create({username: username, password: password}, function (createErr, newuser) {
          if (createErr) {
            return next(createErr);
          }
          if (!newuser) {
            return res.sendStatus(500);
          }
          // return res.sendStatus(201);
          res.redirect("/login");
        });
      });
    } else {
      return res.sendStatus(400);
    }
  };
};

module.exports = AuthController;
