import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetails, cleanState } from "../redux/actions";
import { useParams, useHistory } from "react-router-dom";
import loading from "../Imagen/loading-gif.gif"
import "./Detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideogameDetails(id));
    return function clean() {
      dispatch(cleanState());
    };
  }, [dispatch, id]);

  const detail = useSelector((state) => state.detail);

  function handlerBack(event) {
    event.preventDefault();
    history.goBack();
  }
  console.log(detail);

  if (!detail) {
    return (
      <div className="body">
        <div className="loading">
          <img src={loading} alt="img" height="150px" width="150px" />
          <br />
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="Caja">
        <div className="titulos">
          <h1> {detail.name} - Detail</h1>
        </div>

        <img className="imagen" src={detail.image} alt="imagen" />
        <div>
          <p>Genres: {detail.genres?.join(" - ")}</p>

          <p>Released: {detail.released} </p>

          <p>Rating: {detail.rating}</p>

          <p>PLATFORMS: {detail.platform?.map((p) => p).join(" - ")}</p>
        </div>

        <br />

        <div className="description">{detail.description}</div>

        <button className="btn" onClick={handlerBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}
