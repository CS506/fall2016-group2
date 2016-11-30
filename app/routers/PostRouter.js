function isLoggedIn (req, res, next) {
    // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

    // if they aren"t redirect them to the home page
  res.redirect("/login");
}

module.exports = {

  "/createPost": {
        // create a new Post
    use: isLoggedIn,
    get: {view: "newPost.handlebars"},
    post: {action: "PostController@createPost"}
  }

};
