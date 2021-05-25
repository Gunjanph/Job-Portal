var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Job = require("../models/Jobs")
var user_pro = ""
var job_pro = ""

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.get("/profile",function(req,res) {

    User.find({_id : user_pro}, function(err, Pro) {
        if (err) {
            console.log(err);
        } else {
            res.json(Pro);
        }
    });
});

router.get("/myemployees",function(req,res) {
     User.find({recuiter_selected : user_pro}, function(err, Pro) {
         if (err) {
             console.log(err);
         } else {
             res.json(Pro);
         }
     });
 });


 router.get("/job-name",function(req,res) {
    Job.find({_id : req.query.id}, function(err, Pro) {
        if (err) {
            console.log(err);
        } else {
            res.json(Pro);
        }
    });
});

router.get("/profile/jobs",function(req,res) {

     User.find({jobs_applied : job_pro }, function(err, Pro) {
         if (err) {
             console.log(err);
         } else {
             res.json(Pro);
         }
     });
 });

router.get("/curr-job-details",function(req,res) {
    Job.find({_id : job_pro }, function(err, Pro) {
        if (err) {
            console.log(err);
        } else {
            res.json(Pro);
        }
    });
});
// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {

    User.find({email : req.body.email}, function(err,user_exist){
        if(err)
        {
            console.log(err);
        }
        if(user_exist.length)
        {
            console.log("user already exists")
            res.send("1");
        }
        else
        {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                type : req.body.type,
                password : req.body.password,
                education : req.body.education,
                skills : req.body.skills,
                rating : req.body.rating ,
                jobs_applied : [] ,
                jobs_rejected : [],
                job_selected : '',
                recuiter_selected : '',
                rating_cn : 0
        
            });
            newUser.save()
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(400).send(err);
            });
        }
    })

   
});

router.post("/register2", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password : req.body.password,
        type : req.body.type,
        contactno : req.body.contactno,
        bio : req.body.bio
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});



router.route('/job-created').get(function(req, res) {
    User.findOneAndUpdate(
        { _id: user_pro},
        { $push: {jobs_created: job_pro} },
        (err, updated_data) => {
            if(err) {
                console.log("update not done");
            }
            else {
                
                res.json(updated_data)
            }
        }
    );

  });

  router.route('/edit-applicant').get(function(req, res) {
    User.findOneAndUpdate(
        { _id: user_pro},
        { $set: { email : req.query.email ,
                 name : req.query.name ,
                password : req.query.password,
                skills : req.query.skills,
                } },
        (err, updated_data) => {
            if(err) {
                console.log("update not done");
            }
            else {                
                res.json(updated_data)

            }
        }
    );

  });

  router.route('/edit-recuiter').get(function(req, res) {
    User.findOneAndUpdate(
        { _id: user_pro},
        { $set: { email : req.query.email ,
                 name : req.query.name ,
                password : req.query.password,
                bio : req.query.bio,
                contactno : req.query.contactno
                } },
        (err, updated_data) => {
            if(err) {
                console.log("update not done");
            }
            else {
                
                res.json(updated_data)
            }
        }
    );

  });

router.get("/job-login" , (req,res) => {
    job_pro = req.query._id
});
// POST request 
// Login
router.post("/login", (req, res) => {

    User.find({email : req.body.email}, function(err,user_exist){
        if(err)
        {
            console.log(err);
        }
        if(!user_exist.length)
        {
            console.log("User does not exist")
            res.send("1")
        }
        else
        {
            if(user_exist[0].password === req.body.password)
            {
                user_pro = user_exist[0]._id;

                if(user_exist[0].type==="applicant")
                    {
                        res.send("3")
                    }
                if(user_exist[0].type==="recuiter")
                {
                    res.send("4")
                }
            }
            else
            {
                console.log("Wrong Password")
                res.send("2")
            }
       
        }
    });
});

