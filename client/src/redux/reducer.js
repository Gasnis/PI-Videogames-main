import { GET_ALL_GAMES, GET_VIDEOGAME_NAME, GET_GENRES, GET_VIDEOGAME_DETAILS, FILTER_APIBD, FILTER_GAMES_BY_GENRES, ORDER_BY_ASC_DES,CLEAN_DETAIL, ORDER_BY_RAITING } from "./actions"

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

        case ORDER_BY_ASC_DES:

            let obrderByAscDesc = state.videogames
            action.payload === 'ascendente' ?
                obrderByAscDesc.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0
                }) :
                obrderByAscDesc.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0
                })
            return {

                ...state,
                videogames: obrderByAscDesc

            }

            case ORDER_BY_RAITING:

            let filterOrderByRaiting = state.videogames
                if(action.payload === 'raitingmayor'){
                    filterOrderByRaiting = filterOrderByRaiting.sort(function (a, b) {
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
                    filterOrderByRaiting = filterOrderByRaiting.sort(function (a, b) {
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
                videogames: filterOrderByRaiting

            }
        
            default:    
                return state;

            }
        };   

        
         
        

    



export default rootReducer;
