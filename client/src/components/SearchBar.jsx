import React from 'react';
import { getVideogameName , getVideogames} from '../redux/actions';
import { useDispatch } from 'react-redux';



export default function SearchBar(){

    const dispatch = useDispatch();





    function inputVideogameHandler(event){
        if(!event.target.value){
            dispatch(getVideogames());

        }

        event.preventDefault()
        dispatch(getVideogameName(event.target.value));
    }

    return(
        <div className="cajaBuscarVideoJuego">
            <input type="text"  onChange={inputVideogameHandler} placeholder="Search Videogame" />
        </div>
    )

}