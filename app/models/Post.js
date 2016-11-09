// TODO: work on making an index for this collection on tags

var mongodb = require('@onehilltech/blueprint-mongodb')
  ;

var schema = new mongodb.Schema({

	postText: {
		type: String,
		required: true,
		trim: true
	},

	tags: { type: Array },

	startTime: {
		type: Date,
	},

	stopTime: {
		type: Date,
	}
});

schema.pre('save', function (next) {
    this.setTags();
    next();
});

schema.pre('update', function (next) {
    this.setTags();
    next();
});

schema.methods.setTags = function () {
    var regex = /(^|\B)#([A-Za-z_][A-Za-z0-9_]*)/g
      , t = []
      , tags = [];
    
    while ((t = regex.exec(this.postText)) !== null) {
        tags.push(t[2]);
    }
  
    this.tags = tags;
};

const COLLECTION_NAME = 'post';
module.exports = mongodb.model (COLLECTION_NAME, schema);