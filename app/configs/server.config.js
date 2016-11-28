var blueprint = require("@onehilltech/blueprint")
  ;

var User;
var FacebookUser;

blueprint.messaging.on("app.init", function (app) {
  User = app.models.User;
});

blueprint.messaging.on("app.init", function (app) {
    FacebookUser = app.models.FacebookUser;
});

module.exports = {
  protocols: {
    http: {
      port: 5000
    }
  },

  middleware: {
    bodyParser: {
      urlencoded: { extended: false }
    },

    morgan: {
      format: "dev",
      immediate: true
    },

    passport: {
      session: {
        serializer: function (user, done) {
          return done(null, user.id);
        },

        deserializer: function (id, done) {
          FacebookUser.findById(id, done);
        }
      }
    },

    session: {
      secret: "ssshhhhh",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }  // set to true for https://
    }

  },
  statics: ["public/"]
};
