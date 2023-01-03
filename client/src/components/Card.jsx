import React from "react";
import "./Card.css"
import {Link} from "react-router-dom"


export default function Game({game}){
    return(
        <div className="Cards">
            <Link className="Card" to={`/detail/${game.id}`}>
                <img src={game.image} className="img" alt="img" />   
                <h2>{game.name}</h2>
                <h4>Genres: {game.genres} </h4>
                <h4>Rating: {game.rating}</h4>
            </Link>
            
            </div>
            )
}