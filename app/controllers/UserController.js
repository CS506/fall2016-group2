'use strict';

//TODO: figure out how to deal with the HttpError

var blueprint = require('@onehilltech/blueprint')
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

function UserController() {
    blueprint.BaseController.call(this);
}

blueprint.controller(UserController);

UserController.prototype.showMe = function () {
    return function (req, res, callback) {

        function sortPosts(buckets, postsForBuckets) {
            var bucketList = [];
            var postToInsert;
            var postAuthor;

            for (var i = 0; i < buckets.length; i++) {
                var currentBucket = new bucketHolder(buckets[i]);
                for (var j = 0; j < postsForBuckets.length; j++) {
                    if (buckets[i] == postsForBuckets[j].postTags) {
                        postToInsert = postsForBuckets[j];
                        var currentPost = new bucketPost(postToInsert, postAuthor);
                        currentBucket.msgList.push(currentPost);
                    }
                }
                bucketList.push(currentBucket);
            }
            return bucketList;
        }

        posts.find({createdBy: req.user._id}, 'postText tags', function (err, result) {
            if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));
            posts.find({postTags: {$in: req.user.tags}}, 'postText postTime postTags userID', function (err,postList) {
                if (err) return callback(new HttpError(500, 'Cannot retrieve posts'));

                var bucketList = sortPosts(req.user.tags, postList);

                res.render('user.handlebars', {
                    user: req.user,
                    msg: result,
                    buckets: req.user.tags,
                    bucketList: bucketList
                });
            }).lean(); //Using lean so Mongo returns JSON objects that are easier to read from
        }).lean();
    }
};

UserController.prototype.createBucket = function () {
    return {
        execute: function (req, res, callback) {
            var bucketName = req.body.bucketTag;
            usr.findOne({_id: req.user.id}, function (err, usr) {
                if (err) throw err;
                usr.tags.push(bucketName.toLowerCase());
                usr.save(function (err) {
                    if (err) throw err;
                });
            });
            res.redirect('/users/me');
        }
    }
};