/**
 * Created by brandon on 11/1/16.
 */

var passport = require ('passport')
    ;

module.exports = {
    '/createUser': {

        // create a new user
        // first, try and display the info that was POSTed
        post: {
            action: 'NewUserController@createUser'
        }
    }
};
