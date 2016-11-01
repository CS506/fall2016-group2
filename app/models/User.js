var mongodb = require('@onehilltech/blueprint-mongodb');
var validator = require('validator');

var schema = new mongodb.Schema({
	_id: {
		unique: true,
		index: true,
		type: String,
		required: true,
		trim: true,
		validate: validator.isAlphanumeric
	},
	userName: {
		unique: true,
		type: String,
		required: true,
		trim: true,
		validate: validator.isAlphanumeric
	}
});

module.exports = exports = mongodb.model('User', schema);