router.get("/active-jobs", function(req, res) {
      const today = Date.now();
      var x = new Intl.DateTimeFormat('ko-KR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit' ,hour12 : false }).format(today);
      
      Job.find({deadline : {$gt : x } ,$or : [{status : "active"} , {status : "inactive" }], curr_rejected : {$nin: req.query.id} } ,function(err, users) {
          if (err) {
              console.log(err);
          } else {
              res.json(users);
          }
      })
  });
  
  

  router.get("/my-jobs", function(req, res) {
      Job.find({_id_of_recuiter : req.query._id , status : 'active' },function(err, users) {
          if (err) {
              console.log(err);
          } else {
              res.json(users);
          }
      })
  });

  router.get("/get-info", function(req, res) {
     User.find({_id : user_pro},function(err, users) {
         if (err) {
             console.log(err);
         } else {
             res.json(users);
         }
     })
 });

 router.get("/get-myjobs", function(req, res) {
     Job.find({ $or: [ { curr_applicants: user_pro }, { curr_shortlisted : user_pro } , {curr_rejected : user_pro} , {curr_selected : user_pro}] },function(err, users) {
         if (err) {
             console.log(err);
         } else {
             res.json(users);
         }
     })
 });

 router.get("/edit-job", function(req, res) {
     Job.findOneAndUpdate({ _id : job_pro},
        {$set : {max_applications : req.query.max_applications ,
                max_positions : req.query.max_positions ,
            deadline : req.query.deadline
        }
        },function(err, users) {
         if (err) {
             console.log(err);
         } else {
             res.json(users);
         }
     })
 });
 router.get("/delete-job", function(req, res) {
     User.findOneAndUpdate({ _id : user_pro},
        {$pull : {jobs_created : req.query._id}
        },function(err, users) {
         if (err) {
             console.log(err);
         } else {
             res.json(users);
         }
     })
 });

 router.get("/delete-job2", function(req, res) {
     User.updateMany({ job_selected : req.query._id},
        {$set : {job_selected :'' ,
                type_of_job_selected : '',
                date_of_joining : '',
            recuiter_selected : ''}
        },function(err, users) {
         if (err) {
             console.log(err);
         } else {
             res.json(users);
         }
     })
 });

 router.get("/delete-job3", function(req, res) {
    var job = req.query._id
     User.updateMany({ $or: [ { jobs_applied: job } , { jobs_shortlisted : job } ]},
        {$pull : { jobs_applied: job ,jobs_shortlisted : job } },function(err, users) {
         if (err) {
             console.log(err);
         } else {
             res.json(users);
         }
     })
 });

 router.get("/delete-job4", function(req, res) {

     Job.findOneAndUpdate({ _id : req.query._id},
    {$set : {email_of_recuiter : '' , _id_of_recuiter : '' ,curr_applicants : [],
    curr_shortlisted : [],curr_selected : [] ,curr_rejected : [] ,status : 'deleted'}},function(err, users) {
     if (err) {
         console.log(err);
     } else {
         res.json(users);
     }
 })
});

  
  
  router.route('/add-applicant').get(function(req, res) {
    Job.findOneAndUpdate(
        { _id: req.query._id},
        { $push: {curr_applicants : user_pro} },
        (err, updated_data) => {
            if(err) {
                console.log("update not done");
            }
            else {
                res.json(updated_data)
            }
        }
    );
  
  });

  router.route('/apply-job').get(function(req, res) {
   const val = {
        id_of_job  : req.query._id,
       sop : req.query.sop,
       date_of_application : req.query.date
   }
    User.findOneAndUpdate(
        { _id : user_pro},
        { $push: {jobs_applied : req.query._id , application : val } },
        (err, updated_data) => {
            if(err) {
                console.log("update not done");
            }
            else {
                
                res.json(updated_data)
            }
        }
    );
  
  });
  
  router.get("/all", function(req, res) {
      Job.find(function(err, users) {
          if (err) {
              console.log(err);
          } else {
              res.json(users);
          }
      })
  });
  router.post("/create", (req, res) => {
  
    console.log(req.body.email_of_recuiter)
      const newUser = new Job({
          title: req.body.title , 
          name_of_recuiter: req.body.name_of_recuiter , 
          email_of_recuiter : req.body.email_of_recuiter , 
          _id_of_recuiter  : req.body._id_of_recuiter,
          max_applications : req.body.max_applications , 
          max_positions : req.body.max_positions , 
          date_of_posting :req.body.date_of_posting , 
          deadline : req.body.deadline , 
          skills :  req.body.skills , 
          type: req.body.type , 
          duration : req.body.duration , 
          salary : req.body.salary , 
          rating : req.body.rating , 
          status : req.body.status,
          curr_applicants : req.body.curr_applicants,
          curr_selected : req.body.curr_selected,
          rating_cn : 0
      });
      newUser.save(function(err,room){
          job_pro = room.id;
      }
      )  
     
  });

  router.route('/shortlist-job').get(function(req, res) {
   User.findOneAndUpdate(
       { _id : req.query._id},
       { $push: {jobs_shortlisted : job_pro} },
       (err, updated_data) => {
           if(err) {
               console.log("update not done");
           }
           else {
               
               res.json(updated_data)
           }
       }
   );
});

