'use strict';

//TODO: figure out how to deal with the HttpError

var blueprint = require ('@onehilltech/blueprint')
  ;

var usr = blueprint.app.models.User;
var posts = blueprint.app.models.Post;

class bucketMsg {
    constructor(post, author) {
        this.post = post;
        this.author = author;
    }
}

class bucketHolder {
    constructor(tag) {
        this.tag = tag;
        this.msgList = [];
    }
}

module.exports = UserController;

function UserController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (UserController);

UserController.prototype.showMe = function () {
  return function (req, res, callback) {
    posts.find({userID: req.user.id}, 'postText postTime postTags userID', function (err, result) {
      if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));
      usr.findOne({_id: req.user.id}, 'tags', function (err, buckets) {
        if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));
          posts.find( { postTags: { $in: req.user.tags } }, 'postText postTime postTags userID', function (err, bucketPosts) {
              if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));

              var bucketList = [];
              var insertPost;
              var postAuthor;

              for (var i = 0; i < buckets.tags.length; i++) {
                  var currentBucket = new bucketHolder(buckets.tags[i]);
                  for (var j = 0; j < bucketPosts.length; j++) {
                      if (buckets.tags[i] == bucketPosts[j].postTags) {
                          insertPost = bucketPosts[j];
                          //currentBucket.bucketPosts.push(bucketPosts[j]);
                          if (bucketPosts[j].userID === req.user.id) {
                              postAuthor = "You";
                          } else {
                              postAuthor = "Someone else";
                          }
                          var currentMsg = new bucketMsg(insertPost, postAuthor);
                          currentBucket.msgList.push(currentMsg);
                      }
                  }
                  bucketList.push(currentBucket);
              }

              res.render('user.handlebars', {user: req.user, msg: result, buckets: buckets.tags, bucketList: bucketList});
          }).lean();
      }).lean();
    }).lean();
  }
};

UserController.prototype.createBucket = function () {
    return {
        execute: function(req, res, callback) {
            var bucketName = req.body.bucketTag;
            usr.findOne( {_id: req.user.id}, function (err, usr) {
                if (err) throw err;
                usr.tags.push(bucketName.toLowerCase());
                usr.save(function (err){
                    if (err) throw err;
                });
            });
            res.redirect('/users/me');
        }
    }
};