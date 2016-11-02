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

  '/logout': {
    get: {action: 'LoginController@logout'}
  },

  //newUser was able to display without a router because of this module right here
  // I created a link instead, so this is gone. Leaving commented stuff for notes
  //'/newUser': {
  //  get: {view: 'newUser.handlebars'}
  //}
};
