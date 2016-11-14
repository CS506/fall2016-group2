'use strict';

var blueprint = require('@onehilltech/blueprint')
  , winston = require('winston')
;

var User = blueprint.app.models.User
  , Post = blueprint.app.models.Post
;


function UserController() {
    blueprint.BaseController.call(this);
}

blueprint.controller(UserController);

UserController.prototype.showMe = function () {
    return function (req, res, callback) {
        var tags = req.user.tags
          , bucketList = {}
          , currentTime = Date.now()
        ;
        
        // Get posts for user's tags and 
        Post.getPostsByTags(tags, function (err, postList) {
            if (err) { return callback(err); }
            winston.log('info', postList);
            res.render('user.handlebars', {
                user: req.user,
                bucketList: postList
            });
        });
    }
};

UserController.prototype.addBucket = function () {
    return function (req, res, callback) {
        var bucketName = req.body.bucketTag;
        req.user.tags.push(bucketName.toLowerCase());
        req.user.save(function (err) {
            if (err) return res.sendStatus(500);
        });
        res.redirect('/home');
    }
};

module.exports = UserController;