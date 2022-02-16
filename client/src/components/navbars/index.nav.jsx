import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";

var socket;
class Nav extends Component {
    constructor(){
        super();
        this.state = {
            endpoint:'http://localhost:3000'
        };
        socket = socketIOClient(this.state.endpoint)

    }
    render(){

        return(
            <>
                <nav>
                    <NavLink activeclassname="active" to={'/'}>home</NavLink>
                    <NavLink to={'/kitchen'}>kitchen</NavLink>
                    <NavLink to={'/updatePredicted'}>updatePredicted</NavLink>
                    <NavLink to={"/chat"}>Chat</NavLink>
                </nav>
            </>
        )
    }
}

export  {Nav,socket};