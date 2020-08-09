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

const defaultMovies = {
    movies: [],
    genres: [],
    credits: [],
    lastPage:0,
    currentPages:[],
    searchOption: '',
    detailsMovie: {},
    moviesActor: [],
    actor: {}
};

export const moviesReducer = (store = defaultMovies, action) => {
         switch (action.type) {
             case LOADED_MOVIES:{
                 const { genres,currentPages } = store;
                 const { results, total_pages } = action.payload;
                 return{
                     movies: results,
                     genres: [...genres],
                     lastPage: total_pages,
                     currentPages:[...currentPages]
                 }
             }
             case LOADED_GENRES:{
                 const { movies, lastPage,searchOption,currentPages, sortOption } = store;
                 debugger
                 return {
                     movies:[...movies],
                     genres: action.payload,
                     lastPage: lastPage,
                     searchOption: searchOption,
                     sortOption: sortOption,
                     currentPages: [...currentPages]
                 }
             }
             case LOADED_MOVIES_SORT:{
                 const { genres,currentPages } = store;
                 const [ sort, data ] = action.payload;
                  const copyMovies = data.results;
                // const sort = copyMovies.splice(0,1);
                 return {
                     movies: copyMovies,
                     genres: [...genres],
                     sortOption: sort,
                     lastPage: data.total_pages,
                     currentPages:[...currentPages]
                 }
             }
             case LOADED_CREDITS:{
                 const { genres, movies, sortOption,searchOption,lastPage,currentPages, detailsMovie, trailers  } = store;
                 return {
                     movies: [...movies],
                     genres: [...genres],
                     sortOption: sortOption,
                     credits: action.payload,
                     lastPage: lastPage,
                     searchOption: searchOption,
                     currentPages:[...currentPages],
                     detailsMovie:  detailsMovie,
                     trailers: trailers
                 }
             }
             case LOADED_SEARCH_MOVIES:{
                 const { genres,currentPages } = store;
                 const [ title,  data ] = action.payload;
                 return {
                     genres: [...genres],
                     movies: data.results,
                     lastPage:data.total_pages,
                     searchOption: title,
                     currentPages: [...currentPages]
                 }
             }
             case CURRENT_PAGES:{
                 const { genres, movies, sortOption,searchOption,lastPage } = store;
                 return {
                     currentPages: action.payload,
                     genres: [...genres],
                     movies: movies,
                     sortOption: sortOption,
                     searchOption: searchOption,
                     lastPage: lastPage
                 }
             }
             case DETAILS_MOVIE:{
                 const { genres, movies, sortOption,searchOption,lastPage,currentPages,credits,trailers  } = store;
                 return {
                     movies: [...movies],
                     genres: [...genres],
                     sortOption: sortOption,
                     credits: credits,
                     lastPage: lastPage,
                     searchOption: searchOption,
                     currentPages:[...currentPages],
                     trailers: trailers,
                     detailsMovie: action.payload
                 }
             }
             case LOADED_COMMENTS:{
                 const { genres, movies, sortOption,searchOption,lastPage,currentPages,credits,detailsMovie,trailers } = store;
                 return {
                     movies: [...movies],
                     genres: [...genres],
                     sortOption: sortOption,
                     credits: credits,
                     lastPage: lastPage,
                     searchOption: searchOption,
                     currentPages:[...currentPages],
                     detailsMovie: detailsMovie,
                     trailers: trailers,
                     comments: action.payload
                 }
             }
             case LOADED_TRAILER:{
                 const { genres, movies, sortOption,searchOption,lastPage,currentPages,credits,detailsMovie,comments } = store;
                 return {
                     movies: [...movies],
                     genres: [...genres],
                     sortOption: sortOption,
                     credits: credits,
                     lastPage: lastPage,
                     searchOption: searchOption,
                     currentPages:[...currentPages],
                     detailsMovie: detailsMovie,
                     comments: comments,
                     trailers: action.payload
                 }
             }
             case LOADED_ACTOR_DETAILS:{
                 const { genres, movies, sortOption,searchOption,lastPage,
                     currentPages,credits,detailsMovie,comments,trailers,actor } = store;
                 return {
                     movies: [...movies],
                     genres: [...genres],
                     sortOption: sortOption,
                     credits: credits,
                     lastPage: lastPage,
                     searchOption: searchOption,
                     currentPages:[...currentPages],
                     detailsMovie: detailsMovie,
                     comments: comments,
                     trailers: trailers,
                     actor: actor,
                     moviesActor:action.payload
                 }
             }
             case LOADED_ACTOR: {
                 const { genres,
                     movies,
                     sortOption,
                     searchOption,
                     lastPage,
                     currentPages,credits,detailsMovie,comments,trailers,moviesActor } = store;
                 return {
                     movies: [...movies],
                     genres: [...genres],
                     sortOption: sortOption,
                     credits: credits,
                     lastPage: lastPage,
                     searchOption: searchOption,
                     currentPages:[...currentPages],
                     detailsMovie: detailsMovie,
                     comments: comments,
                     trailers: trailers,
                     moviesActor:moviesActor,
                     actor: action.payload
                 }

             }
             default: return  store
         }
};
