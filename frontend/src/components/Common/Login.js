import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
         //   date:null
        }

        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange = e => {
        var nam = e.target.name;
        var val = e.target.value;
        this.setState({ [nam] : val });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
          //  name: this.state.name,
            email: this.state.email,
            password : this.state.password
         //   date: Date.now()
        }
        axios.post('http://localhost:4000/user/login', newUser)
             .then(function(res){
                 console.log("final")
             if(res.data===1 || res.data===2)
             {
                //  console.log("inin")
                 window.location = "/login"
                 alert("Wrong Username or Password")
             }
             else if(res.data===4)
             {
                // console.log("ninin")
                 window.location = "/dashboard-r" 
             }
             else
             {
                 window.location = "/dashboard-a"
             }
            });

        this.setState({
            email: '',
            password: '',
        //    date:null
        });
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" href="/" class="back">Back</Button>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" 
                                name = "email"
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChange}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                                name = "password"
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChange}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}