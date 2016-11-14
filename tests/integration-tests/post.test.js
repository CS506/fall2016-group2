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
  , request = require('supertest')
;

describe('User Test', function () {
    var server
      , agent
      , User
      , Post
      , new_user
    ;

    var postuser = {
        "username": "asdobson",
        "password": "test1234"
    };

    before(function (done) {
        async.waterfall([
            function (callback) {
                blueprint.testing.createApplicationAndStart(appPath, callback)
            },

            function (app, callback) {
                server = app.server;
                agent = request.agent(server.app);
                User = app.models.User;
                Post = app.models.Post;

                new_user = new User(postuser);
                new_user.save();

                return callback(null);
            }
        ], done);
    });

    function loginUser(done) {
        agent
            .post('/login')
            .type('form')
            .send(postuser)
            .expect(302)
            .expect('Location', /\/home/)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    }

    function logoutUser(done) {
        agent
            .get('/logout')
            .expect(302)
            .expect('Location', /\/login/)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    }

    function createPost(key, done) {
        agent
            .post('/createPost')
            .type('form')
            .send(posts[key])
            .expect(302)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    }

    function rejectPost(key, done) {
        agent
            .post('/createPost')
            .type('form')
            .send(posts[0])
            .expect(302)
            .expect('Location', /\/login/)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    }

    it('should redirect unauthenticated users attempting to post back to login page', function (done) {
        rejectPost(0, done);
    });

    it('log in a user to post', function (done) {
        loginUser(done);
    });

    it('should create an authenticated post', function(done) {
        createPost(0, done);
    });

    it('logout a user', function (done) {
        logoutUser(done);
    });

    it('should redirect unauthenticated users attempting to post back to login page', function (done) {
        rejectPost(1, done);
    });

    it('log in a user to post again', function (done) {
        loginUser(done);
    });

    it('should fail to create if postText is missing', function (done) {
        agent
            .post('/signup')
            .type('form')
            .send({ postText: null })
            .expect(400)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    });

    it('should create a different authenticated post', function (done) {
        createPost(1, done);
    });

    it('should add a favorite Bucket to the logged in user', function (done) {
        agent
            .post('/addBucket')
            .type('form')
            .send({ bucketTag: "wonderful" })
            .expect(302)
            .expect('Location', /\/home/)
            .end(function (error, response) {
                if (error) { return done(error); }
                done();
            });
    });

    it('find the new bucket in the user\'s account info', function (done) {
        User.findOne({ username: "asdobson" }, function (error, user) {
            if (error) { return done(error); }
            user.tags.should.contain("wonderful");
            done();
        });
    });

    it('can still render home page after bucket insert',function (done) {
        agent
            .get('/home')
            .expect(200)
            .end(function (error, response) {
                if (error) {
                    return done(error);
                }

                var body = response.body;
                //assert(response.body.bucketList['wonderful']);
                done();
            });
    });

    it('logout a user', function (done) {
        logoutUser(done);
    });

    after(function (done) {
        Post.remove().exec();
        User.remove().exec();
        done();
    });

});
