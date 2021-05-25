const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name : {
		type : String ,
	},
	email : {
		type : String ,
	},
	password : {
		type : String , 
	},
	education : [{
		inst : String ,
		joind : String ,
		endd : String
	}],
	skills : [
		{type : String}
	],
	rating : {
		type : Number ,
	},
	jobsopen : [
		{type : String}
	],
	jobsrejected: [
		{type : String}
	],
	noopen : {
		type : Number ,
	},
	type : {
		type : String,
	},
	contactno : {
		type : String,
	} ,
	jobs_created : [
		{type : String}
	],
	bio :
	{
		type : String
	},
	jobs_sop : [{
		title : String,
		SOP : String,
	}],
	jobs_applied : [{
		type : String
	}],
	jobs_rejected : [{
		type : String
	}],
	jobs_shortlisted :[{
		type : String
	}],
	job_selected :{
		type : String
	},
	type_of_job_selected : {
		type : String
	},
	date_of_joining : {
		type : String
	},
	recuiter_selected :{
		type :String
	},
	application : [{
		id_of_job : String ,
		sop : String ,
		date_of_application : String
	}],
	rating_cn : {
		type : Number
	},
	rated_by : [{
		type : String
	}]
});

module.exports = User = mongoose.model("Users", UserSchema);
