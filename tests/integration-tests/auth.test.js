var async = require('async');
var assert = require('chai').assert;
var should = require('chai').should();
var blueprint = require('@onehilltech/blueprint');
var appPath = require('../fixtures/appPath');
var it = require("mocha").it;
var before = require("mocha").before;
var describe = require("mocha").describe;
var users = require('../fixtures/users');
var after = require("mocha").after;
var UserDB = require('../../app/models/User');

describe('User Test', function () {
    var server;
    var request;

    function createUser(key, done) {
        request
            .post('/signup')
            .type('form')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send(users[key])
            .expect(201)
            .end(function(error, response) {
                if (error) {
                    return done(error);
                }
                done();
            });
    }

    function loginUser(key, done) {
        request
            .post('/login')
            .type('form')
            .send(users[key])
            .expect(200)
            .end(function (error, response) {
                if (error) {
                    return done(error);
                }
                done();
            });
    }

    function logoutUser(key, done) {
        request
            .get('/logout')
            .expect(200)
            .end(function (error, response) {
                if (error) {
                    return done(error);
                }
                done();
            });
    }

    before(function (done) {
        async.waterfall([
            function(callback) {
                blueprint.testing.createApplicationAndStart(appPath, callback)
            },

            function(app, callback) {
                server = app.server;
                request = require('supertest')(server.app);

                return callback(null);
            }
        ], done);
    });

    after(function (done) {
        for (let i = 0; i < 3; ++i) {
            UserDB.findOneAndRemove({ username: users[i].username }, function (err) {});
        }
        done();
    });

    it('should create a single user', function(done) {
        createUser(0, done);
    });

    it('should create a second user', function(done) {
        createUser(1, done);
    });

    it('should fail to create if username is missing', function (done) {
        request
            .post('/signup')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: null, password: "somepassword" })
            .expect(400)
            .end(function (error, response) {
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('should fail to create if password is missing', function (done) {
        request
            .post('/signup')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ username: "someuser", password: null })
            .expect(400)
            .end(function (error, response) {
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('should create a third user', function(done) {
        createUser(2, done);
    });

    it('should not create two of the same user', function (done) {
        request
            .post('/signup')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(users[0])
            .expect(409)
            .end(function (error, response) {
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('can login the first user', function (done) {
        loginUser(0, done);
    });

    it('can logout the first user', function (done) {
        logoutUser(0, done);
    });

    it('can not login with incorrect credentials', function (done) {
        request
            .post('/login')
            .type('form')
            .send({ username: users[0].username, password: "incorrect" } )
            .expect(422)
            .end(function (error, response) {
                if (error) {
                    return done(error);
                }
                done();
            });
    });



});
