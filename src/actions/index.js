import {
    LOADED_MOVIES,
    LOADED_GENRES,
    LOADED_MOVIES_SORT,
    LOADED_CREDITS,
    LOADED_SEARCH_MOVIES
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
export function getSearchMovie (title,pageId = 1){
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