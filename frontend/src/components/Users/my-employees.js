import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Icon } from 'semantic-ui-react'

class myemployees extends Component {
    
    constructor(props) {
        super(props);
        this.state = {details: [] , curr_job : [] ,stat : '', rating : 0}
        this.checstatus = this.checstatus.bind(this);
        this.onSort = this.onSort.bind(this);
    }

    onSort(event , sortKey ,val){
        const details = this.state.details;
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
            else if(sortKey === 'job_selected')
            {
                nameA = a.job_selected;
                nameB = b.job_selected;
            }
            else
            {
                nameA = a.date_of_joining;
                nameB = b.date_of_joining;
                // console.log(nameB)
                // console.log(nameA)
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

    componentDidMount() {
        axios.get('http://localhost:4000/user/myemployees') // unimplemented
             .then(response => {
                 this.setState({details: response.data});
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
                <Button variant="contained" color="primary" href="/dashboard-r" class="back">Back</Button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Applicant Name<Icon name='angle up' size='large' onClick = {e => this.onSort(e,'name',0)} /> <Icon name='angle down' size='large' onClick = {e => this.onSort(e,'name',1)} /></th>
                            <th>Date of Joining<Icon name='angle up' size='large' onClick = {e => this.onSort(e,'date_of_joining',0)} /> <Icon name='angle down' size='large' onClick = {e => this.onSort(e,'date_of_joining',1)} /></th>
                            <th>Job-Type</th>
                            <th>Job-Selected<Icon name='angle up' size='large' onClick = {e => this.onSort(e,'job_selected',0)} /> <Icon name='angle down' size='large' onClick = {e => this.onSort(e,'job_selected',1)} /></th>
                            <th>Applicant-Rating<Icon name='angle up' size='large' onClick = {e => this.onSort(e,'rating',0)} /> <Icon name='angle down' size='large' onClick = {e => this.onSort(e,'rating',1)} /></th>
                            <th>Rating</th>
                            {/* <th>Dispatch</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.details.map((user, i) => {
                            var yes = false;
                            for(i =0;i<user.rated_by.length;i++)
                            {
                                if(user.rated_by[i]===user.recuiter_selected)
                                {
                                    yes = true
                                }
                            }
                            var rat = "Not Rated Yet"
                            if(user.rating_cn !==0)
                            {
                                rat = user.rating/user.rating_cn;
                            }
                            return (
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.date_of_joining}</td>
                                    <td>{user.type_of_job_selected}</td>
                                    <td>{user.job_selected}</td>
                                    <td>{rat}</td>
                                    <td><input type = "range"
                                        value={this.state.rating}
                                        name = "rating"
                                        onChange={this.onChange}
                                        max = "5" disabled={yes}/> <button  disabled={yes} onClick={() => {
                                            axios.get('http://localhost:4000/user/rate-applicant',{
                                                params : {
                                                    jobid : user.job_selected , 
                                                    userid : user._id,
                                                    recid : user.recuiter_selected,
                                                    rating : this.state.rating
                                                }
                                            }) // unimplemented
                                            window.location.reload(false);
                                        }}>Done</button></td>
                        
{/*                     
                                    <div>
                                    <td>{val}</td>
                                    <td><button>{buttonval}</button></td>
                                    <td><button>Reject</button></td>
                                    </div> */}

                        
                        


                                  
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

export default myemployees;