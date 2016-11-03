'use strict';

var blueprint = require ('@onehilltech/blueprint')
  ;

//var usr = blueprint.app.models.User;
var posts = blueprint.app.models.Post;


module.exports = UserController;

function UserController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (UserController);

UserController.prototype.showMe = function () {
  return function (req, res, callback) {
      //var msg = usr.getUserPosts();
      posts.find({userID: req.user.id}, 'postText postTime', function (err, result) {
          //TODO: figure out how to deal with this HttpError
          if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));

          res.render('user.handlebars', {user: req.user, msg: result});
          //res.render ('user.handlebars', {user: req.user, msg: msg});
      });
  }
}

// UserController.prototype.getUserPosts = function () {
//     return {
//         execute: function (req, res, callback) {
//
//             //user.find({userID: "bob"}, 'postText postTime', function (err, result) {
//                 user.find({username: "bob"}, function (err, result) {
//                 if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));
//
//                 res.status (200).json (result);
//                 return callback(null);
//             });
//         }
//     };
// };