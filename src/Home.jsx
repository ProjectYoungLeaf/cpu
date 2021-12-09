import React, { Component } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink, Route } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import LoginForm from "./LoginForm";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Home extends Component {
  
    
  render() {
   
    return (
      <>
        <h1>
            Welcome to visit our website~~~!!!<br/>
            If you want to, please join our homepage!
        </h1>
        
      </> 
    );
  }

}
export default Home;