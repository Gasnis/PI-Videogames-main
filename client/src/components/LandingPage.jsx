import React from "react";
import { Link } from "react-router-dom"
import './LandingPage.css';


export default function loading(){
    return(
        <div className="landingbody">
            <div className="landing">
            
                <h1>VIDEOGAMES</h1>
                <img src="http://25.media.tumblr.com/dbe486518f72879147e6b8b8f5ad9733/tumblr_mt5o1tji3x1sfmfe7o1_500.gif" alt="img" height="300px" whidth="300px" />
                <Link className="a" to="/home">
                    <button className="btn">START</button>
                </Link>

            </div>
        </div>
        
        
    )
}
