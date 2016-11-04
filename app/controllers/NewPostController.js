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
                postTags: req.body.tag,
                userID: req.user.id,
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


                res.redirect('/users/me');
                //res.redirect(200, 'back');
                //return callback(null);
                //res.render('newPost.handlebars', {postText: req.body.postText});
                // It might be possible to have some other function call this one and expect the msg.id
                //back, instead of having flow go through this function, and then finish with render()
                //res.status(200).json(msg.id);

            });
            //res.render('newPost.handlebars');
        }
    };
};

module.exports = NewPostController;

