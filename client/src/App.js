import React, { Component } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './containers/home-page/index.home';
import {Nav} from "./components/navbars/index.nav";
import Kitchen from "../../../tripods/admin-app/src/kitchen/index.kitchen";
import UpdatePredicted from "./containers/update-predicted/index.predicted";
import ChatPage from "./containers/chat/index.msg";
import Sidenav from "./components/footer/SideNav";
import Footer from "./components/footer/Footer";

class App extends Component {
  render(){
    return(

      <>
      <Sidenav/>
        {/* <Nav/> */}
        <div className="main-container">

        <Routes>
          <Route exact path={"/"} element={<HomePage/>} />
          <Route exact path="/chat" element={<ChatPage/>}/>
        </Routes>

        <Footer/>
        </div>
      </>
    )
      }
}

export default App;
