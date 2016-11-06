var mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({

	postText: {
		type: String,
		required: true,
		trim: true
	},

	tags: {
		type: Array,
		required: true,
		trim: true
	},

	userID: {
		type: String,
		required: true,
		trim: true
	},

	postTime: {
		type: Date,
		required: true,
		trim: true
	},

	startTime: {
		type: Date,
		required: false,
		trim: true
	},

	stopTime: {
		type: Date,
		required: false,
		trim: true
	},

	scheduled: {
		type: Boolean,
		required: true,
		trim: true
	},

	deleted: {
		type: Boolean,
		required: true,
		trim: true
	},

	image: {
		type: String,
		required: false,
		trim: true
	}
});

schema.post('save', function () {
    this.setTags();
});

// schema.update('save', function () {
//     this.setTags();
// });

schema.methods.setTags = function () {
    this.tags = this.postText.match(/\B#\w*[a-zA-Z]+\w*/g);
};

const COLLECTION_NAME = 'post';
module.exports = mongodb.model (COLLECTION_NAME, schema);