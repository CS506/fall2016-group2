/**
 * Created by brandon on 11/1/16.
 */

var blueprint = require ('@onehilltech/blueprint')
    , HttpError = blueprint.errors.HttpError
    ;

var User = require ('../models/User.js')
    ;

function NewUserController () {
    blueprint.BaseController.call (this);
}

blueprint.controller (NewUserController);

NewUserController.prototype.createUser = function () {
    var self = this;

    return {

        execute: function (req, res, callback) {
            var usr = new User({
                username: req.body.username,
                password: req.body.password
            });

            usr.save(function (err) {
                if (err) return callback(new HttpError(500, 'Failed to create new user'));

                res.render('login.handlebars');
            });
        }
    };
};

module.exports = NewUserController;

