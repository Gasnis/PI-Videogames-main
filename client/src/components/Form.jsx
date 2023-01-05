import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { createVideogame, getGenres } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import './Form.css';



export default function Home() {

    const dispatch = useDispatch();
    const history = useHistory()
    const filterGenresVideoGames = useSelector((state) => state.genres)
    // ---- UseEfect ---- //

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

    // ------Estados Locales------//
    const [form, setForm] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platform: [],
        createdByDB: true,
    })
    // const [genres, setGenres] = useState([])
    const [error, setError] = useState("")



    // ------ Manejadores de Estados ------//
    const nameChangeHandler = (event) => {
        const nameValue = event.target.value
        let letras = /^[ a-zA-ZÀ-ÿ 0-9.]+$/;

        if (!letras.test(nameValue)) {
            setError(["Dont use special characters in name."])
        } else if (!form.name) {
            setError(...error, "You have to give a name.")
        } else {
            setError("")
        }
        setForm({ ...form, name: nameValue });

    }

    const descriptionChangeHandler = (event) => {

        const descriptionValue = event.target.value;

        setForm({ ...form, description: descriptionValue });
    }

    const releasedChangeHandler = (event) => {
        const releasedValue = event.target.value;

        setForm({ ...form, released: releasedValue });
    }

    const ratingChangeHandler = (event) => {
        const raitingValue = event.target.value;
        if (!(raitingValue >= 0 && raitingValue <= 5)) {
            setError([...error, "Must be a value between 0 and 5."])
        } else {
            setError("")
        }
        setForm({ ...form, rating: raitingValue });
    }

    const genresChangeHandler = (event) => {
        if (!form.genres.includes(event.target.value)) {
            setForm({
                ...form,
                genres: [...form.genres, event.target.value]
            });
        }
    }

    const platformsChangeHandler = (event) => {
        if (!form.platform.includes(event.target.value)) {
            setForm({
                ...form,
                platform: [...form.platform, event.target.value]
            });
        }

    }


    const backHandler = (event) => {
        event.preventDefault();
        history.goBack()

    }

    const deletePlaformsHandler = (event) => {
        event.preventDefault();
        form.platform.map(ele => console.log(ele))
        setForm({
            ...form,
            platform: form.platform.filter(elemet => event.target.id !== elemet)
        });
    }

    const deleteGenresHandler = (event) => {
        event.preventDefault();
        form.genres.map(ele => console.log(ele))
        setForm({
            ...form,
            genres: form.genres.filter(elemet => event.target.id !== elemet)
        });
    }

    const submitHandle = (event) => {

        event.preventDefault();
        console.log(form)
        dispatch(createVideogame(form))
        alert("Videogame has been submitted successfully")
        history.push("/home")

    }




    // ------ Renderizado ------//
    return (


        <form onSubmit={submitHandle}>

            <div className="cajaFormulaio">
                <div className="Titulo">

                    <h1> CREATE VIDEOGAME </h1>

                </div>

                <div className="inputs">

                    <div >
                        <label>Name: </label>
                        <input type="text" onChange={nameChangeHandler} value={form.name}></input>
                    </div>

                    <div>
                        <label>Description:</label>
                        <textarea type="text" onChange={descriptionChangeHandler} value={form.description}></textarea>
                    </div>

                    <div >
                        <label>Released:</label>
                        <input type="date" id="textoFechaLanzamiento" onChange={releasedChangeHandler} value={form.released}></input>
                    </div>

                    <div>
                        <label>Rating:</label>
                        <input type="number" onChange={ratingChangeHandler} value={form.rating}></input>
                    </div>

                    <div>
                        <label>Genres</label>
                        <select name="" id="" onChange={genresChangeHandler} value={form.genres} >
                            <option value="Vacio">Seleccionar</option>
                            {
                                filterGenresVideoGames.map(genre => (
                                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                                ))
                            }
                        </select>
                        <div className="plaformasDiv">
                            <div>
                                {
                                    form.genres.map(elemet => <button className="btn" onClick={deleteGenresHandler} id={elemet}>{elemet}</button>)
                                }
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Platforms</label>
                        <select name="" id="" onChange={platformsChangeHandler} value={form.platform}>
                            <option value="Vacio">Seleccionar</option>
                            <option value="PC">PC</option>
                            <option value="Nintendo">Nintendo</option>
                            <option value="Nintendo switch">Nintendo switch</option>
                            <option value="Xbox 360">Xbox 360</option>
                            <option value="Play Station">Play Station</option>
                            <option value="Play Station 2">Play Station 2</option>
                            <option value="Play Station 3">Play Station 3</option>
                            <option value="Play Station 4">Play Station 4</option>
                            <option value="Xbox One">Xbox One</option>
                            <option value="Xbox Series">Xbox Series</option>
                        </select>
                        <div className="plaformasDiv">
                            <div>
                                {
                                    form.platform.map(elemet => <button className="btn" onClick={deletePlaformsHandler} id={elemet}>{elemet}</button>)
                                }

                            </div>

                        </div>
                    </div>

                    <div className="cajaErrores">
                        {error && <p>{error}</p>}
                    </div>


                </div>

                <nav className="cajaBarraBotones">

                    <button onClick={backHandler}>Atras</button>

                    <button type="submit" className="botonCrearVideoGame" disabled={(!form.name || !form.description || !form.released || !form.rating || !form.platform.length || error) ? true : false}>CREAR</button>

                </nav>

            </div>

        </form >
    )
}
