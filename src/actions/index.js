import {
    LOADED_MOVIES,
    LOADED_GENRES,
    LOADED_MOVIES_SORT,
    LOADED_CREDITS,
    LOADED_SEARCH_MOVIES,
    CURRENT_PAGES,
    DETAILS_MOVIE,
    LOADED_COMMENTS,
    LOADED_TRAILER,
    LOADED_ACTOR_DETAILS,
    LOADED_ACTOR
} from "../actions-type";
import { accessToken} from "../constants/Constants";

export const getMovies = (id) => {
    id = id || 1;
    return (dispatch, getState) => {
        return fetch(` https://api.themoviedb.org/3/discover/movie?page=${id}&api_key=${accessToken}`)
            .then((response) => response.json() )
            .then((data => {
                debugger
                    dispatch({
                        type: LOADED_MOVIES,
                        payload: data
                    })
            })
            )}
};
export const getGenres = () => {
    return (dispatch, getState) => {
        return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${accessToken}`)
            .then((response) => response.json())
            .then((data => {
                debugger
                dispatch({
                    type:LOADED_GENRES,
                    payload: data.genres
                })
            }))
    }
};
export function getSortedMovies (sortOption,id) {
    id = id || 1;
   return (dispatch, getState) => {
       return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${accessToken}&language=en-US&sort_by=${sortOption}&include_adult=false&include_video=false&page=${id}`)
           .then((response) => response.json())
           .then((data => {
               debugger
               dispatch({
                   type: LOADED_MOVIES_SORT,
                   payload:[sortOption,data]
               })
           }))
   }
}
export function getCredits(id) {
    return (dispatch, getState) => {
        return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${accessToken}`)
            .then((response) => response.json())
            .then((data => {
                dispatch({
                    type: LOADED_CREDITS,
                    payload: data.cast
                })
            }))
    }

}
export function getSearchMovie (title ,pageId = 1){
    return (dispatch) =>{
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${accessToken}&language=en-US&query=${title}&page=${pageId}`)
            .then(response => response.json())
            .then((data =>{
                debugger
                dispatch({
                    type:LOADED_SEARCH_MOVIES,
                    payload:[title,data]
                })
            }))
    }
}
export function getDetailsMovie(movieId){
    return (dispatch, getState) => {
        return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${accessToken}&language=en-US`)
            .then(response => response.json())
            .then(data =>{
                 dispatch({
                    type: DETAILS_MOVIE,
                     payload: data
                })
            })
    }
}
export function getComments(id) {
    return (dispatch, getState) => {
        return fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${accessToken}&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: LOADED_COMMENTS,
                    payload: data.results
                })
            })
    }
}
export function getCurrentPages(pages) {
    return {
        type: CURRENT_PAGES,
        payload:pages
    }
}
export function getTrailer(id =1 ) {
    return (dispatch, getState) => {
        return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${accessToken}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: LOADED_TRAILER,
                    payload: data.results
                })
            })
    }
}
export function getActor(id) {
    return (dispatch, getState) => {
     return fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${accessToken}&language=en-US`)
         .then(response => response.json())
         .then(data => {
             dispatch({
                 type: LOADED_ACTOR_DETAILS,
                 payload: data.cast
             })
         })
    }
}
export function getActorBiography(id) {
    return (dispatch, getState) => {
        return fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${accessToken}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: LOADED_ACTOR,
                    payload: data
                })
            })
    }

}
