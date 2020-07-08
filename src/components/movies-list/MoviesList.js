import React, { PureComponent} from 'react';
import {connect} from 'react-redux';
import   PostPreview  from "../poster-prewiev/PostPreview";
import { getMovies,getGenres,getCredits,getSortedMovies } from "../../actions";
import MoviesSort from "../movies-sort/MoviesSort";
import { DarkThemeContext } from "../../context";
import { Link,Route  } from "react-router-dom";
import { withRouter } from "react-router-dom";


import "../movies-list/MoviesList.scss"
import Paginations from "../pagination/Pagination";

class MoviesList extends PureComponent {
    state = {

        isLoading: false,
        moviesLoaded:false
    };

    onSelectMovie = (idMovie) => {
        const { getCredits } = this.props;
        return () => {
        getCredits && getCredits(idMovie);
     }
    };

    componentDidMount() {
     const { getMovies, getGenres, lastPage } = this.props;
     !lastPage && getMovies && getMovies() && this.setState({
         isLoading: true,
         moviesLoaded: false,
     });
        getGenres && getGenres()
    }
    /*componentDidUpdate(prevProps, prevState, snapshot) {
        debugger
        const { match:{params}, getSortedMovies, sortOption } = this.props;
        if (this.props.match && (prevProps.match.params.id !== params.id)){
            getSortedMovies(sortOption, parseInt(params.id))
        }
    }*/


    render() {
        debugger
     const {  isLoading, moviesLoaded } = this.state;
     const { movies,genres, match:{params},sortOption } = this.props;
        return (
            <DarkThemeContext.Consumer>
                {
                    (data) => {
                        const {  isDarkTheme } = data;
                        debugger
                        return  <div className={`filmoteka-movies-list ${isDarkTheme && 'dark'}`}>
                            <div className="filmoteka-movies-list-movies-sort">
                                <MoviesSort/>
                            </div>
                            { !moviesLoaded && isLoading  && !movies.length &&
                            <div className="filmoteka-movies-list-loader">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div> }
                            {!!movies.length && <div className="filmoteka-movies-list-posts">
                                {
                                    movies.map(movie =>
                                        <div className='filmoteka-movies-list-posts-post'
                                             key={movie.id}
                                             onClick={this.onSelectMovie(movie.id)}>
                                            <Link to={`/${sortOption}/${params.pageId}/${movie.id}`}
                                                  style={{ textDecoration: 'none'}}>
                                                <PostPreview movie={movie} genres={genres}/>
                                            </Link>
                                        </div>)
                                }
                                <div className="d-block m-auto">
                                    <div className='d-flex justify-content-center'>
                                        <Paginations sortOption={sortOption}/>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    }
                }
            </DarkThemeContext.Consumer>
        );
    }
}
const mapStateToProps = (store) => {
   const { movies, genres,sortOption,lastPage } = store;
   return {
       movies,
       genres,
       sortOption,
       lastPage
   }
};

const mapDispatchToProps = ({
    getMovies,
    getGenres,
    getCredits,
    getSortedMovies:()=>getSortedMovies()
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList));
