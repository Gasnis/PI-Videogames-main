import { GET_ALL_GAMES, GET_VIDEOGAME_NAME, GET_GENRES, GET_VIDEOGAME_DETAILS, FILTER_APIBD, FILTER_GAMES_BY_GENRES, ORDER ,CLEAN_DETAIL } from "./actions"

const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    detail: null,
}

function rootReducer(state= initialState, action){ // en esta accion mando todos los videogames al arrglo vacio
    switch (action.type) {
        case GET_ALL_GAMES:
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload //esto es para q los filtros siempre empiecen sobre todos y no obre el filtro aplicado
            }
            
        case GET_VIDEOGAME_NAME: //searchbar
        return {
            ...state,
            videogames: action.payload,
            allVideogames: action.payload

        }

        case GET_VIDEOGAME_DETAILS:
            return {
                ...state,
                detail: action.payload
            }


        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
                
            }
        
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: state.payload
            }

        // FILTERS
                
        case FILTER_APIBD:
            let filterCreated = state.allVideogames
            if(action.payload === 'Created'){
                filterCreated = filterCreated.filter(game =>game.createdByDB === true)
            }
            if(action.payload === "API"){
                filterCreated = filterCreated.filter( el => !el.createdByDB)
            }
            return {
                ...state, //me devuelve el estado anterior
                videogames: filterCreated  
            }


        case FILTER_GAMES_BY_GENRES:
            let gamesGenresFilter = state.allVideogames;

            if (action.payload !== "All") {

                gamesGenresFilter = gamesGenresFilter.filter((game) =>
                    game.genres.includes(action.payload)
                )

            }
            return {
                ...state,
                videogames: gamesGenresFilter,
            };
        
        // case FILTER_DBGAMES_BY_GENRE:
        //     const allGenresGames = state.allGenres;
        //     // console.log(allGenresGames.filter(element => element.name))
        //     const genresFilter = action.payload === 'all' ? allGenresGames : allGenresGames.filter(element => element.name === action.payload)
        //     return {
        //         ...state,
        //         genres: genresFilter,
        //     }

        case ORDER:

            let order = state.videogames
            if(action.payload === 'ascendente'){
                order = order.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0
                })
            }
            if(action.payload === "descendente"){
                order = order.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0
                })
            }
            if(action.payload === 'raitingmayor'){
                order = order.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0
                })
            }
            if(action.payload === "raitingmenor"){
                order = order.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0
                })
            }

            return {
                ...state,
                videogames: order
            }
        
            default:    
                return state;

            }
        };   

        
         
        

    



export default rootReducer;
