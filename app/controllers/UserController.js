"use strict";

var blueprint = require("@onehilltech/blueprint")
;

var Post = blueprint.app.models.Post;

function UserController () {
  blueprint.BaseController.call(this);
}

blueprint.controller(UserController);

UserController.prototype.showMe = function () {
  return function (req, res) {
    var tags = req.user.tags;

        // Get posts for user"s tags and
    Post.getPostsByTags(tags, function (err, postList) {
      if (err) {
        return res.status(500).render("user.handlebars", {
          error: "The server could not retrieve buckets."
        });
      }
      res.render("user.handlebars", {
        user: req.user,
        bucketList: postList
      });
    });
  };
};

UserController.prototype.addBucket = function () {
  return function (req, res) {
    var regex = /^[A-Za-z_][A-Za-z0-9_]*$/;
    var bucketName = req.body.bucketTag;

    if (regex.test(bucketName)) {
      req.user.tags.push(bucketName.toLowerCase());
      req.user.save(function (err) {
        if (err) {
          return res.status(500).render("user.handlebars", {
            error: "Internal Server Error."
          });
        }
      });
      return res.redirect("/home");
    } else {
      return res.status(400).render("user.handlebars", {
        error: "Bucket name must be valid."
      });
    }
  };
};

module.exports = UserController;
