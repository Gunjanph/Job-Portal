import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './search.css';
import axios from 'axios';
// import viewOrders from './view-order1';
// import Place from './place-order1';

export default class order extends Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state={
			id:this.props.match.params.id
		}
	}

	render(){
		return(
			<Router>
			<div style={{textAlign:"right",fontSize:"30px",fontFamily:"monospace",color:"blue"}}>Hello {this.props.match.params.id}</div>
			<div>
			  <nav style={{ lineWidth:"1500px"}}>
				<div style={{ display: "flex",flexDirection: "row",justifyContent: "space-between", alignItems: "center",flexWrap: "Wrap" }}>
					<div className="nav-wrapper white" style={{ width: "50%"}}>
						<Link
							to={"/applicant/"+this.props.match.params.id+"/apply"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Apply for Job
						</Link>
					</div>
					<div className="nav-wrapper white" style={{ width: "50%"}}>
						<Link
							to={"/applicant/"+this.props.match.params.id+"/applied"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Jobs Applied
						</Link>
					</div>
					</div>
				</nav>
	    	  </div>
			</Router>
		)
	}
}