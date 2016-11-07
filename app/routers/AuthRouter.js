var passport = require ('passport')
  ;

function isLoggedIn (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated ())
        return next ();

    // if they aren't redirect them to the home page  
    res.redirect ('/login');
} 

module.exports = {
    '/login': {
        
        // retrieve the login view
        get: {view: 'login.handlebars'},

        // handle the login process
        post: { action: 'AuthController@login' }
    },

    '/logout': {
        //user should be logged in to go to this route.
        // use: isLoggedIn,

        get: {action: 'AuthController@logout'}
    },

    '/signup': {
        get: { view: 'createAccount.handlebars' },
        post: { action: 'AuthController@createAccount'}
    }
};
