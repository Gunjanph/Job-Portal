import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Login from './components/Common/Login'
import Navbar from './components/templates/Navbar'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
      </div>
    </Router>
  );
}

export default App;
