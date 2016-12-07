var blueprint = require("@onehilltech/blueprint")
    ;

var Post = Post = blueprint.app.models.Post;

function PostController () {
  blueprint.BaseController.call(this);
}

blueprint.controller(PostController);

PostController.prototype.createPost = function () {
  return function (req, res, next) {
        // initialize an empty post
    var msg = {};

    if (!req.body.postText) {
      return res.status(400).render("user.handlebars", {
        error: "Posts must contain text."
      });
    }

    if (!req.user._id) {
      return res.status(401).render("user.handlebars", {
        error: "Not logged in."
      });
    }

    msg.postText = req.body.postText;
    msg.createdBy = req.user._id;
    msg.anonymous = req.body.anonymous ? true : false; // eslint-disable-line no-unneeded-ternary
	d = new Date();
    msg.startTime = req.body.startTime ? Date.parse(req.body.startTime) + d.getTimezoneOffset(req.body.startTime)*60000 : Date.now();
    msg.stopTime = req.body.stopTime ? Date.parse(req.body.stopTime) + d.getTimezoneOffset(req.body.stopTime)*60000 : Date.now() + (100 * 365 * 24 * 60 * 60 * 1000);

    Post.create(msg, function (err, newpost) {
      if (err) { return next(err); }
      if (!newpost) { return res.sendStatus(500); }
      return res.redirect("/home");
    });
  };
};

module.exports = PostController;
