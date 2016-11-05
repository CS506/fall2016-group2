var mongodb = require('@onehilltech/blueprint-mongodb');
var validator = require('validator');


var schema = new mongodb.Schema({

	postText: {
		type: String,
		required: true,
		trim: true,
		validate: validator.isAlphanumeric
	},
	postTags: {
		type: Array,
		required: true,
		trim: true
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
		trim: true,
		validate: validator.isAlphanumeric
	}
});

schema.pre('save', true, function (next, done){
	var wordsArray = this.postText.split(' ');

	for(var i in wordsArray)
	{
		if(/#/.test(wordsArray[i]))
		{
			this.postTags.push(wordsArray[i]);
		}
	}

	next();
	setTimeout(done, 100);
} );

const COLLECTION_NAME = 'posts';
module.exports = mongodb.model (COLLECTION_NAME, schema);