import React from 'react';
import MovieListCard from "./components/movie-list-card/MovieListCard";
import { BrowserRouter as Router,
    Switch,
    Route,
    Link} from "react-router-dom";
import {getGenres, getMovies, getCredits} from "./actions";
import {connect, Provider} from "react-redux";
import Header from "./components/header/Header";
import MoviesList from "./components/movies-list/MoviesList";
import {moviesStore} from "./store/Store";
import { DarkContextWrapper } from "./context/DarkContextWrapper";


function App(props){
     const { movies,genres,credits, getCredits } = props;
return (
    <DarkContextWrapper>
    <Provider store={moviesStore}>
    <Router>
        <Header/>
        <Switch>
            <Route path="/:sortOption/:pageId/:id"
                render={(routerProps) => {
                    return (<MovieListCard {...routerProps} movies={movies} genres={genres} credits={credits} getCredits={getCredits} exact>
                    </MovieListCard>);
            }}>
            </Route>
            <Route path='/' exact
                   render = {(routerProps) =>  <MoviesList  {...routerProps} exact></MoviesList>
                   }>
            </Route>
            <Route path='/:sortOption/:pageId'
                   render = {(routerProps) =>  <MoviesList  {...routerProps} exact></MoviesList>
             }>
            </Route>
        </Switch>
    </Router>
    </Provider>
    </DarkContextWrapper>
);
}
const mapStateToProps = (state) => {
    const { movies, genres, credits} = state;
    return {
        movies,
        genres,
        credits
    }
};
const mapDispatchToProps =  ({
    getGenres,
    getMovies,
    getCredits
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
