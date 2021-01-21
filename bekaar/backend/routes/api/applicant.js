var express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const auth = require("../auth");
const Applicant = require('../../models/applicant');

// GET request 
// Just a test API to check if server is working properly or not
router.get('/',(req,res) => {
	Applicant.find()
		.then(applicant => res.json(applicant))
		.catch(err => res.status(404).json(err));
});

router.post('/register', async(req, res) =>{
	try{
		let{ email, name, password, password2} = req.body;

		if(password2 != password)
			return res
				.status(400)
				.json({ msg: "Enter the same password twice for verification.." });

		const existing = await Applicant.findOne({ email: email });
		if(existing)
			return res
				.status(400)
				.json({msg: "An account already exists. Login!!"});

		if(!name) name = email;

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
		console.log(passwordHash);

		const newapp = new Applicant({
			email: req.body.email,
			name: req.body.name,
			password: passwordHash
		});
		const savedUser = await newapp.save();
    	res.json(savedUser);

	}
	catch (err){
		res.status(400).json(err);
	}
});

router.post('/login', async(req, res) =>{
	try{
		let{ email, password } = req.body;

		const existingapp = await Applicant.findOne({ email: email });
		if(!existingapp)
			return res
				.status(400)
				.json({msg: "No account registered with this email id. Register!!"});

		const isMatch = await bcrypt.compare(password, existingapp.password);
		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

		const token = jwt.sign( {id: existingapp._id}, keys.secretKey);
		
		res.json({
		token,
		existingapp: {
			id: existingapp._id,
			name: existingapp.name,
			},
		});
	}
	catch (err){
		res.status(400).json(err);
	}
});

router.delete("/delete", auth, async (req, res) => {
	try {
	  const deletedapp = await Applicant.findByIdAndDelete(req.user);
	  res.json(deletedapp);
	} catch (err) {
	  res.status(500).json({ error: err.message });
	}
});

module.exports = router;