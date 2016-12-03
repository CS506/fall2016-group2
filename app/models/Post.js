var mongodb = require("@onehilltech/blueprint-mongodb")
  ;

var schema = new mongodb.Schema({
  postText: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    lowercase: true,
    index: true
  },
  startTime: {
    type: Date,
    required: true
  },
  stopTime: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongodb.Schema.Types.ObjectId,
    index: true,
    required: true,
    ref: "users"
  }
}, {
  // Adds 'createdAt' and 'updatedAt' fields
  timestamps: true
});

schema.pre("save", function (next) {
  this.setTags(next);
});

schema.pre("update", function (next) {
  this.setTags(next);
});

schema.methods.setTags = function (next) {
    // Expression based on commonly accepted hashtag pattern
    // Split into matching groups to allow match without hashtag symbol
  var regex = /(^|\B)#([A-Za-z_][A-Za-z0-9_]*)/g;
  var t = [];
  var tags = [];

    // Execute regex on string. For each match, set match to "t" and enter loop
  while ((t = regex.exec(this.postText)) !== null) {
        // If tag (excluding hashtag symbol) doesn"t exist in array, push tag
    let pendingTag = t[2];
    if (!tags.includes(pendingTag)) {
      tags.push(pendingTag);
    }
  }

  this.tags = tags;
  next();
};

// Find posts with given tag. Limit results to "max" number of freshest posts.
schema.statics.getPostsByTag = function (tag, max, next) {
    // TODO: Populate creator info
  // Using aggregate to take advantage of piping optimizations
  var currentTime = new Date();

  this.aggregate(
    {
      $match: {
        tags: tag,
        stopTime: { $gt: currentTime },
        startTime: { $lt: currentTime }
      }
    },
    { $sort: { startTime: -1 } },
    { $limit: max },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "creator"
      }
    },
    { $project: {
      "postText": 1,
      "tags": 1,
      "startTime": 1,
      "stopTime": 1,
      "createdBy": 1,
      "username": "$creator.username"
    }}
    )
    .exec(function (err, posts) {
      if (err) { return next(err); }
      next(null, posts);
    });
};

schema.statics.getPostsByTags = function (tags, next) {
  var max = 10; // Max number of posts to get for each tag
  var postList = {};
  var inserted = 0;

  if (tags.length === 0) { return next(null, null); }

  for (let tag of tags) {
    this.getPostsByTag(tag, max, function (err, posts) {
      if (err) { return next(err); }

      postList[tag] = posts;

            // Waits to return postList after all async calls are complete
      if (++inserted === tags.length) {
        return next(null, postList);
      }
    });
  }
};

module.exports = mongodb.model("posts", schema);
