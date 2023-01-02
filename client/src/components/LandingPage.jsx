import React from "react";
import { Link } from "react-router-dom"
import './LandingPage.css';
import control from "../Imagen/joystick-3d-render-icon-illustration-png.webp"


export default function loading(){
    return(
        <div className="landingbody">
            <div className="landing">
            
                <h1>VIDEOGAMES</h1>
                <Link to="/home">
                    <button className="btn">START</button>
                </Link>
                <img src={control} alt="img" height="300px" whidth="300px" />

            </div>
        </div>
        
        
    )
}
