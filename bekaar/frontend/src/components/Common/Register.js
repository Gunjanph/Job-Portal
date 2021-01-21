import React, {Component} from 'react';
import { Link,Redirect } from "react-router-dom";
import axios from 'axios';

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            profile: "Applicant",
            status: "",
            errors: {}
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onChangeProfile = this.onChangeProfile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
        this.setState({ status: '' });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangePassword2(event) {
        this.setState({ password2: event.target.value });
    }
    
    onChangeProfile(event) {
        this.setState({ profile: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            profile: this.state.profile
        }

        if(this.state.profile==="Recruiter")
        {
            axios.post('http://localhost:4000/recruiter/register', newUser)
                .then(res => {
                        if("_id" in res.data)
                        {
                            this.setState({
                                status: "Registeration Successful",
                                errors: {}
                            })
                            window.location.href = 'http://localhost:3000/login';
                            alert("Created\t" + res.data.name);
                        }
                        else{
                            this.setState({
                                errors:res.data
                            });
                        }
                        console.log(this.state.errors);
                });
        }
        else{
            axios.post('http://localhost:4000/applicant/register', newUser)
                .then(res => {
                        if("_id" in res.data)
                        {
                            this.setState({
                                status: "Registeration Successful",
                                errors: {}
                            })
                            window.location.href = 'http://localhost:3000/login';
                            alert("Created\t" + res.data.name);
                        }
                        else{
                            this.setState({
                                errors:res.data
                            });
                        }
                        console.log(this.state.errors);
                });
        }
        this.setState({
            name: "",
            email: "",
            password: "",
            password2: "",
            status: "",
            errors: {},
            profile: "Applicant"
        })
        console.log(newUser);
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left"></i>
                            Back to Home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.25px" }}>
                        <h4>
                            <b>Register</b> Below...
                        </h4>
                        <p className="grey-text text-darken-1">
                            Already using this app? <Link to="/login">Login</Link>
                        </p>
                    </div> 
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password2}
                               onChange={this.onChangePassword2}
                               />
                    </div>
                    <div className="form-group">
                        <label>Profile: </label>
                        <select
                                value={this.state.profile}
                                onChange={this.onChangeProfile}
                                className="form-control">
                                <option value= "Applicant">Applicant</option>
                                <option value = "Recruiter" >Recruiter</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                    <div style={{color: "green", fontFamily:"Courier New", fontSize: "20px"}}>{this.state.status}</div>
                </form>
            </div>
        )
    }
}
