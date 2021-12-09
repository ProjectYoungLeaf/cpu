
import React, { Component }  from "react";
import { Navbar, Button, Image, Nav, Form, FormControl } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import { withRouter } from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Header extends Component {

  state = {
    yesjoin: "none",
    notjoin : "none"
  };

  componentDidMount() {


    if ($.cookie("login_id")) {
      this.setState({
        yesjoin: "block",
        notjoin: "none"
      });
      
      }
      
    else {
      this.setState({
        yesjoin: "none",
        notjoin:"block"
      });
    }

    
  }



  logout = () => {
    axios
      .get("http://localhost:8080/member/logout", {
        headers
      })
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_id");
          alert("로그아웃 되었습니다!");
          this.props.history.push('/');
            window.location.reload();
        }
      });
  };

  conform = () => {
    if($.cookie("login_id")){
      this.props.history.push('/boardform');
    }
     else {
       alert("로그인을 해주세요!");
       this.props.history.push('/loginform');
   }  
   }

  render() {
    
    const loginstyle = {
      margin: "0px 5px 0px 10px",
      display: this.state.notjoin
    };

    const logoutstyle  = {
      margin: "0px 5px 0px 10px",
      display: this.state.yesjoin

    };

    return (
     <div>
        <>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <Nav.Link href="/">
            CPU HOMEPAGE
            </Nav.Link>
            </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={this.conform}>
                내글목록
            </Nav.Link>
            <Nav.Link href="/allboard">
               전체글목록
            </Nav.Link>
            <Nav.Link href="/mypage">
              마이페이지
            </Nav.Link>
          
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
          <NavLink to="/loginForm">   
            <Button style={loginstyle} variant="success">
              로그인
            </Button>
            <Button style={logoutstyle} onClick={this.logout} variant="secondary">
              로그아웃
            </Button>
          </NavLink>   
        </Navbar>
        
      </>    
      <img src="./img/banner.jpg" />  
       </div>
    );
  }
}

export default withRouter(Header);