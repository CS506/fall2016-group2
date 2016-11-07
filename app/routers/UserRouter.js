
function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated ())
    return next ();

  // if they aren't redirect them to the home page
  res.redirect ('/login');
}

var user = require ('../models/User');

module.exports = {

  //user should be logged in to go to these routes
  use: isLoggedIn,

  '/users': {

    '/me': {
        get: {action: 'UserController@showMe'}
    }
  },

  '/createBucket' : {
      post: {action: 'UserController@createBucket'}
  }
};