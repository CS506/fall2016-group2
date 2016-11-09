/**
 * Created by brandon on 11/2/16.
 */
var blueprint = require ('@onehilltech/blueprint')
    , HttpError = blueprint.errors.HttpError
    ;

var Post = require ('../models/Post.js')
    ;

function PostController () {
    blueprint.BaseController.call (this);
}

blueprint.controller (PostController);

PostController.prototype.createPost = function () {
    return function (req, res, next) {
        //initialize an empty post
        var msg = {};

        if (req.body.postText) {
            msg.postText = req.body.postText;
            Post.create(msg, function (err, newpost) {
                if (err) { return next(err); }
                if (!newpost) { return res.sendStatus(500); }
                return res.sendStatus(201);
            });
        }
        else { return res.sendStatus(400); }
    };
};

module.exports = PostController;

