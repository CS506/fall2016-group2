// TODO: find some way to have this code in one location, instead of in each router
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
