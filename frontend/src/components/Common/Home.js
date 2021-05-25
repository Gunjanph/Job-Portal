import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import "bootstrap/dist/css/bootstrap.min.css" 
import './Home.css'



export default class Home extends Component {
    
    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        return (
            <div>
                <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Button variant="contained" color="primary" href="/register">Register</Button>
                            </li>
                            <br></br>
                            <li className="navbar-item">
                                <Button variant="contained" color="secondary" href="/login">Login</Button>
                            </li>                      
                </ul>
                
           </div>
        )
    }
}