import React, {Component} from 'react';
import { Link,Redirect } from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            profile: "Applicant",
            status: "",
            applicant: "",
            recruiter: "",
            errors: {}
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeProfile = this.onChangeProfile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeProfile(event) {
        this.setState({ profile: event.target.value });
    }
    
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        
        const userData = {
        	name: this.state.name,
        	password: this.state.password,
        	profile: this.state.profile
        };

        if(this.state.profile==="Recruiter")
        {
            axios.post('http://localhost:4000/recruiter/login', userData)
                .then(res => {
                        if(res.data.success)
                        {
                            this.setState({
                                status: "Login Successful",
                                recruiter: userData.name,
                                error:{}
                            })
                            alert("Login\t" + res.data.name);
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
            axios.post('http://localhost:4000/applicant/login', userData)
                .then(res => {
                        if(res.data.success)
                        {
                            this.setState({
                                status: "Login Successful",
                                applicant: userData.name,
                                errors: {}
                            })
                            alert("Login\t" + res.data.name);
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
            email: "",
            password: "",
            errors: {},
        })
    }

    render() {
        if(this.state.status==="Login Successful"){
            if(this.state.profile==="Recruiter")
                    return <Redirect push to={"recruiter/"+this.state.recruiter}/>
            else{
                    return <Redirect push to={"applicant/"+this.state.applicant}/>
                }
            }
        return (
            <div>
                <div>
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left"></i>
                            Back to Home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.25px" }}>
                        <h4>
                            <b>Login</b> Below...
                        </h4>
                        <p className="grey-text text-darken-1">
                            Tired of Unemployment <Link to="/register">Register</Link>
                        </p>
                    </div> 
                </div>
                <form onSubmit={this.onSubmit}>
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
                        <label>Profile: </label>
                        <select
                                required
                                value={this.state.profile}
                                onChange={this.onChangeProfile}
                                className="form-control">
                                <option value= "Applicant">Applicant</option>
                                <option value = "Recruiter" >Recruiter</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                    <div style={{color: "green", fontFamily:"Courier New", fontSize: "20px"}}>{this.state.status}</div>
                </form>
            </div>
        )
    }
}
