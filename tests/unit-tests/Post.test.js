var async = require('async')
  , assert = require('chai').assert
  , should = require('chai').should()
  , blueprint = require('@onehilltech/blueprint')
  , appPath = require('../fixtures/appPath')
  , it = require("mocha").it
  , before = require("mocha").before
  , describe = require("mocha").describe
  , after = require("mocha").after
  , Post = require('../../app/models/Post')
  , User = require('../../app/models/User')
  , posts = require('../fixtures/posts')
  , winston = require('winston');
;

describe('Post Model Test', function () {
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
                User.create(postuser, function (err, newuser) {
                    for (let item of posts) {
                        item.createdBy = newuser.id;
                        item.postTime = new Date();
                        Post.create(item);
                    }
                    callback(null);
                });
            }
        ], done);
    });

    it('Should count all posts with #wonderful tag', function (done) {
        Post.count({ tags: 'wonderful' }, function (err, count) {
            count.should.equal(3);
            done();
        })    
    });

    it('Should find the username for the first post with "test" tag', function (done) {
        Post
        .findOne({ tags: 'test' })
        .populate("createdBy")
        .exec(function (err, found) {
            found.createdBy.username.should.equal("asdobson");
            done();
        });
    });

    after(function (done) {
        Post.remove().exec();
        User.remove().exec();
        done();
    });

});
