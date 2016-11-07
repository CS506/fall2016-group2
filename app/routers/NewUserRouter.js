/**
 * Created by brandon on 11/1/16.
 */

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

    '/newUser': {
      get: {view: 'createAccount.handlebars'}
    },

    '/createUser': {

        //user should be logged in to go to this route
        use: isLoggedIn,
        
        // create a new user
        post: {
            action: 'NewUserController@createUser'
        }
    }
};
