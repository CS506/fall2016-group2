'use strict';

var blueprint = require ('@onehilltech/blueprint')
  ;

var usr = blueprint.app.models.User;
var posts = blueprint.app.models.Post;


module.exports = UserController;

function UserController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (UserController);

UserController.prototype.showMe = function () {
  return function (req, res, callback) {
    posts.find({userID: req.user.id}, 'postText postTime postTags', function (err, result) {
      if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));
      usr.findOne({_id: req.user.id}, 'tags', function (err, buckets) {
        //TODO: figure out how to deal with this HttpError
        if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));
        res.render('user.handlebars', {user: req.user, msg: result, buckets: buckets.tags});
      });
    });
  }
};

UserController.prototype.createBucket = function () {
    return {
        execute: function(req, res, callback) {
            var bucketName = req.body.bucketTag;
            usr.findOne( {_id: req.user.id}, function (err, usr) {
                if (err) throw err;
                usr.tags.push(bucketName);
                usr.save(function (err){
                    if (err) throw err;
                });
            });
            res.redirect('/users/me');
        }
    }
};