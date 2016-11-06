var async = require('async')
  , assert = require('chai').assert
  , should = require('chai').should()
  , blueprint = require('@onehilltech/blueprint')
  , appPath = require('../fixtures/appPath')
  , it = require("mocha").it
  , before = require("mocha").before
  , describe = require("mocha").describe
  , posts = require('../fixtures/posts')
  , after = require("mocha").after
  , Post = require('../../app/models/Post')
  , mongoose = require('mongoose');

describe('User Test', function () {
    var server;
    var request;

    function createPost(key, done) {
        request
            .post('/createPost')
            .type('form')
            .send(posts[key])
            .expect(201)
            .end(function(error, response) {
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
        mongoose.connection.db.dropCollection('posts');
        done();
    });

    it('should create a single post', function(done) {
        createPost(0, done);
    });

    it('should create a second post', function(done) {
        createPost(1, done);
    });

    it('should fail to create if postText is missing', function (done) {
        request
            .post('/signup')
            .type('form')
            .send({ postText: null })
            .expect(400)
            .end(function (error, response) {
                if (error) {
                    return done(error);
                }
                done();
            });
    });
});
