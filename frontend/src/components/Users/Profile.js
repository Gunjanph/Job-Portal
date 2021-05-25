import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import './Profile.css'
import { ListGroup } from 'react-bootstrap';
class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {details: []};
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
    componentWillMount() {
       // console.log(this.state.details.type)
        if(this.state.details.type === "applicant")
        {
            var x =  document.getElementsByClassName("applicant");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "block";
              }
        }
        else
        {
             x =  document.getElementsByClassName("recuiter");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "block";
              }
        }
    }

    render() {
        return (
            <div>
                
                { 
                    this.state.details.map((user, i) => {
                        if(user.type === "applicant"){
                            var rat;
                            if(user.rating_cn == 0)
                             rat = "Not Rated Yet";
                             else
                             {
                                 rat = user.rating/user.rating_cn;
                             }
                           // console.log("applicant")
                        return (
                            
                            <div key={user.name}>
                            <Button variant="contained" color="primary" href="/dashboard-a" class="back">Back</Button>
                            
                            <ListGroup>
                                <ListGroup.Item>User Type : {user.type}</ListGroup.Item>
                                <ListGroup.Item variant="primary">Name : {user.name}</ListGroup.Item>
                                <ListGroup.Item variant="secondary">Email : {user.email}</ListGroup.Item>
                                <ListGroup.Item variant="success">Skills : {
                            user.skills.map((val,i) => {
                                return (
                                <span>{val} <span>&nbsp;&nbsp;</span> </span>
                                )
                            })
                        }</ListGroup.Item>
                                <ListGroup.Item variant="danger">Education :  {
                            user.education.map((val,i) => {
                                if(val.inst!==''){
                                return (
                                <span>{val.inst}({val.joind} - {val.endd}) <span>&nbsp;&nbsp;</span></span>
                                )
                                }
                                else
                                {
                                    return (
                                        <span></span>
                                    )
                                }
                            })
                        }      </ListGroup.Item>
                                <ListGroup.Item variant="warning">Rating : {rat}</ListGroup.Item>
                            </ListGroup>
                            <Button text-align="right" variant="contained" color="primary" href="/edit-profile-a" class="back">Edit-Profile</Button>
                            </div>
                        )
                            }
                        else
                        {
                            return (
                                <div>
                                    <Button variant="contained" color="primary" href="/dashboard-r" class="back">Back</Button>
                                    <ListGroup>
                                <ListGroup.Item>User Type : {user.type}</ListGroup.Item>
                                <ListGroup.Item variant="primary">Name : {user.name}</ListGroup.Item>
                                <ListGroup.Item variant="secondary">Email : {user.email}</ListGroup.Item>
                                <ListGroup.Item variant="success">Contact No : {user.contactno}</ListGroup.Item>
                                <ListGroup.Item variant="danger">Bio : {user.bio}</ListGroup.Item>
                            </ListGroup>
                            <Button text-align="right" variant="contained" color="primary" href="/edit-profile-r" class="back">Edit-Profile</Button>
                                </div>
                            )
                        }
                    })
                }
        </div>
        )
    }
}

export default Profile;