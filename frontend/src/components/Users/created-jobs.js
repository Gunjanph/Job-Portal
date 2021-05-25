import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Icon } from 'semantic-ui-react'

class CreatedJobs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {details: [] , jobs : [] ,stat : ''}
        this.checstatus = this.checstatus.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/profile') // unimplemented
             .then(response => {
                 this.setState({details: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })

             
        }
        componentDidUpdate(){
        axios.get('http://localhost:4000/user/my-jobs',{
            params : {
                _id : this.state.details[0]._id
            }
        }) // unimplemented
            .then(response => {
                this.setState({jobs: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
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
                <Button variant="contained" color="primary" href="/dashboard-r" class="back">Back</Button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Job-Title</th>
                            <th>Recuiter Name</th>
                            <th>Recuiter Rating</th>
                            <th>Salary</th>
                            <th>Duration</th>
                            <th>Deadline</th>
                            <th>Max No. Of Applicants</th>
                            <th>Max No. of Positions</th>
                            <th>Current no. of Applicants</th>
                            <th>Current number of accepted</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>

                            {/* <th>Dispatch</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.jobs.map((job, i) => {

                            return (
                                <tr>
                                    <td>{job.title}</td>
                                    <td>{job.name_of_recuiter}</td>
                                    <td>{job.rating}</td>
                                    <td>{job.salary}</td>
                                    <td>{job.duration}</td>
                                    <td>{job.deadline}</td>
                                    <td>{job.max_applications}</td>
                                    <td>{job.max_positions}</td>
                                    <td>{job.curr_applicants.length}</td>
                                    <td>{job.curr_selected.length}</td>
                                    <td><button onClick = {() => {
                                        axios.get('http://localhost:4000/user/job-login' , {
                                            params : {
                                                _id : job._id,
                                                title : job.title
                                            }
                                        }
                                        )
                                        .then(window.location = "/job-details")
                                        .catch(function(err) {
                                            console.log(err);
                                        });

                                    }}>View</button></td>
                                    <td><button><Icon name='edit' size='large' onClick = {() => {
                                        axios.get('http://localhost:4000/user/job-login' , {
                                            params : {
                                                _id : job._id,
                                                title : job.title
                                            }
                                        }
                                        )
                                        .then(window.location = "/edit-job")
                                        .catch(function(err) {
                                            console.log(err);
                                        });

                                    }}/></button></td>
                                    <td><button><Icon name='delete' size='large' onClick = {() => {
                                        axios.get('http://localhost:4000/user/delete-job' , {
                                            params : {
                                                _id : job._id,
                                              //  title : job.title
                                            }
                                        });
                                        axios.get('http://localhost:4000/user/delete-job2' , {
                                            params : {
                                                _id : job._id,
                                              //  title : job.title
                                            }
                                        });
                                        axios.get('http://localhost:4000/user/delete-job3' , {
                                            params : {
                                                _id : job._id,
                                              //  title : job.title
                                            }
                                        });
                                        axios.get('http://localhost:4000/user/delete-job4' , {
                                            params : {
                                                _id : job._id,
                                              //  title : job.title
                                            }
                                        });

                                    }}/></button></td>

                                    {/* <td><input type="button" value="Dispatch" className="btn btn-primary"/></td> */}
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

export default CreatedJobs;