var mongodb = require('@onehilltech/blueprint-mongodb');
var validator = require('validator');


var schema = new mongodb.Schema({

	postText: {
		type: String,
		required: true,
		trim: true,
		validator: validator.isAlphanumeric
	},
	postTags: {
		type: String,
		required: true,
		trim: true,
		validator: validator.isAlphanumeric
	},
	userID: {
		type: String,
		required: true,
		trim: true,
		validate: validator.isAlphanumeric
	},
	postTime: {
		type: Date,
		required: true,
		trim: true,
		validate: validator.isDate
	},
	startTime: {
		type: Date,
		required: false,
		trim: true,
		validate: validator.isDate
	},
	stopTime: {
		type: Date,
		required: false,
		trim: true,
		validate: validator.isDate
	},
	scheduled: {
		type: Boolean,
		required: true,
		trim: true,
		validate: validator.isBoolean
	},
	deleted: {
		type: Boolean,
		required: true,
		trim: true,
		validate: validator.isBoolean
	},
	image: {
		type: String,
		required: false,
		trim: true,
		validate: validator.isAlphanumeric
	}
});

const COLLECTION_NAME = 'posts';
module.exports = mongodb.model (COLLECTION_NAME, schema);