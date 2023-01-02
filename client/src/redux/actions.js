import axios from "axios";
export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_VIDEOGAME_NAME = "GET_VIDEOGAME_NAME";
export const GET_VIDEOGAME_DETAILS = "GET_VIDEOGAME_DETAILS";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_GENRES = 'GET_GENRES';
export const FILTER_GAMES_BY_GENRES = "FILTER_GAMES_BY_GENRES";
export const FILTER_DBGAMES_BY_GENRE = "FILTER_DBGAMES_BY_GENRE";
export const FILTER_APIBD = "FILTER_APIBD";
export const ORDER_BY_ASC_DES = "ORDER_BY_ASC_DES";
export const ORDER_BY_RAITING = "ORDER_BY_RAITING";



export const getVideogames = ()=>{
    return async(dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/videogames")
            return dispatch({
                type: "GET_ALL_GAMES",
                payload: response.data
            })

        } catch (error) {
            console.log(error.message)
        } 
    }
}

export const getVideogameName = (name) => {
    return async(dispatch)=> {
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            if (!json) throw Error
            return dispatch ({
                type: "GET_VIDEOGAME_NAME",
                payload: json.data  //es lo q devuelve la ruta una vez q le asigno algo por name
            })
        } catch (error) {
            dispatch({ type: "GET_VIDEOGAME_NAME",
            payload: "404"
        })
        }

    }
}


export const getVideogameDetails = (id) =>{
    return async(dispatch)=>{
        try {
            var json = await axios.get(`http://localhost:3001/videogames/${id}`)
            if(!json) return Error
            return dispatch({
                type: "GET_VIDEOGAME_DETAILS",
                payload: json.data
            })
        } catch (error) {
            dispatch({ type: "GET_VIDEOGAME_DETAILS",
            payload: "404"
        })
        }
    }
}
// // con promesas
// export const getVideoDetailP = (id) => {
//     return function (dispatch) {
//         try {
//             return axios.get(`http://localhost:3001/videogames/${id}`)
//                 .then(res => {
//                     dispatch({
//                         type: GET_DETAIL_VIDEO_GAME,
//                         payload: res.data
//                     })
//                 })
//         } catch (error) {
//             console.log(error)
//         }

//     }
// }

// POST // 

export const createVideogame = (payload)=>{
    return async(dispatch)=>{
        try {
            var json = await axios.post(`http://localhost:3001/videogames`, payload);
            return json
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const cleanState = () =>{
    return async(dispatch) => {
        return dispatch({
            type: "CLEAN_DETAIL",
            payload: {}
        })

    }
}

//GENRES

export const getGenres = ()=>{
    return async(dispatch)=>{
        try {
            var json = await axios.get(`http://localhost:3001/genres`)
            return dispatch({
                type:"GET_GENRES",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// FILTERS
export const filterApiBd = (payload) => {

    return {
        type: "FILTER_APIBD",
        payload
    }

}

export const filterGamesByGenres = (payload) => {

    return {
        type: "FILTER_GAMES_BY_GENRES",
        payload
    }

}



export const orderAscDes = (payload) => {

    return {
        type: "ORDER_BY_ASC_DES",
        payload
    }

}

export const orderByRaiting = (payload) => {

    return {
        type: "ORDER_BY_RAITING",
        payload
    }

}


