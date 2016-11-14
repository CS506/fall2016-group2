var mongodb = require('@onehilltech/blueprint-mongodb')
  ;

var schema = new mongodb.Schema({
	postText: {
		type: String,
		required: true,
		trim: true
	},

    postTime: {
        type: Date,
        required: true,
        trim: true,
    },

	tags: {
	    type: [String],
        lowercase: true,
        index: true
	},

	startTime: {
		type: Date,
	},

	stopTime: {
		type: Date,
	},
    createdBy: {
        type: mongodb.Schema.Types.ObjectId,
        index: true,
        required: true,
        ref: 'users'
    }

});

schema.pre('save', function (next) {
    this.setTags(next);
});

schema.pre('update', function (next) {
    this.setTags(next);  
});

schema.methods.setTags = function (next) {
    // Expression based on commonly accepted hashtag pattern
    // Split into matching groups to allow match without hashtag symbol
    var regex = /(^|\B)#([A-Za-z_][A-Za-z0-9_]*)/g
      , t = []
      , tags = [];
    
    // Execute regex on string. For each match, set match to 't' and enter loop
    while ((t = regex.exec(this.postText)) !== null) {
        // If tag (excluding hashtag symbol) doesn't exist in array, push tag
        let pendingTag = t[2];
        if (!tags.includes(pendingTag)) {
            tags.push(pendingTag);
        }
    }
  
    this.tags = tags;
    next();
};

//schema.methods.getPostsByTag = function

module.exports = mongodb.model ('posts', schema);