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

function PostController () {
    blueprint.BaseController.call (this);
}

blueprint.controller (PostController);

PostController.prototype.createPost = function () {
    
    //initialize an empty post
    var msg = {
        postText: 'a',
        tags: [0],
        userID: 'a',
        postTime: Date.now(),
        startTime: Date.now(),
        stopTime: Date.now()+20,
        scheduled: false,
        deleted: false
    };

    return function (req, res) {
        msg.postText = req.body.postText;
        Post.create(msg);
    };
};

module.exports = PostController;

