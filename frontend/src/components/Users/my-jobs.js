import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Icon } from 'semantic-ui-react'
import {Row , Col} from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown';


class Myjobs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {details: [] , jobs : [] ,stat : '' , search : '' , types : ['Full-time' ,'Part-Time' ,'Work From Home'],
         options : ['Full-time' ,'Part-Time' ,'Work From Home'],
        lowl : '',
        highl : '',
        duration : 7}
        this.checstatus = this.checstatus.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.fun = this.fun.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/profile') // unimplemented
             .then(response => {
                 this.setState({details: response.data});
                 axios.get('http://localhost:4000/user/active-jobs', {
                    params : {
                        id : this.state.details[0]._id
                    }
                }) // unimplemented
                    .then(response => {
                        this.setState({jobs: response.data});
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
             })
             .catch(function(error) {
                 console.log(error);
             })
            
        
        
    }
    fun(job) {
        if(this.state.details[0].jobs_applied.length == 10)
        {
            alert("You cannot have more than 10 open job applications")
        }
        else{
        var str1 = prompt('Enter Your SOP')
        str1 = ((str1.replace(/(^\s)|(\s$)/gi,"")).replace(/[ ]{2,}/gi," ")).replace(/\n /,"\n");

        if(str1.split(' ').length>=251)
        {
            alert("SOP cannot exceed 250 words");
        }
        const today = Date.now();
        var x = new Intl.DateTimeFormat('ko-KR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit' ,hour12 : false }).format(today);
        if(str1){
        axios.get('http://localhost:4000/user/apply-job' , {
            params : {
                _id : job._id,
                sop : str1,
                date : x
            }
        }
        )
        .then(response => console.log(response))
        .catch(function(err) {
            console.log(err);
        });
        axios.get('http://localhost:4000/user/add-applicant' , {
            params : {
                _id : job._id,
                email : this.state.details[0].email,
                title : job.title
            }
        }
        )
        .then(response => console.log(response))
        .catch(function(err) {
            console.log(err);
        });
    }
    }
    }
    onSort(event , sortKey ,val){
        const jobs = this.state.jobs;
        jobs.sort((a,b) => {
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
            else if(sortKey === 'salary')
            {
                nameA = a.salary;
                nameB = b.salary;
            }
            else
            {
                nameA = a.duration;
                nameB = b.duration;
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
        this.setState({jobs : jobs})
        // console.log(jobs)
    }
    checstatus(_id)
    {
        var x = this.state.details[0].jobs_applied
        var i
        var f=0
        for(i = 0 ;i<x.length ;i++){
            if(x[i]===_id)
                f=1;
        }
        x = this.state.details[0].job_selected;
        if(x!=='')
            f=2;
        return f;
    }
    onChange = e => {
        var nam = e.target.name;
        var val = e.target.value;
        this.setState({ [nam] : val });
    }
    onSelect(selectedList, selectedItem) {
        var newArr = selectedList;
        this.setState({types : newArr})
    }
    onRemove(selectedList, removedItem) {
        var newArr = selectedList;
        this.setState({types : newArr})
    }
    handleChange = (e) => {
     //   console.log("called")
        let value = Array.from(e.target.selectedOptions, option => option.value);
       // console.log(this.state.value[0])
        this.setState({types: value});
        
      }

    render() {
        var jobs = this.state.jobs;
        // console.log("here");
        // console.log(jobs)
        const searchedtitle = jobs.filter(job => {
            return job.title.toLowerCase().includes(this.state.search.toLowerCase())
        })
        const searchedtitle2 = searchedtitle.filter(job => {
            return this.state.types.includes(job.type)
        })
        const searchedtitle3 = searchedtitle2.filter(job => {
            var low = this.state.lowl;
            var high = this.state.highl;
            if(this.state.lowl==='')
                low = 0;
            if(this.state.highl==='')
            {
                return job.salary >= low;
            }
            else
            {
                return (job.salary >=low && job.salary <=high);
            }
        })
        const searchedtitle4 = searchedtitle3.filter(job => {
            return job.duration < this.state.duration;
        })
        return (
            <div>
                <Button variant="contained" color="primary" href="/dashboard-a" class="back">Back</Button>
                <br></br>
                <br></br>
                <br></br>
                <label>Job-Type</label>
                <Multiselect onSelect={this.onSelect} onRemove={this.onRemove} options={this.state.options} isObject={false} onChange = {this.handleChange} selectedValues={this.state.types}/>
                <label>Salary Range</label>
                <Row>
                    <Col>
                    <label>Lower Limit</label>
                    <input type = "number" name="lowl" onChange = {this.onChange}/>
             
                    <label>Upper Limit</label>
                    <input type = "number" name="highl" onChange = {this.onChange}/>
                    </Col>
                </Row>
                <label>Job Duration: </label>
                        <select 
                               className="form-control" 
                               value={this.state.duration}
                               name = "duration"
                               onChange={this.onChange}
                               >
                                        <option value="7">7</option>
                                       <option value="6">6</option>
                                       <option value="5">5</option>
                                       <option value="4">4</option>
                                       <option value="3">3</option>
                                       <option value="2">2</option>
                                       <option value="1">1</option>
                                       

                        </select>
                <br></br>
                <input type="text" placeholder="Search by Job-Title" className="form-control" name = "search" value={this.state.search} onChange={this.onChange} />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Job-Title</th>
                            <th>Recuiter Name</th>
                            <th>Job-Type</th>
                            <th>Rating <Icon name='angle up' size='large' onClick = {e => this.onSort(e,'rating',0)} /> <Icon name='angle down' size='large' onClick = {e => this.onSort(e,'rating',1)} /></th>
                            <th>Salary <Icon name='angle up' size='large' onClick = {e => this.onSort(e,'salary',0)} />  <Icon name='angle down' size='large' onClick = {e => this.onSort(e,'salary',1)}/></th>
                            <th>Duration <Icon name='angle up' size='large' onClick = {e => this.onSort(e,'duration',0)}/>  <Icon name='angle down' size='large'onClick = {e => this.onSort(e,'duration',1)} /></th>
                            <th>Deadline</th>
                            <th>Apply</th>

                            {/* <th>Dispatch</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        searchedtitle4.map((job, i) => {
                            var f = this.checstatus(job._id)
                            var val;
                            var col=  "green";
                           // var stat
                            if(f==1){
                                val = "Applied"
                                col = "blue"
                            }
                            else if(f==2){
                                val = "Already Accepted in Some Job";
                                col = "orange"
                            }
                            else
                            {
                                console.log(job.title)
                                console.log(job.max_applications)
                                console.log(job.curr_applicants.length)
                                console.log(job.curr_rejected.length)
                                console.log(job.max_positions)
                                console.log(job.curr_selected.length)
                                if(job.max_applications == (job.curr_applicants.length + job.curr_rejected.length) ){
                                    val = "Full"
                                    col = "red"
                                 
                                }
                                else if(job.max_positions == job.curr_selected.length){
                                    val = "Full"
                                    col = "red"
                                }
                                else{
                                    val = "Apply"
                                  //  col = "red"
                                }
                            }
                            var rat = "NA"
                            if(job.rating_cn !== 0)
                            {
                                rat = job.rating/job.rating_cn;
                            }
                            return (
                                <tr>
                                    <td>{job.title}</td>
                                    <td>{job.name_of_recuiter}</td>
                                    <td>{job.type}</td>
                                    <td>{rat}</td>
                                    <td>{job.salary}</td>
                                    <td>{job.duration}</td>
                                    <td>{job.deadline}</td>
                                    <td><button onClick = { () => {
                                        console.log(val);
                                        if(val === "Apply")
                                        {
                                            this.fun(job);
                                            window.location.reload(false);
                                        }
                                        
                                    }} style= {{color : 'white' ,backgroundColor: col ,}}>{val}</button></td>

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

export default Myjobs;