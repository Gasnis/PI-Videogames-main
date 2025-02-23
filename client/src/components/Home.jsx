import "./Home.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenres,
  filterApiBd,
  filterGamesByGenres,
  order,
} from "../redux/actions";
import Card from "./Card";
import Paginated from "./Paginated";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import loading from "../Imagen/loading-gif.gif"

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames); //all videogames viene de los estados del reducer
  const filterGenresVideoGames = useSelector((state) => state.genres);

  // DEFINIR ESTADOS LOCALES

  const [orden, setOrder] = useState("");
  // console.log(orden);
  // hola

  const [currentPages, setCurrentPage] = useState(1);

  const videogamesPerPage = 15;

  const indexOfLastVideogame = currentPages * videogamesPerPage;

  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  //paginado
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  // USE EFFECTS

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  // funciones

  function handleClickRefrehes(event) {
    event.preventDefault();
    dispatch(getVideogames());
    dispatch(filterGamesByGenres("All"));
    setCurrentPage(1);
  }

  function handleGamesByGenres(event) {
    dispatch(filterGamesByGenres(event.target.value));
    setCurrentPage(1);
  }

  function handlefilterApiBd(event) {
    dispatch(filterApiBd(event.target.value));
    setCurrentPage(1);
  }

  function handleOrder(event) {
    if (event.target.value === "All") {
      dispatch(getVideogames());
    }

    event.preventDefault();
    dispatch(order(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`);
  }

  // MI HOME!!
 

  return (
    <div className="home">
      <div className="navbar">
        <Link to="/" className="navbarlink">
          <h1 className="title">VIDEOGAMES</h1>
        </Link>
        <SearchBar
        paginated={paginated}
        />
        <Link className="navbarlink" to="/newvideogames">
          <h2>Create Videogame</h2>
        </Link>
        <a target={"a"} href="https://buscaminas.eu/">
          <img
            src="http://25.media.tumblr.com/dbe486518f72879147e6b8b8f5ad9733/tumblr_mt5o1tji3x1sfmfe7o1_500.gif"
            alt=""
            height="80px"
            width="80px"
          />
        </a>
      </div>

      <div>
        <div className="filtros">
          <button
            className="btnhome"
            onClick={(e) => {
              handleClickRefrehes(e);
            }}
          >
            Refresh
          </button>

          <div>
            <h4>Genres</h4>
            {/* Aca Va el listado de los Generos */}
            <select
              className="select"
              onChange={(event) => handleGamesByGenres(event)}
            >
              <option name="All">All</option>
              {filterGenresVideoGames.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h4>API or CREATED</h4>

            <select
              className="select"
              onChange={(event) => handlefilterApiBd(event)}
            >
              <option value="All">All</option>
              <option value="API">Api</option>
              <option value="Created">BD</option>
            </select>
          </div>

          <div>
            <h4>SORT</h4>

            <select className="select" onChange={(event) => handleOrder(event)}>
              <option value="All">All</option>
              <option value="ascendente">A - Z</option>
              <option value="descendente">Z - A</option>
              <option value="raitingmenor">Mayor a Menor</option>
              <option value="raitingmayor">Menor a Mayor</option>
            </select>
          </div>
        </div>
        
        <br />
        {
  !currentVideogames.length && (
    <section className="loading">
      <figure>
        <img 
          src={loading} 
          alt="Loading animation" 
          width="150" 
          height="150" 
        />
      </figure>
      <h1>Loading...</h1>
    </section>
  )
}

        <div className="cajaCards">
          {currentVideogames === "404" ? (
            <h1>Not Found Videogames whith this name.</h1>
          ) : (
            currentVideogames?.map((game) => {
              return <Card key={game.id} game={game} />;
            })
          )}
        </div>
        <Paginated
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginated={paginated}
          currentPages={currentPages}
        />
      </div>
    </div>
  );
}
