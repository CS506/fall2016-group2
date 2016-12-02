var request = require("supertest");
var blueprint = require("@onehilltech/blueprint");
var path = require("path");
var async = require("async");
var expect = require("chai").expect;
var mongodb = require("@onehilltech/blueprint-mongodb");
var ConnectionManager = mongodb.ConnectionManager;
var appPath = require("../fixtures/appPath");

describe("GridFSController", function () {
  var server;
  var imageId;
  var defaultConnection;

  before(function (done) {
    async.waterfall([
      function (callback) {
        blueprint.testing.createApplicationAndStart(appPath, callback);
      },

      function (app, callback) {
        // Make sure the default connection is open.
        server = app.server;
        callback();
        defaultConnection = mongodb.getConnectionManager().defaultConnection;
        var connstr = app.configs.mongodb.connections.$default.connstr;
        // defaultConnection.open(connstr, callback);
      }
    ], done);
  });

  describe("POST (i.e., create)", function () {
    it("should upload file, and store in database", function (done) {
      var imageFile = path.resolve(__dirname, "../fixtures/avatar1.png");

      request(server.app)
        .post("/images")
        .attach("image", imageFile)
        .expect(200, function (err, res) {
          if (err) return done(err);

          expect(res.body).to.have.keys(["_id"]);
          imageId = res.body._id;

          return done();
        });
    });
  });

  describe("GET", function () {
    it("should get the image from the database", function (done) {
      request(server.app)
        .get("/images/" + imageId)
        .expect(200, function (err, res) {
          if (err) return done(err);

          expect(res.type).to.equal("image/png");

          return done();
        });
    });

    it("should not find the image", function (done) {
      request(server.app)
        .get("/images/5")
        .expect(404, done);
    });
  });

  describe("PUT (i.e., update)", function () {
    it("should not update the image", function (done) {
      var imageFile = path.resolve(__dirname, "../fixtures/avatar2.png");

      request(server.app)
        .put("/images/" + imageId)
        .attach("image", imageFile)
        .expect(404, done);
    });
  });

  describe("DELETE", function () {
    it("should delete the image from the database", function (done) {
      request(server.app)
        .delete("/images/" + imageId)
        .expect(200, "true", done);
    });

    it("should not delete the image again", function (done) {
      request(server.app)
        .delete("/images/" + imageId)
        .expect(500, done);
    });
  });
});
