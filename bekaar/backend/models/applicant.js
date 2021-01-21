const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AppliSchema = new Schema({
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
	education: {
		type: [new Schema(
		{
			name: {
				type: String,
			},
			year: {
				type: String,
			}
		})]
	},
	resume: {
		type: Schema.Types.Mixed
	},
	img: {
		type: Schema.Types.Mixed
	},
	skill: {
		type: [String],
	},
	rating: {
		type: Number,
	}
});

module.exports = Applicant = mongoose.model('applicant', AppliSchema);
