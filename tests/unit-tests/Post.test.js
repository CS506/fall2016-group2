var async = require("async");
var assert = require("chai").assert;
var should = require("chai").should();
var blueprint = require("@onehilltech/blueprint");
var appPath = require("../fixtures/appPath");
var it = require("mocha").it;
var before = require("mocha").before;
var describe = require("mocha").describe;
var after = require("mocha").after;
var Post = require("../../app/models/Post");
var User = require("../../app/models/User");
var posts = require("../fixtures/posts");
var winston = require("winston");

describe("Post Model Test", function () {
  var postuser = {
    "username": "asdobson",
    "password": "test1234"
  };

  before(function (done) {
    async.waterfall([
      function (callback) {
        blueprint.testing.createApplicationAndStart(appPath, callback);
      },
      function (app, callback) {
        User.create(postuser, function (err, newuser) {
          if (err) { return callback(err); }
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

  it("Should count all posts with #wonderful tag directly", function (done) {
    Post.count({ tags: "wonderful" }, function (err, count) {
      if (err) { return done(err); }
      count.should.equal(3);
      done();
    });
  });

  it("Shouldn't count time-restricted posts with #wonderful tag", function (done) {
    Post.getPostsByTag("wonderful", 100, function (err, posts) {
      if (err) { return done(err); }
      posts.length.should.equal(1);
      done();
    });
  });

  it("Should find the username for the first post with 'test' tag", function (done) {
    Post
      .findOne({ tags: "test" })
      .populate("createdBy")
      .exec(function (err, found) {
        if (err) { return done(err); }
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
