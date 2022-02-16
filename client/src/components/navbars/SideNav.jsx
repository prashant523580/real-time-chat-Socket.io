import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidenav.css";

const Sidenav = (props) => {
    const [menuWidth,setMenuWidth] = useState(0);
    const [rotate,setRotate] = useState(0)
    const [linkText,setLinkText] = useState("none");
    // console.log(items);
    let navlinks = [
        {
            link: "home",
            // icon: "home",
            path: "/"
        },
        {
            link:"chat",
            // icon: "chat",
            path:"/chat"
        },
     
      
    ];
    const toggleMenu = ()  => {
        if(menuWidth === 0){
            setMenuWidth(250);
            setLinkText("block");
            setRotate(180);
        }else{
            setLinkText("none");
            setMenuWidth(0);
            setRotate(360);
        }
    }
    return(
        <>
        <div className="side-nav">
            <div className="menu-icon">
                <div onClick={toggleMenu} style={{transform:`rotate(${rotate}deg)`}}> {'>'}</div> 
            </div>
            <div className="nav-links" style={{width:menuWidth+"px"}}>

            {
                navlinks.map((navlink,ind) => {
                    return(
                        <NavLink key={ind} exact={true} activeclassname="active" to={navlink.path}>{navlink.icon} <span style={{display:linkText}}>{navlink.link} </span></NavLink>
                        )
                    })
                }
                </div>
        </div>
        </>
    )      
}


export default Sidenav;