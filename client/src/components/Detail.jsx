import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getVideogameDetails, cleanState } from "../redux/actions"
import { useParams, useHistory } from "react-router-dom"
import "./Detail.css"

import { useEffect } from "react"


export default function Detail() {


    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()


    useEffect(() => {
        dispatch(getVideogameDetails(id));
        return function clean() {
            dispatch(cleanState())
        }
    }, [dispatch, id])



    const detail = useSelector((state) => state.detail)

    function handlerBack(event) {
        event.preventDefault()
        history.goBack()

    }
    console.log(detail);

    if (!detail) {
        return (
            <div className='body'>
            <div className="loading">
                <img src={"https://i.gifer.com/origin/d5/d5b88b45655b89b33ff6d1dc2df982ff_w200.gif"} alt="img" height="300px" width="300px" />
                <br />
                <h1>Loading...</h1>
            </div>

            </div>
        )

    }

    return (
        <div className='body'>

            <div className="Caja">

                <img className="imagen" src={detail.image} alt='imagen' />
                <div>

                    <p>Genres: {detail.genres?.map(g => g)}</p>


                    <p>Released: {detail.released} </p>


                    <p>Rating: {detail.rating}</p>


                    <p>PLATFORMS: {detail.platform?.map(p => p).join(" - ")}</p>


                </div>

                <br />

                <div className='titulos'>
                    <h1> {detail.name} - Details</h1>
                </div>

                <div className='description'>{detail.description}</div>

                <button className="btn" onClick={handlerBack} >Go Back</button>

            </div>


        </div>
    )
}