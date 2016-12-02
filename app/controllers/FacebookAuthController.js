var blueprint = require("@onehilltech/blueprint");
var passport = require("passport");
//var User = blueprint.app.models.User;

function FacebookAuthController () {
    blueprint.BaseController.call(this);
}

blueprint.controller(FacebookAuthController);

//function facebookAuth

FacebookAuthController.prototype.facebookAuth = function () {
    return function (req, res, next) {
        passport.authenticate("facebook", function (err, user) {
            if(err) {
                return res.status(500).render("login.handlebars", {
                    error: "Internal Server Error."
                });
            }
            if(!user) {
                return res.status(422).render("login.handlebars", {
                    error: "Invalid Username or Password."
                });
            }
        })(req, res, next);
    };
};

//function facebookCallback
FacebookAuthController.prototype.facebookCallback = function () {
    return function(req, res, next) {
        passport.authenticate("facebook", function(err, user){
            if(err){
                return res.status(500).render("login.handlebars", {
                    error: "Facebook auth error"
                });
            }
            if(!user) {
                return res.status(422).render("login.handlebars", {
                    error: "User not found."
                });
            }
            req.logIn(user, function (err) {
                if(err) { return next(err); }
                req.session.save(() => {
                    res.redirect("/home");
                })
            });
        })(req, res, next);
    }
};

module.exports = FacebookAuthController;