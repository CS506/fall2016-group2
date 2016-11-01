/**
 * Created by brandon on 11/1/16.
 */

var blueprint = require ('@onehilltech/blueprint')
    ;

function NewUserController () {
    blueprint.BaseController.call (this);
}

blueprint.controller (NewUserController);

NewUserController.prototype.createUser = function () {
    return function (req, res) {
        res.render('newUser.handlebars', {username: req.body.username, password: req.body.password});
    };
};

module.exports = NewUserController;

