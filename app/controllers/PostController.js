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

        if (req.body.postText && req.user) {
            msg.postText = req.body.postText;
            msg.createdBy = req.user._id;
            msg.postTime = new Date();
            Post.create(msg, function (err, newpost) {
                if (err) { return next(err); }
                if (!newpost) { return res.sendStatus(500); }
                return res.redirect('/users/me');
            });
        }
        else { return res.sendStatus(400); }
    };
};


module.exports = PostController;

