const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var JobSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	rname: {
		type: Schema.ObjectId,
		ref: 'recruiter',
		required: true
	},
	remail: {
		type: Schema.ObjectId,
		ref: 'recruiter',
		required: true
	},
	canapply: {
		type: Number,
		required: true
	},
	position: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	deadline: {
		type: new Schema(
		{
			date: {
				type: Date,
				required: true
			},
			hour: {
				type: String,
				required: true
			},
			min: {
				type: String,
				required: true
			}
		})
	},
	skill: {
		type: [String],
		required:true
	},
	typejob: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		min: 0,
		max: 6,
		required: true
	},
	salary: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
		required: true
	}
});

module.exports = Job = mongoose.model('job', JobSchema);