
import React, {Component} from "react";
import {Route} from 'react-router-dom';
import Home from "./Home";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import { Form, Button } from "react-bootstrap";
import axios from "axios"; //axios : http client 라이브러리, 비동기방식으로 http 데이터 요청을 할때 사용 (http request대신 사용)
import $ from "jquery";
import {} from "jquery.cookie"; //로그인, 로그아웃 시 사용
axios.defaults.withCredentials = true; //AJAX통신 시 node.js 서버에 통신호출하여 DB에서 데이터를 가져옴. url 앞의주소가 같아야함.
const headers = {withCredentials: true};

class LoginForm extends Component {
    componentDidMount() {
      loadReCaptcha("6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb");
    }
  
    verifyCallback = recaptchaToken => {
      // Here you will get the final recaptchaToken!!!
      console.log(recaptchaToken, "<= your recaptcha token");
    };
  
    join = () => {
      const joinEmail = this.joinEmail.value;
      const joinName = this.joinName.value;
      const joinPw = this.joinPw.value;
      const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
      if (joinEmail === "" || joinEmail === undefined) {
        alert("이메일 주소를 입력해주세요.");
        this.joinEmail.focus();
        return;
      } else if (
        joinEmail.match(regExp) === null ||
        joinEmail.match(regExp) === undefined
      ) {
        alert("이메일 형식에 맞게 입력해주세요.");
        this.joinEmail.value = "";
        this.joinEmail.focus();
        return;
      } else if (joinName === "" || joinName === undefined) {
        alert("이름을 입력해주세요.");
        this.joinName.focus();
        return;
      } else if (joinPw === "" || joinPw === undefined) {
        alert("비밀번호를 입력해주세요.");
        this.joinPw.focus();
        return;
      } else if (
        joinPw.match(regExp2) === null ||
        joinPw.match(regExp2) === undefined
      ) {
        alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
        this.joinPw.value = "";
        this.joinPw.focus();
        return;
      }
  
      const send_param = {
        headers,
        email: this.joinEmail.value,
        name: this.joinName.value,
        password: this.joinPw.value
      };
      axios
        .post("http://localhost:8080/member/join", send_param)
        //정상 수행
        .then(returnData => {
          if (returnData.data.message) {
            alert(returnData.data.message);
            //이메일 중복 체크
            if (returnData.data.dupYn === "1") {
              this.joinEmail.value = "";
              this.joinEmail.focus();
            } else {
              this.joinEmail.value = "";
              this.joinName.value = "";
              this.joinPw.value = "";
            }
          } else {
            alert("회원가입 실패");
          }
        })
        //에러
        .catch(err => {
          console.log(err);
        });
    };
    login = () => {
      const loginEmail = this.loginEmail.value;
      const loginPw = this.loginPw.value;
  
      if (loginEmail === "" || loginEmail === undefined) {
        alert("이메일 주소를 입력해주세요.");
        this.loginEmail.focus();
        return;
      } else if (loginPw === "" || loginPw === undefined) {
        alert("비밀번호를 입력해주세요.");
        this.loginPw.focus();
        return;
      }
  
      const send_param = {
        headers,
        email: this.loginEmail.value,
        password: this.loginPw.value
      };
      axios
        .post("http://localhost:8080/member/login", send_param)
        //정상 수행
        .then(returnData => {
          if (returnData.data.message) {
            // console.log("login_id:" + returnData.data._id);
            $.cookie("login_id", returnData.data._id, { expires: 1 });
            $.cookie("login_email", returnData.data.email, { expires: 1 });
            alert(returnData.data.message);
            window.location.href="/";
          } else {
            alert(returnData.data.message);
          }
        })
        //에러
        .catch(err => {
          console.log(err);
        });
    };


    render() {
      const formStyle = {
        margin: 50
      };
      const buttonStyle = {
        marginTop: 10
      };
  
      return (
        <Form style={formStyle}>
          <Form.Group controlId="joinForm">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              maxLength="100"
              ref={ref => (this.joinEmail = ref)}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              maxLength="20"
              ref={ref => (this.joinName = ref)}
              placeholder="name"
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              maxLength="64"
              ref={ref => (this.joinPw = ref)}
              placeholder="Password"
            />
            <Button
              style={buttonStyle}
              onClick={this.join}
              variant="primary"
              type="button"
              block
            >
              회원가입
            </Button>
          </Form.Group>
  
          <Form.Group controlId="loginForm">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              maxLength="100"
              ref={ref => (this.loginEmail = ref)}
              placeholder="Enter email"
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              maxLength="20"
              ref={ref => (this.loginPw = ref)}
              placeholder="Password"
            />
            <ReCaptcha
              sitekey="6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb"
              action="login"
              verifyCallback={this.verifyCallback}
            />
            <Button
              style={buttonStyle}
              onClick={this.login}
              variant="primary"
              type="button"
              block
            >
              로그인
              
            </Button>
          </Form.Group>
        </Form>
      );
    }
  }
  
  export default LoginForm;