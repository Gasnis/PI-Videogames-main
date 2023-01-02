import "./Home.css"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames , getGenres , filterApiBd, filterGamesByGenres, orderAscDes , orderByRaiting} from "../redux/actions";
import Card from "./Card"
import Paginated from "./Paginated"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import relojDeArena from "../Imagen/Loading.gif" 



export default function Home(){

    const dispatch = useDispatch()
    const allVideogames = useSelector(state => state.videogames)//all videogames viene de los estados del reducer
    const filterGenresVideoGames = useSelector((state) => state.genres)


// DEFINIR ESTADOS LOCALES

const [order , setOrder] = useState('')
console.log(order)


const [currentPages, setCurrentPage] = useState(1)


const videogamesPerPage = 15;

const indexOfLastVideogame = currentPages * videogamesPerPage

const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage

const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

//paginado
const paginated = (pageNumber) => {
    setCurrentPage(pageNumber)
}

// USE EFFECTS

    useEffect(()=>{
       dispatch(getVideogames())
       dispatch(getGenres())
    },[dispatch])


// funciones

function handleClickRefrehes(event){
    event.preventDefault();
    dispatch(getVideogames())
    dispatch(filterGamesByGenres("All"));
    setCurrentPage(1);
}

function handleGamesByGenres(event) {

    dispatch(filterGamesByGenres(event.target.value))
    setCurrentPage(1);

}

function handlefilterApiBd(event) {

    dispatch(filterApiBd(event.target.value))
    setCurrentPage(1);

}

function handleorderAscDes(event) {
    if(event.target.value === "All"){
        dispatch(getVideogames());
    }

    event.preventDefault();
    dispatch(orderAscDes(event.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`)


}

function handleOrderByRaiting(event) {
    if(event.target.value === "All"){
        dispatch(getVideogames());
    }
    event.preventDefault();
    dispatch(orderByRaiting(event.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`)


}



// MI HOME!!
if(!currentVideogames.length){
    return(
        <div className="loading">
            <img src={relojDeArena} alt="img" />
            <br />
            <h1>Loading...</h1>
        </div>
    )
}
    
    return (
        <div className="home" >
            <div className="navbar">
            <h1 className="title">VIDEOGAMES</h1>
            <button className="btnhome" onClick={(e) => { handleClickRefrehes(e) }}>Refresh</button>
            <Link to='/newvideogames'>
                <button className="btnhome">Create</button>
            </Link>
            <SearchBar></SearchBar>
            </div>

            <div>
                <div className="filtros">
                    <div>
                        <h4>Genres</h4>
                        {/* Aca Va el listado de los Generos */}
                        <select className="select" onChange={event => handleGamesByGenres(event)}>
                            <option name="All" >All</option>
                            {
                                filterGenresVideoGames.map(genre => (
                                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                                ))
                            }
                        </select>

                    </div>

                    <div>

                        <h4>API or CREATED</h4>

                        {/* Aca Va el listado Creados por BD o por Nosotros */}
                        <select className="select" onChange={event => handlefilterApiBd(event)}>
                            <option value="All">All</option>
                            <option value="API">Api</option>
                            <option value="Created">BD</option>
                        </select>

                    </div>

                    <div>
                        <h4>Alphabetical</h4>
                     
                        <select className="select" onChange={event => handleorderAscDes(event)}>
                            <option value="All">All</option>
                            <option value='ascendente'>A - Z</option>
                            <option value='descendente'>Z - A</option>
                        </select>

                    </div>

                    <div>
                        <h4> Rating </h4>
                
                        <select className="select" onChange={event => handleOrderByRaiting(event)}>
                            <option value="All">All</option>
                            <option value='raitingmenor'>Mayor a Menor</option>
                            <option value='raitingmayor'>Menor a Mayor</option>
                        </select>

                    </div>


                </div>
                <br />

                <div className="cajaCards">

                {
                    currentVideogames === "404" ?
                    <h1>Video Juego No Encontrado</h1> :
                        currentVideogames?.map(game => {
                        return (
                            
                            <Card key={game.id} game={game}/>
                            
                            
                                )
                            })
                            
                        }
                </div>
                <Paginated
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paginated={paginated}
                    currentPages={currentPages}
                />
                    

            </div>
        </div >
    )
}


