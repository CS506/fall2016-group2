// TODO: find some way to have this code in one location, instead of in each router
function isLoggedIn (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated ())
        return next ();

    // if they aren't redirect them to the home page
    res.redirect ('/login');
}

module.exports = {

    //There has to be a reference to each view in some router for it to work, otherwise you get a 404
    '/newPost': {
        use: isLoggedIn,
        get: {view: 'newPost.handlebars'}
    },

    '/createPost': {

        // create a new Post
        post: {action: 'NewPostController@createPost'}
    }
};
