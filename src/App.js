import React from 'react';
import MovieListCard from "./components/movie-list-card/MovieListCard";
import { BrowserRouter as Router,
    Switch,
    Route,
    Link} from "react-router-dom";
import {getGenres, getMovies, getCredits, getTrailer,
    getActor, getActorBiography,getComments,getDetailsMovie} from "./actions";
import {connect, Provider} from "react-redux";
import Header from "./components/header/Header";
import MoviesList from "./components/movies-list/MoviesList";
import {moviesStore} from "./store/Store";
import { DarkContextWrapper } from "./context/DarkContextWrapper";
import ActorMovieLIst from "./components/actor-movie-list/ActorMovieLIst";

function App(props){
     const { movies,genresFuck,credits, getCredits, detailsMovie, sortOption, searchOption,getComments,getDetailsMovie,
         comments, trailers, getActor,getActorBiography,actor,moviesActor,genres,getMovies, getTrailer } = props;
return (
    <DarkContextWrapper>
    <Provider store={moviesStore}>
    <Router>
        <Header/>
        <Switch>
            {actor && moviesActor && <Route path='/:sortOption/:pageId/:id/actors/:id' render={(routerProps) => {
                return (<ActorMovieLIst {...routerProps}
                                actor={actor} getMovies={getMovies} searchOption={searchOption}
                                moviesActor={moviesActor} genres={genres} sortOption={sortOption}
                                        getActorBiography={getActorBiography} getActor={getActor}
                                        getTrailer={getTrailer} detailsMovie={detailsMovie} getComments={getComments} exact>
            </ActorMovieLIst>);
            }}>
            </Route>}
           {detailsMovie && <Route path="/:sortOption/:pageId/:id"
                render={(routerProps) => {
                    return (<MovieListCard {...routerProps} movies={movies} getDetailsMovie={getDetailsMovie}
                                           genres={genresFuck} credits={credits}
                                           getCredits={getCredits} getComments={getComments}
                                           detailsMovie={detailsMovie}
                                           comments={comments}
                                           trailers={trailers}
                                           getTrailer={getTrailer}
                                           getActor={getActor} getActorBiography={getActorBiography} exact>
                    </MovieListCard>);
            }}>
            </Route>}
            <Route path='/' exact
                   render = {(routerProps) =>  <MoviesList  {...routerProps} exact></MoviesList>
                   }>
            </Route>
            <Route path='/:sortOption/:pageId'
                   render = {(routerProps) =>  <MoviesList  {...routerProps} exact></MoviesList>
             }>
            </Route>
            <Route path='/:pageId'
                   render = {(routerProps) => {
                       return (detailsMovie && <MovieListCard {...routerProps} movies={movies} getDetailsMovie={getDetailsMovie}
                                              genres={genresFuck} credits={credits}
                                              getCredits={getCredits} getComments={getComments}
                                              detailsMovie={detailsMovie}
                                              comments={comments}
                                              trailers={trailers}
                                              getTrailer={getTrailer}
                                              getActor={getActor} getActorBiography={getActorBiography} exact>
                       </MovieListCard>);
                   }}>
            </Route>
        </Switch>
    </Router>
    </Provider>
    </DarkContextWrapper>
);
}
const mapStateToProps = (state) => {
    const { movies, genres, credits,  detailsMovie, comments, trailers, actor, moviesActor,sortOption,searchOption} = state;
    return {
        movies,
        genres,
        credits,
        detailsMovie,
        comments,
        trailers,
        actor,
        moviesActor,
        sortOption,
        searchOption
    }
};
const mapDispatchToProps =  ({
    getGenres,
    getMovies,
    getCredits,
    getTrailer,
    getActor,
    getActorBiography,
    getComments,
    getDetailsMovie
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
