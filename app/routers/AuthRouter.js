var passport = require ('passport')
  ;

module.exports = {
    '/login': {
        // retrieve the login view
        get: {view: 'login.handlebars'},

        // handle the login process
        post: { action: 'AuthController@login' }
    },

    '/logout': {
        get: {action: 'AuthController@logout'}
    },

    '/signup': {
        get: { view: 'createAccount.handlebars' },
        post: { action: 'AuthController@createAccount'}
    }
};
