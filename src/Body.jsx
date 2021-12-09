import React, { Component } from "react";
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";

import Home from "./Home";
import { Route } from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";

class Body extends Component {
 

   
  render() {
    let resultForm;
   
    function getResultForm() {
      // console.log($.cookie("login_id"));
      if ($.cookie("login_id")) {
        resultForm = <Route path="/" exact={true} component={Home}></Route>;
        return resultForm;
     } else {
        resultForm = <Route path="/" component={LoginForm}></Route>;
        return resultForm;
      }
    }
    getResultForm();
    return (
      <div>
        {resultForm}
      </div>
    );
  }
}

export default Body;