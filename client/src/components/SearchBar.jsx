import React ,{ useState } from 'react';
import { getVideogameName} from '../redux/actions';
import { useDispatch} from 'react-redux';



export default function SearchBar(){

    const dispatch = useDispatch();

    function inputVideogameHandler(event){
        event.preventDefault();
        dispatch(getVideogameName(event.target.value));
    }

    return(
        <div className="search">
            <input className="searchTerm" type="text"  onChange={inputVideogameHandler} placeholder="Search Videogame" />
        </div>
    )

}