router.route('/add-to-shortlist').get(function(req, res) {

Job.findOneAndUpdate(
    { _id : job_pro},
    { $push: {curr_shortlisted : req.query._id},
    $pull : {curr_applicants : req.query._id} },
    (err, updated_data) => {
        if(err) {
            console.log("update not done");
        }
        else {
            
            res.json(updated_data)
        }
    }
);
 
 });


 router.route('/accept-job').get(function(req, res) {
    console.log(req.query.date)
   User.findOneAndUpdate(
       { _id : req.query._id},
       { $set: {job_selected : job_pro , recuiter_selected : req.query.recuiter ,date_of_joining :req.query.date , type_of_job_selected : req.query.type },
        $pull : {jobs_applied : job_pro , jobs_shortlisted : job_pro}},
       (err, updated_data) => {
           if(err) {
               console.log("update not done");
           }
           else {
               
               res.json(updated_data)
           }
       }
   );
});

router.route('/add-to-accepted').get(function(req, res) {
    var x;
    
    Job.findOneAndUpdate(
        { _id : job_pro},
        { $push: {curr_selected : req.query._id},
        $pull : {curr_shortlisted : req.query._id } ,
        $set : {status : req.query.status } },
        (err, updated_data) => {
            if(err) {
                console.log("update not done3");
            }
            else {
                
                res.json(updated_data)
            }
        }
    );
     
     });

router.route('/reject-others').get(function(req, res) {

Job.findOneAndUpdate(
    { $or : [{curr_applicants : req.query._id} , {curr_shortlisted : req.query._id }]},
    { $push: {curr_rejected : req.query._id},
    $pull : {curr_applicants : req.query._id , curr_shortlisted : req.query._id}},
    (err, updated_data) => {
        if(err) {
            console.log("update not done2");
        }
        else {
            
            res.json(updated_data)

        }
    }
);
    
    });

router.route('/reject-all').get(function(req, res) {

    User.findOneAndUpdate(
        { _id: req.query._id},
        { $push: {jobsrejected : req.body.jobs},
        $set: { jobs_applied :[] , jobs_shortlisted:[]  }},
        (err, updated_data) => {
            if(err) {
                console.log("update not done1");
            }
            else {
                
                res.json(updated_data)
               
            }
        }
    );
        
        });

router.route('/add-to-rejected').get(function(req, res) {

Job.findOneAndUpdate(
    { _id : job_pro},
    { $push: {curr_rejected : req.query._id},
    $pull : {curr_applicants : req.query._id , curr_shortlisted : req.query._id} },
    (err, updated_data) => {
        if(err) {
            console.log("update not done");
        }
        else {
            
            res.json(updated_data)
          
        }
    }
);
 
 });

 router.route('/reject-job').get(function(req, res) {

   User.findOneAndUpdate(
       { _id : req.query._id},
       { $push :{jobsrejected :job_pro} ,
        $pull : {jobs_applied : job_pro , jobs_shortlisted : job_pro}},
       (err, updated_data) => {
           if(err) {
               console.log("update not done");
           }
           else {
               
               res.json(updated_data)
           }
       }
   );
});

router.route('/rate-job').get(function(req, res) {

var x = parseInt(req.query.rating)
console.log(x);
   Job.findOneAndUpdate(
       { _id : req.query.jobid},
       { $push :{rated_by : req.query.userid} ,
        $inc : {rating : x , rating_cn : 1}},
       (err, updated_data) => {
           if(err) {
               console.log("update not done");
           }
           else {
               
               res.json(updated_data)
           }
       }
   );
});

router.route('/rate-applicant').get(function(req, res) {

var x = parseInt(req.query.rating)

    console.log(req.query.userid);
   User.findOneAndUpdate(
       { _id : req.query.userid},
       { $push :{rated_by : req.query.recid} ,
         $inc : {rating : x ,rating_cn : 1 }},
       (err, updated_data) => {
           if(err) {
               console.log("update not done");
           }
           else {
               res.json(updated_data)
           }
       }
   );
});


module.exports = router;

