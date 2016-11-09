var async = require('async')
  , assert = require('chai').assert
  , should = require('chai').should()
  , blueprint = require('@onehilltech/blueprint')
  , appPath = require('../fixtures/appPath')
  , it = require("mocha").it
  , before = require("mocha").before
  , describe = require("mocha").describe
  , users = require('../fixtures/users')
  , after = require("mocha").after
  , User = require('../../app/models/User')

describe('User Test', function () {
    var server;
    var request;

    before(function (done) {
        async.waterfall([
            function (callback) {
                blueprint.testing.createApplicationAndStart(appPath, callback)
            },

            function (app, callback) {
                server = app.server;
                request = require('supertest')(server.app);

                return callback(null);
            }
        ], done);
    });

    function createUser(key, done) {
        request
            .post('/signup')
            .type('form')
            .send(users[key])
            .expect(201) // TODO: change to 301
            .end(function(error, response) {
                if (error) { return done(error); }
                done();
            });
    }

    function loginUser(key, done) {
        request
            .post('/login')
            .type('form')
            .send(users[key])
            .expect(302)
            .expect('Location', /\/users\/me/)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    }

    function logoutUser(done) {
        request
            .get('/logout')
            .expect(302)
            .expect('Location', /\/login/)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    }

    it('should create a single user', function(done) {
        createUser(0, done);
    });

    it('should create a second user', function(done) {
        createUser(1, done);
    });

    it('should fail to create if username is missing', function (done) {
        request
            .post('/signup')
            .type('form')
            .send({ username: null, password: "somepassword" })
            .expect(400)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    });

    it('should fail to create if password is missing', function (done) {
        request
            .post('/signup')
            .type('form')
            .send({ username: "someuser", password: null })
            .expect(400)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    });

    it('should create a third user', function(done) {
        createUser(2, done);
    });

    it('should not create two of the same user', function (done) {
        request
            .post('/signup')
            .type('form')
            .send(users[0])
            .expect(409)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    });

    it('can login the first user and redirect to /users/me', function (done) {
        loginUser(0, done);
    });

    it('can logout the first user and redirect to /login', function (done) {
        logoutUser(done);
    });

    it('can not login with incorrect credentials', function (done) {
        request
            .post('/login')
            .type('form')
            .send({ username: users[0].username, password: "incorrect" } )
            .expect(422)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    });

    after(function (done) {
        User.remove().exec();
        done();
    });

});
