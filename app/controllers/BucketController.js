"use strict";

var blueprint = require("@onehilltech/blueprint")
;

var Post = blueprint.app.models.Post;

function BucketController () {
  blueprint.BaseController.call(this);
}

blueprint.controller(BucketController);

BucketController.prototype.getBucket = function () {
  return function (req, res) {
    var tag = req.params.tag;
    var maxPosts = 100;
        // Get posts for requested tag
    Post.getPostsByTag(tag, maxPosts, function (err, posts) {
      if (err) {
        return res.status(500).render("user.handlebars", {
          error: "The server could not retrieve the bucket."
        });
      }
      res.render("posts.handlebars", {
        bucket: tag,
        posts: posts
      });
    });
  };
};

module.exports = BucketController;
