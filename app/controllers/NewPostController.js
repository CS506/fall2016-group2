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
    return function (req, res) {

            //values for postTags and userID
            //are temporary static values to avoid validation errors
            //-Nyalia

            var msg = new Post({
                postText: req.body.postText,
                postTags: new Array(1,2,3,4),
                userID: '23422342',
                postTime: Date.now(),
                startTime: Date.now(),
                stopTime: Date.now()+20,
                scheduled: false,
                deleted: false
            });

            msg.save(function (err){
                if (err) console.log (err);
                res.render('buckets.handlebars', {postText: this.postText, postTags: this.postTags});
            });
        };
};

module.exports = NewPostController;

