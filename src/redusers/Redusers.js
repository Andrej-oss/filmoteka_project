import {
    LOADED_MOVIES,
    LOADED_GENRES,
    LOADED_MOVIES_SORT,
    LOADED_CREDITS,
    LOADED_SEARCH_MOVIES
} from "../actions-type";

const defaultMovies = {
    movies: [],
    genres: [],
    credits: [],
    lastPage:0
};

export const moviesReducer = (store = defaultMovies, action) => {
         switch (action.type) {
             case LOADED_MOVIES:{
                 const { genres } = store;
                 const { results, total_pages } = action.payload;
                 return{
                     movies: results,
                     genres: [...genres],
                     lastPage: total_pages
                 }
             }
             case LOADED_GENRES:{
                 const { movies, lastPages } = store;
                 return {
                     movies:[...movies],
                     genres: action.payload,
                     lastPage: lastPages
                 }
             }
             case LOADED_MOVIES_SORT:{
                 const { genres } = store;
                 const [ sort, data ] = action.payload
                  const copyMovies = data.results;
                // const sort = copyMovies.splice(0,1);
                 return {
                     movies: copyMovies,
                     genres: [...genres],
                     sortOption: sort,
                     lastPage: data.total_pages
                 }
             }
             case LOADED_CREDITS:{
                 const { genres, movies, sortOption } = store;
                 return {
                     movies: [...movies],
                     genres: [...genres],
                     sortOption: sortOption && [...sortOption],
                     credits: action.payload
                 }
             }
             case LOADED_SEARCH_MOVIES:{
                 const { genres } = store;
                 const [ title,  data ] = action.payload;
                 return {
                     genres: [...genres],
                     movies: data.results,
                     lastPage:data.total_pages,
                     searchOption: title
                 }
             }
             default: return  store
         }
};
