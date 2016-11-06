var mongodb = require('@onehilltech/blueprint-mongodb');

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

schema.post('save', function () {
    this.setTags();
});

 schema.post('update', function () {
     this.setTags();
 });

schema.methods.setTags = function () {
    this.tags = this.postText.match(/\B#\w*[a-zA-Z]+\w*/g);
};

const COLLECTION_NAME = 'post';
module.exports = mongodb.model (COLLECTION_NAME, schema);