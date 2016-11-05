var mongodb = require('@onehilltech/blueprint-mongodb');
var validator = require('validator');


var schema = new mongodb.Schema({

	postText: {
		type: String,
		required: true,
		trim: true
	},

	//postHashTags is supposed to be used
	//to store the list of hashtags associated
	//with a post.
	//-Nyalia

	postHashTags: {
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

schema.methods.setPostText = function (usrText) {
	this.postText = usrText;
};

schema.methods.setPostHashTags = function (usrTags) {
	this.postHashTags = usrTags;
};

schema.methods.parseTextForTags = function () {
	var wordsArray = this.postText.split(' ');
	var tags = [];

	for(var i in wordsArray)
	{
		if(/#/.test(wordsArray[i]))
			tags.push(wordsArray[i]);
	}

	this.setPostHashTags (tags);
};

schema.methods.getPostText = function () {
	return this.postText;
}

schema.methods.getPostTags = function () {
	return this.postHashTags;
}

const COLLECTION_NAME = 'posts';
module.exports = mongodb.model (COLLECTION_NAME, schema);