const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	title : {
		type : String ,
	},
	name_of_recuiter : {
		type : String ,
	},
	email_of_recuiter : {
		type : String , 
	},
	_id_of_recuiter : {
		type : String
	},
    max_applications : {
        type : String 
    },
    max_positions : {
        type : String
    },
    date_of_posting : {
        type : Date
    },
    deadline : {
        type : String
    },
    skills : {
		type : String
    },
	type : {
		type : String ,
	},
	duration : {
		type : Number
    },
	salary : {
		type : Number ,
	},
	rating: {
		type : Number,
	},
	status : {
		type : String,
	},
	curr_applicants : [{
		type :String
	}],
	curr_shortlisted : [{
		type :String
	}],
	curr_selected :[{
		type : String
	}],
	curr_rejected :[{
		type : String
	}],
	rating_cn : {
		type : Number,
	},
	rated_by : [{
		type : String
	}]
});

module.exports = User = mongoose.model("Jobs", UserSchema);
