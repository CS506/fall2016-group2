/**
 * Created by brandon on 11/2/16.
 */

var blueprint = require ('@onehilltech/blueprint')
    , HttpError = blueprint.errors.HttpError
    ;

var Post = require ('../models/Post.js')
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
                userID: "1234",
                postTime: Date.now(),
                scheduled: false,
                deleted: false
            });
// mongoose has a .pre method for doing stuff to an object before saving it:
            // msg.pre('save', function(next) {
            // do validation or processing here
            // next();
            // )};

            msg.save(function (err, msg) {
                if (err) return callback(new HttpError(500, 'Failed to create new post'));

                //res.status(200).json(msg.id);
                //res.redirect(200, 'back');
                //return callback(null);
                res.render('newPost.handlebars', {postText: req.body.postText});

            });
//TODO: Figure out how to proceed to a view after posting
            //res.render('newPost.handlebars');
        }
    };
};

module.exports = NewPostController;

