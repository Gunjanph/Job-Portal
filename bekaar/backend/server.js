const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "ssad"

// routes
// var Job = require("./routes/api/job");
var Applicant = require("./routes/api/applicant");
var Recruiter = require("./routes/api/recruiter");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
// app.use("/api/job", Job);
app.use("/applicant", Applicant);
app.use("/recruiter", Recruiter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
