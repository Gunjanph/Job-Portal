const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	contact: {
		type: Number
	},
	bio: {
		type: [String]
	}
});

module.exports = Recruiter = mongoose.model('recruiter', RecSchema);