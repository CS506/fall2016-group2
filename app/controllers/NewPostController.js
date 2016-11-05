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
    
    //initialize an empty post
    var msg = new Post({
        postText: 'a',
        postHashTags: [0],
        userID: 'a',
        postTime: Date.now(),
        startTime: Date.now(),
        stopTime: Date.now()+20,
        scheduled: false,
        deleted: false
    });

    return function (req, res) {
            msg.setPostText (req.body.postText);
            msg.parseTextForTags ();
            return res.render('buckets.handlebars',
                    {postText: msg.getPostText (), postTags: msg.getPostTags () });
            // return msg.save( function() {
            //     res.render('buckets.handlebars', {postText: msg.getPostText (), postTags: msg.getPostTags ()});
            // });
        };
};

module.exports = NewPostController;

