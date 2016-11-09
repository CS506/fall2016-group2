
function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated ())
    return next ();

  // if they aren't redirect them to the home page
  res.redirect ('/login');
}

var user = require ('../models/User');

module.exports = {

  '/users': {
    //user should be logged in to go to these routes
    use: isLoggedIn,

    '/me': {
        get: {action: 'UserController@showMe'}
    }
  },

  '/createBucket' : {
      post: {action: 'UserController@createBucket'}
  }
};