import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Icon } from 'semantic-ui-react'

class jobdetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {details: [] , curr_job : [] ,stat : ''}
        this.checstatus = this.checstatus.bind(this);
        this.onSort = this.onSort.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/profile/jobs') // unimplemented
             .then(response => {
                 this.setState({details: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        axios.get('http://localhost:4000/user/curr-job-details') // unimplemented
             .then(response => {
                 this.setState({curr_job: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        
    }
    onSort(event , sortKey ,val){
        const details = this.state.details;
        var x;
        this.state.curr_job.map((job,i) => {
            x =job._id
            return null;
        })
        

        details.sort((a,b) => {
            var nameA , nameB;

            if(sortKey === 'rating')
            {
                if(a.rating_cn !== 0)
                {
                    nameA = a.rating/a.rating_cn;
                }
                else
                    nameA = 0
                
                if(b.rating_cn !== 0)
                {
                    nameB = b.rating/b.rating_cn;
                }
                else
                    nameB = 0
            }
            else if(sortKey === 'name')
            {
                nameA = a.name;
                nameB = b.name;
            }
            else
            {
                for(var i = 0;i< a.application.length ;i++)
                {
                    
                    if(a.application[i].id_of_job === x)
                    {
                        nameA = a.application[i].date_of_application
                    }
                }
                for( i = 0;i< b.application.length ;i++)
                {
                    
                    if(b.application[i].id_of_job === x)
                    {
                        nameB = b.application[i].date_of_application
                    }
                }
               
            }
            if (nameA < nameB) {
                if(val)return -1;
                else  return 1;
            }
            if (nameA > nameB) {
                if(val) return 1;
                else return -1;
            }
            return 0;
        })
        this.setState({details : details})
        // console.log(jobs)
    }
    checstatus(title)
    {
        var x = this.state.details[0].jobs_applied
        var i
        var f=0
        for(i = 0 ;i<x.length ;i++){
            if(x[i]===title)
                f=1;
        }
        return f;
    }

    render() {
        
        return (
            <div>
                <Button variant="contained" color="primary" href="/created-jobs" class="back">Back</Button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Applicant Name<Icon name='angle up' size='large' onClick = {e => this.onSort(e,'name',0)} /> <Icon name='angle down' size='large' onClick = {e => this.onSort(e,'name',1)} /></th>
                            <th>Applicant Skills</th>
                            <th>Date of Application<Icon name='angle up' size='large' onClick = {e => this.onSort(e,'date_of_application',0)} /> <Icon name='angle down' size='large' onClick = {e => this.onSort(e,'date_of_application',1)} /></th>
                            <th>Education</th>
                            <th>SOP</th>
                            <th>Rating<Icon name='angle up' size='large' onClick = {e => this.onSort(e,'rating',0)} /> <Icon name='angle down' size='large' onClick = {e => this.onSort(e,'rating',1)} /></th>
                            <div>
                            <th>Stage</th>
                            <th>Shortlist/Accept</th>
                            <th>Reject</th>
                            </div>
                            {/* <th>Dispatch</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.details.map((user, i) => {
                            var rat;
                            if(user.rating_cn !==0)
                            {
                                rat = user.rating/user.rating_cn;
                            }
                            else
                            {
                                rat= "Not Rated Yet";
                            }
                            var sop;
                            var x;
                            var doj;
                            this.state.curr_job.map((job,i) => {
                                x =job._id
                                return null;
                            })
                            for(i = 0;i< user.application.length ;i++)
                            {
                                if(user.application[i].id_of_job === x)
                                {
                                    sop = user.application[i].sop
                                    doj = user.application[i].date_of_application;
                                }
                            }
                            return (
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{
                                        user.skills.map((val,i) => {
                                return (
                                <span>{val} <span>&nbsp;&nbsp;</span> </span>
                                )
                            })
                        }</td>
                                    <td>{doj}</td>
                                    <td>{
                            user.education.map((val,i) => {

                                
                                if(val.inst!==''){
                                return (
                                <span>{val.inst}({val.joind} - {val.endd}) <span>&nbsp;&nbsp;</span></span>
                                )
                                }
                                else
                                {
                                    return (
                                        <span></span>
                                    )
                                }
                            })
                        }</td>
                        <td>{sop}</td>
                        <td>{rat}</td>
                        {
                            this.state.curr_job.map((job,i) => {
                            const x = user._id;
                           var val;
                           var buttonval;
                           for( i = 0;i<job.curr_applicants.length ;i++)
                           {
                               if(job.curr_applicants[i]===x)
                               {
                                   val = "Applied"
                                   buttonval = "Shortlist"
                                   return(
                                    <div>
                                    <td>{val}</td>
                                    <td><button onClick = {() =>{
                                        axios.get('http://localhost:4000/user/shortlist-job' , {
                                            params : {
                                                _id : user._id
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                        axios.get('http://localhost:4000/user/add-to-shortlist' , {
                                            params : {
                                                _id : user._id,
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                        window.location.reload(false);

                                        // console.log(id)
                                    }}>{buttonval}</button></td>
                                    <td><button onClick = {() =>{
                                        axios.get('http://localhost:4000/user/reject-job' , {
                                            params : {
                                                _id : user._id
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                        axios.get('http://localhost:4000/user/add-to-rejected' , {
                                            params : {
                                                _id : user._id,
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                        window.location.reload(false);

                                        // console.log(id)
                                    }}>Reject</button></td>
                                    </div>
                                   )
                               }
                           }
                         //  arr = this.state.curr_job[0]
                           for( i = 0;i<job.curr_shortlisted.length ;i++)
                           {
                               if(job.curr_shortlisted[i]===x)
                               {
                                   val = "Shortlisted"
                                   buttonval = "Accept"
                                   return (
                                    <div>
                                    <td>{val}</td>
                                    <td><button onClick = {() =>{
                                        var status = "active";
                                        if(job.max_positions == (job.curr_selected +1))
                                        {
                                            status = "inactive";
                                        }
                                        else
                                        var today = new Date(),
                                        date =  today.getFullYear()   + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                                        axios.get('http://localhost:4000/user/accept-job' , {
                                            params : {
                                                recuiter : job._id_of_recuiter,
                                                _id : user._id,
                                                date : date ,
                                                type : job.type
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                        axios.get('http://localhost:4000/user/add-to-accepted' , {
                                            params : {
                                                _id : user._id,
                                                status : status
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });

                                        axios.get('http://localhost:4000/user/reject-others' , {
                                            params : {
                                                _id : user._id,
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                        axios.get('http://localhost:4000/user/reject-all' , {
                                            params : {
                                                _id : user._id,
                                                jobs : user.jobs_applied
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                        window.location.reload(false);
                                        // console.log(id)
                                    }}>{buttonval}</button></td>
                                    <td><button onClick = {() =>{
                                        axios.get('http://localhost:4000/user/reject-job' , {
                                            params : {
                                                _id : user._id
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                        axios.get('http://localhost:4000/user/add-to-rejected' , {
                                            params : {
                                                _id : user._id,
                                            }
                                        }
                                        )
                                        .then(response => console.log(response))
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                        window.location.reload(false);
                                        // console.log(id)
                                    }}>Reject</button></td>
                                    </div>
                                   )
                               }
                           }
                             return null;})
                        }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default jobdetails;