import React from 'react';
import { getVideogameName} from '../redux/actions';
import { useDispatch} from 'react-redux';



export default function SearchBar({paginated}){

    const dispatch = useDispatch();

    function inputVideogameHandler(event){
        event.preventDefault();
        dispatch(getVideogameName(event.target.value));
        paginated(1);
    }

    return(
        <div className="search">
            <input className="searchTerm" type="text"  onChange={inputVideogameHandler} placeholder="Search Videogame" />
        </div>
    )

}