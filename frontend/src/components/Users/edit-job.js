import React, {Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import {Row , Col} from 'react-bootstrap'
import Button from '@material-ui/core/Button';
//import './Profile.css'
import { ListGroup } from 'react-bootstrap';
class editjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {details: [] , 
            max_applications : 0,
            max_positions : 0,
            year : 2021,
            month : 1,
            day : 24,
            hour : 23,
            minute : 55,
            deadline : '' };
            this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/curr-job-details') // unimplemented
        .then(response => {
            this.setState({details: response.data});
        })
        .catch(function(error) {
            console.log(error);
        })
        
    }
    onChange = e => {
        var nam = e.target.name;
        var val = e.target.value;
        // console.log(e.target.value)
        // console.log(this.state.title)
        this.setState({ [nam] : val });
    }
    onSubmit(e) {
        e.preventDefault();
        var smonth = this.state.month.toString();
        if(this.state.month < 10)
            smonth = '0' + smonth;

        var sday = this.state.day.toString();
        if(this.state.day < 10)
            sday = '0' + sday;

        var shour = this.state.hour.toString();
        if(this.state.hour < 10)
            shour = '0' + shour;

        var sminute = this.state.minute.toString();
        if(this.state.minute < 10)
            sminute = '0' + sminute;

        
        var dead = this.state.year.toString() + '. ' + smonth + '. ' + sday +'. ' + shour + ':' + sminute;
        this.state.deadline = dead ;

        axios.get('http://localhost:4000/user/edit-job', {
            params : {
                max_applications : this.state.max_applications,
                max_positions : this.state.max_positions,
                deadline : this.state.deadline
            }
        })
             .then(function(res){
                window.location.reload(false);
            });
 
    }

    render() {
        return (
            <div>
                { 
                    this.state.details.map((job, i) => {
                           // console.log("applicant")
                        return (
                            
                            <div key={job.title}>
                            <Button variant="contained" color="primary" href="/created-jobs" class="back">Back</Button>
                            
                            <ListGroup>
                                <ListGroup.Item>Job-Title : {job.title}</ListGroup.Item>
                                <ListGroup.Item variant="primary">Max-No-of-applicants : {job.max_applications}</ListGroup.Item>
                                <ListGroup.Item variant="secondary">Max-No-of-Positions : {job.max_positions}</ListGroup.Item>
                                <ListGroup.Item variant="success">Deadline :{job.deadline}</ListGroup.Item>
                            </ListGroup>
                            <Form onSubmit={this.onSubmit}>
                            <Row>
                        <Col>
                    <div className="form-group">
                        <label>Max Number of Applicants: </label>
                        <input type="number" 
                             name = "max_applications"
                             min = {job.curr_applicants.length}
                               className="form-control" 
                               value={this.state.max_applications}
                               onChange={this.onChange}
                               required/>  
                    </div>
                    </Col>
                    <Col>
                    <div className="form-group">
                        <label>Max Number of Positions: </label>
                        <input type="number" 
                             min = {job.curr_selected.length}
                             name = "max_positions"
                               className="form-control" 
                               value={this.state.max_positions}
                               onChange={this.onChange}
                               required/>  
                    </div>
                    </Col>
                    </Row>
                    <div className="form-group">
                        <label>Deadline :</label>
                        <br></br>
                        <Row>
                            <Col>
                        <label>Year :</label>
                        <input type="number" 
                             name = "year"
                             min="2021"
                             max ="2100"
                               className="form-control" 
                               value={this.state.year}
                               onChange={this.onChange}
                               required/>
                              </Col> <Col>
                        <label>Month :</label>
                        <input type="number" 
                             name = "month"
                             min="1"
                             max="12"
                               className="form-control" 
                               value={this.state.month}
                               onChange={this.onChange}
                               required/>
                               </Col><Col>
                        <label>Day :</label>
                        <input type="number" 
                             name = "day"
                             min="1"
                             max="31"
                               className="form-control" 
                               value={this.state.day}
                               onChange={this.onChange}
                               required/>
                               </Col><Col>
                        <label>Hour :</label>
                        <input type="number" 
                             name = "hour"
                             min="0"
                             max="59"
                               className="form-control" 
                               value={this.state.hour}
                               onChange={this.onChange}
                               required/>
                               </Col><Col>
                        <label>Minute :</label>
                        <input type="number" 
                             name = "minute"
                             min="0"
                             max="59"
                               className="form-control" 
                               value={this.state.minute}
                               onChange={this.onChange}
                               required/>
                               </Col>
                        </Row>
                    </div>
                                <div className="form-group">
                                    <input type="submit" value="Done" className="btn btn-primary common"/>
                                </div>
                             </Form>
                            </div>
                        )
                    })
                }
        </div>
        )
    }
}

export default editjob;