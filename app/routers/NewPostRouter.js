/**
 * Created by brandon on 11/2/16.
 */

var passport = require ('passport')
    ;

module.exports = {

    //There has to be a reference to each view in some router for it to work, otherwise you get a 404
    '/newPost': {
        get: {view: 'newPost.handlebars'}
    },

    '/createPost': {

        // create a new Post
        post: {
            action: 'NewPostController@createPost'
        }
    }
};
