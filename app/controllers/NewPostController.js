/**
 * Created by brandon on 11/2/16.
 */

var blueprint = require ('@onehilltech/blueprint')
    , HttpError = blueprint.errors.HttpError
    ;

var Post = require ('../models/Post.js')
    ;

var User = require ('../models/User.js')
    ;

function NewPostController () {
    blueprint.BaseController.call (this);
}

blueprint.controller (NewPostController);

NewPostController.prototype.createPost = function () {
    var self = this;

    return {

        execute: function (req, res, callback) {
            var msg = new Post({
                postText: req.body.postText,
                postTags: req.body.tag.toLowerCase(),
                userID: req.user.id,
                postTime: Date.now(),
                scheduled: false,
                deleted: false
            });

            msg.save(function (err, msg) {
                if (err) return callback(new HttpError(500, 'Failed to create new post'));

                res.redirect('/users/me');
            });
        }
    };
};

module.exports = NewPostController;

