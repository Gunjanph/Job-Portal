import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import {Form} from 'react-bootstrap'

export default class editprofiler extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password : '', 
            bio : '',
            contactno : '',
            
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChangeUsername(event) {
  //      console.log(event.target.name)
   //     console.log(event.target.value)
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    handleChange = (e) => {
     //   console.log("called")
        let value = Array.from(e.target.selectedOptions, option => option.value);
     //   console.log(this.state.value[0])
        this.setState({skills: value});
        
      }

    
        onChange = e => {
            var nam = e.target.name;
            var val = e.target.value;
          //  console.log(nam)
          //  console.log(val)
            this.setState({ [nam] : val });
        }

        
    
    onSubmit(e) {
        e.preventDefault();
        

            axios.get('http://localhost:4000/user//edit-recuiter', {
                params : {
                    name: this.state.name,
                    email: this.state.email,
                    password : this.state.password,
                //    type: this.state.type ,
                    contactno : this.state.contactno ,
                    bio : this.state.bio
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
                    <div className="form-group common">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               required/>
                    </div>
                    <div className="form-group common">
                        <label>Email: </label>
                        <input type="email" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               required/>  
                    </div>
                    <div className="form-group common">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               name = "password"
                               value={this.state.password}
                               onChange={this.onChange}
                               required/>  
                    </div>
                    <div className="form-group ">
                        <label>Contact No: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.contactno}
                               onChange={this.onChange}
                               name = "contactno"
                               />  
                    </div>
                    <div className="form-group ">
                        <label>Bio: </label>
                        <textarea  maxLength="250" className="form-control" 
                        value={this.state.bio} 
                        onChange= {this.onChange}
                         name ="bio">
                        </textarea> 
                    </div>
                    <div className="form-group common">
                        <input type="submit" value="Done" className="btn btn-primary common"/>
                    </div>
                </Form>
            </div>
        )
    }
}