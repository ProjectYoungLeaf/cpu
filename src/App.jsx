import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import MypageForm from "./MypageForm";
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardAllForm from "./BoardAllForm";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Footer/>
    <Route path="/" exact={true} component={Home} />
    <Route path="/boardform"  component={BoardForm} />
    <Route path="/mypage" component={MypageForm} />
    <Route path="/board/detail" component={BoardDetail}/>
    <Route path="/loginform" component={LoginForm}/>
    <Route path="/boardWrite" component={BoardWriteForm}/>
    <Route path="/allboard" component={BoardAllForm}/>
    
  </BrowserRouter>
  );
}

export default App;