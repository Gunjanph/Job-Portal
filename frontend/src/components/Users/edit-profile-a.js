import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import {Form} from 'react-bootstrap'
import {Row , Col} from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown';

export default class Editprofilea extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password : '',
            edcn : 1 ,
            education :[{
                inst : '',
                joind : 2019,
                endd : 2020
            }],
            ed00 : '',ed01 : '' , ed02 : '' ,
            ed10 : '',ed11 : '' , ed12 : '' ,
            ed20 : '',ed21 : '' , ed22 : '' ,
            rating : 0 ,
            skills : [],
            options: ['C','C++'],
            more: '',
            details: []
            
        }
        this.multiselectRef = React.createRef();
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fun= this.fun.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.ekaur = this.ekaur.bind(this);
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
    fun() {
        var cn = this.state.edcn +1;
        this.setState({edcn: cn});
        var n  = this.state.edcn;
     //   console.log(n);
        var st = 'ed-' + n.toString();
     //   console.log(st);
        document.getElementById(st).style.display = "block";
        if(n == 3)
            document.getElementById("addmore").style.display = "none";
    }
    onChangeUsername(event) {
    //    console.log(event.target.name)
      //  console.log(event.target.value)
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    handleChange = (e) => {
      //  console.log("called")
        let value = Array.from(e.target.selectedOptions, option => option.value);
      //  console.log(this.state.value[0])
        this.setState({skills: value});
        
      }
        onChange = e => {
            var nam = e.target.name;
            var val = e.target.value;
          //  console.log(nam)
          //  console.log(val)
            this.setState({ [nam] : val });
        }
        onSelect(selectedList, selectedItem) {
            var newArr = selectedList;
            this.setState({skills : newArr})
        }
        ekaur(e) {
            var newArr = this.state.options;
            newArr.push(this.state.more)
            this.setState({options : newArr , more : ''})

        }
        
    
    onSubmit(e) {
        e.preventDefault();
        var c00 = this.state.ed00;
        var c01 = this.state.ed01;
        var c02 = this.state.ed02;
        var c10 = this.state.ed10;
        var c11 = this.state.ed11;
        var c12 = this.state.ed12;
        var c20 = this.state.ed20;
        var c21 = this.state.ed21;
        var c22 = this.state.ed22;

        const ed1 = {
            inst : c00,
            joind : c01,
            endd : c02
        }
        const ed2 = {
            inst : c10,
            joind : c11,
            endd : c12
        }
        const ed3 = {
            inst : c20,
            joind : c21,
            endd : c22
        }
        this.setState({education:[ed1,ed2,ed3]});
        
        axios.get('http://localhost:4000/user/edit-applicant', {
            params :
            {
                name : this.state.name,
                email: this.state.email,
                password : this.state.password ,
                education : this.state.education,
          //      rating : this.state.rating,
                skills : this.state.skills
            }
        })
             .then(function(res){
                window.location = "/profile"
            });
    }

    render() {
        return (
            <div>
               <Button variant="contained" color="primary" href="/profile" class="back">Back</Button>
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               required/>
                    </div>
                    <div className="form-group ">
                        <label>Email: </label>
                        <input type="email" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               required/>  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               name = "password"
                               value={this.state.password}
                               onChange={this.onChange}
                               required/>  
                    </div>
                    <div className="form-group">
                        <label>Education: </label>
                        <Button color="secondary" id = "addmore" onClick = {this.fun}>Add More</Button>
                        <div id = "ed-1">
                            <Row>
                                <Col>
                        <label>Institution Name</label>
                        <input type="text" 
                               className="form-control" 
                               name = "ed00"
                               value={this.state.ed00}
                               onChange={this.onChange}
                               />
                               </Col>
                               <Col>
                        <label>Start Year</label>
                        <input type ="number"
                                min="1950"
                                max="2021"
                                className="form-control"
                                name = "ed01"
                                value = {this.state.ed01}
                                onChange = {this.onChange}
                        />
                        </Col>
                        <Col>
                        <label>End Year</label>
                        <input type ="number"
                                name = "ed02"
                                min="1950"
                                max="2021"
                                className="form-control"
                                value = {this.state.ed02}
                                onChange = {this.onChange}
                        />
                        </Col>
                        </Row>
                        </div>
                        <div id = "ed-2" >
                            <Row>
                                <Col>
                        <label>Institution Name</label>
                        <input type="text" 
                                name = "ed10"
                               className="form-control" 
                               value={this.state.ed10}
                               onChange={this.onChange}
                               />
                               </Col>
                               <Col>
                        <label>Start Year</label>
                        <input type ="number"
                                 name = "ed11"
                                 min="1950"
                                max="2021"
                                className="form-control"
                                value = {this.state.ed11}
                                onChange = {this.onChange}
                        />
                        </Col>
                        <Col>
                        <label>End Year</label>
                        <input type ="number"
                                name = "ed12"
                                min="1950"
                                max="2021"
                                className="form-control"
                                value = {this.state.ed12}
                                onChange = {this.onChange}
                        />
                        </Col>
                        </Row>
                        </div>
                        <div id = "ed-3" >
                            <Row>
                                <Col>
                                <label>Institution Name</label>
                        <input type="text" 
                                name = "ed20"
                               className="form-control" 
                               value={this.state.ed20}
                               onChange={this.onChange}
                               />
                               </Col>
                               <Col>
                        <label>Start Year</label>
                        <input type ="number"
                                name = "ed21"
                                min="1950"
                                max="2021"
                                className="form-control"
                                value = {this.state.ed21}
                                onChange = {this.onChange}
                        />
                        </Col>
                        <Col>
                        <label>End Year</label>
                        <input type ="number"
                                name = "ed22"
                                min="1950"
                                max="2021"
                                className="form-control"
                                value = {this.state.ed22}
                                onChange = {this.onChange}
                        />
                        </Col>
                        </Row>
                        </div>
                    </div>
                    
                    <div className="form-group" >

                    <label>Skills:</label>
                    <Multiselect onSelect={this.onSelect} onRemove={this.onRemove} options={this.state.options} isObject={false} onChange = {this.handleChange}/>
                    </div>
                    <div className = "form-group ">
                        <label>Skills not in the List</label>
                        <input type="text"className = "form-control" name="more" value={this.state.more} onChange={this.onChange}/>
                        <Button color="secondary"onClick={this.ekaur}>Add Skill</Button>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Done" className="btn btn-primary common"/>
                    </div>
                </Form>
            </div>
        )
    }
}