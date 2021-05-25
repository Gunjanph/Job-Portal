import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

class myapplications extends Component {
    
    constructor(props) {
        super(props);
        this.state = { details : [] ,jobs : [] ,stat : '',rating : ''}
        this.checstatus = this.checstatus.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/get-info') // unimplemented
             .then(response => {
                 this.setState({details: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        axios.get('http://localhost:4000/user/get-myjobs') // unimplemented
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
    onChange = e => {
        var nam = e.target.name;
        var val = e.target.value;
       // console.log(e.target.value)
       // console.log(this.state.title)
        this.setState({ [nam] : val });
    }
    render() {
        return (
            <div>
                <Button variant="contained" color="primary" href="/dashboard-a" class="back">Back</Button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Job-Title</th>
                            <th>Recuiter Name</th>
                            <th>Salary</th>
                            <th>Date of Joining</th>
                            <th>Status of Application</th>
                            <th>Rate the Job</th>

                            {/* <th>Dispatch</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.jobs.map((job, i) => {
                            var status;
                            var join_date = "NA";
                            var yes = true

                            if(this.state.details[0].job_selected === job._id)
                            {
                                status = "Accepted"
                                join_date = this.state.details[0].date_of_joining;
                                yes = false;
                            }
                            else 
                            {
                                var f=0;
                                var x = this.state.details[0]._id;
                                for( i = 0; job.curr_rejected.length ;i++)
                                {
                                    if(x===job.curr_rejected[i])
                                    {
                                        f=1;
                                        status = "Rejected"
                                        break;
                                    }
                                }
                                if(f==0)
                                {
                                    // console.log("hurray")
                                    // console.log(x)
                                    // console.log(job.curr_shortlisted[0])
                                    // console.log("hurray")
                                    for( i = 0; job.curr_shortlisted.length ;i++)
                                    {
                                        // console.log(x)
                                        // console.log(job.curr_shortlisted[i])
                                        if(x===job.curr_shortlisted[i])
                                        {
                                            f=1;
                                            status = "ShortListed"
                                            break;
                                        }
                                     }
                                }
                                if(f===0)
                                {
                                    status = "Applied"
                                }
                            }
                            for(i = 0;i<job.rated_by.length;i++)
                            {
                                if(job.rated_by[i]===this.state.details[0]._id)
                                {
                                    yes = true;
                                }
                            }

                            return (
                                <tr>
                                    <td>{job.title}</td>
                                    <td>{job.name_of_recuiter}</td>
                                    <td>{job.salary}</td>
                                    <td>{join_date}</td>
                                    <td>{status}</td>
                                    <td><input type = "range"
                                        value={this.state.rating}
                                        name = "rating"
                                        onChange={this.onChange}
                                        max = "5" disabled={yes}/> <button disabled={yes} onClick={() => {
                                            axios.get('http://localhost:4000/user/rate-job',{
                                                params : {
                                                    jobid : job._id , 
                                                    userid : this.state.details[0]._id,
                                                    rating : this.state.rating
                                                }
                                            }) // unimplemented
                                            window.location.reload(false);
                                        }}>Done</button></td>
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

export default myapplications;