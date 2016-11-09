'use strict';

//TODO: figure out how to deal with the HttpError

var blueprint = require ('@onehilltech/blueprint')
  ;

var usr = blueprint.app.models.User;
var posts = blueprint.app.models.Post;

class bucketPost {
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
// TODO: redo this whole function. Take out findAuthors(), start using unique usernames instead of user ids
      function findAuthors(buckets, postsForBuckets) {
          var bucketList = [];
          var postToInsert;
          var postAuthor;

          // TODO: remove this
          // This whole part can be removed, the user name is already a property of req.user
          for (var i = 0; i < buckets.tags.length; i++) {
              var currentBucket = new bucketHolder(buckets.tags[i]);
              for (var j = 0; j < postsForBuckets.length; j++) {
                  if (buckets.tags[i] == postsForBuckets[j].postTags) {
                      postToInsert = postsForBuckets[j];
                      //currentBucket.bucketPosts.push(bucketPosts[j]);
                      if (postsForBuckets[j].userID === req.user.id) {
                          postAuthor = "You";
                      } else {
                          postAuthor = "Someone else";
                      }
                      var currentPost = new bucketPost(postToInsert, postAuthor);
                      currentBucket.msgList.push(currentPost);
                  }
              }
              bucketList.push(currentBucket);
          }
          return bucketList;
      }

      // This is a big ball of callback hell that needs to be separated
      // TODO: The username is already part of req.user, so the outer call can be removed
      posts.find({userID: req.user.id}, 'postText postTime postTags userID', function (err, result) {
      if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));
      usr.findOne({_id: req.user.id}, 'tags', function (err, buckets) {
        if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));
          posts.find( { postTags: { $in: req.user.tags } }, 'postText postTime postTags userID', function (err, postsForBukets) {
              if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));

              var bucketList = findAuthors(buckets, postsForBukets);

              res.render('user.handlebars', {user: req.user, msg: result, buckets: buckets.tags, bucketList: bucketList});
          }).lean(); //Using lean so Mongo returns JSON objects that are easier to read from
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