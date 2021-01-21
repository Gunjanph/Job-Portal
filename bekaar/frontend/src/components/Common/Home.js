import React, {Component} from 'react';
import  { Link } from "react-router-dom";
import axios from 'axios';

const divStyle = {
  margin: '40px',
  border: '5px solid pink',
  alignItems: 'center',
  fontSize: '25px',
  textAlign: 'center',
  backgroundColor: 'solid pink'
};

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div style ={{ height: "55vh" , width: "55%" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s6" style={divStyle}>
                <Link
                  to="/register">
                  REGISTER
                </Link>
            </div>
            <div className="col s6" style={divStyle}>
                <Link
                  to="/login"> LOGIN
                </Link>
            </div>
            <p className="flow-text grey-text text-darken-1">
            Tired of your unemployment or old job
            </p>
          </div>
        </div>
        )
    }
}