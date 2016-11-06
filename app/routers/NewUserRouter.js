/**
 * Created by brandon on 11/1/16.
 */

var passport = require ('passport')
    ;

module.exports = {

    '/newUser': {
      get: {view: 'createAccount.handlebars'}
    },

    '/createUser': {

        // create a new user
        post: {
            action: 'NewUserController@createUser'
        }
    }
};
