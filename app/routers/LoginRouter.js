var passport = require ('passport')
  ;

module.exports = {
  '/login': {
    // retrieve the login view
    get: {view: 'login.handlebars'},

    // handle the login process
    post: {
      before: [passport.authenticate ('local', {failureRedirect: '/login'})],
      action: 'LoginController@completeLogin'
    }
  },

  //TODO: Try using this route with the other controllers
  '/logout': {
    get: {action: 'LoginController@logout'}
  }
};
