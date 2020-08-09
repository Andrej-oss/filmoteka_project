import React, { Component} from 'react';
import { connect } from 'react-redux';
import   PostPreview  from "../poster-prewiev/PostPreview";
import { getMovies,
    getGenres,
    getCredits,
    getSortedMovies,
    getSearchMovie,
    getDetailsMovie,
    getComments,
    getTrailer} from "../../actions";
import MoviesSort from "../movies-sort/MoviesSort";
import { DarkThemeContext } from "../../context";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";


import "../movies-list/MoviesList.scss"
import { sortingOption } from "../../constants/Constants";
import Paginations from "../pagination/Pagination";

class MoviesList extends Component {
    state = {
        isLoading: false,
        moviesLoaded:false
    };

    onSelectMovie = (idMovie) => {
        const { getCredits,getDetailsMovie,getComments,getTrailer } = this.props;
        return () => {
        getCredits && getCredits(idMovie) && getDetailsMovie(idMovie) && getComments(idMovie) && getTrailer(idMovie);
     }
    };

    componentDidMount() {
        debugger
     const { getMovies, getGenres, lastPage, getSearchMovie, searchOption,match:{params}, getSortedMovies } = this.props;
        if (!params.sortOption || (params.sortOption == "undefined")){
            getMovies && getMovies(parseInt(params.pageId))  && this.setState({
                isLoading: true,
                moviesLoaded: false,
            });
        }
        else if (params.sortOption) {
            let findSorting = sortingOption.find(item => params.sortOption == item.selectOption);
            findSorting ? getSortedMovies(params.sortOption, params.pageId) : getSearchMovie(params.sortOption, params.pageId)
                && this.setState({
                    isLoading: true,
                    moviesLoaded: false,
                })
        }
        else if (!lastPage){
            getMovies && getMovies()  && this.setState({
                isLoading: true,
                moviesLoaded: false,
            });
        }
     getGenres && getGenres();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps);
        console.log(this.props);
        debugger
        const { match:{params}, getSearchMovie, searchOption, sortOption, getSortedMovies, getMovies, lastPage } = this.props;
        /*if ((prevProps.match.params.pageId != params.pageId) && searchOption && !sortOption && (params.sortOption === searchOption)){
             getSearchMovie && getSearchMovie( searchOption,parseInt(params.pageId))
        }
        else if (((prevProps.match.params.pageId != params.pageId)&& sortOption && !searchOption && (params.sortOption === sortOption))){
             getSortedMovies && getSortedMovies(sortOption, parseInt(params.pageId))
        }*/
        if((prevProps.match.params.pageId != params.pageId)&&(params.sortOption == "undefined")||(!params.pageId && prevProps.match.params.pageId)){
            getMovies && getMovies(parseInt(params.pageId))
        }
        else if(sortOption && (params.sortOption != sortOption) && (params.sortOption == prevProps.sortOption)){
            getSortedMovies && getSortedMovies(params.sortOption, params.pageId) ;
        }
       // else if(searchOption && params.sortOption && searchOption != params.sortOption ){
        //    getSortedMovies && getSortedMovies(params.sortOption, params.pageId);
      //  }
        else if(params.sortOption && (prevProps.match.params.sortOption != params.sortOption) || (prevProps.match.params.pageId != params.pageId)){
            let findSorting = sortingOption.find(item => params.sortOption == item.selectOption);
            findSorting ? getSortedMovies(params.sortOption, params.pageId) : getSearchMovie(params.sortOption, params.pageId)
        }

    }


    render() {
        debugger
     const {  isLoading, moviesLoaded } = this.state;
     const { movies,genres, match:{params},sortOption, searchOption } = this.props;
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
                                            {
                                                searchOption ?
                                                    <Link to={`/${searchOption}/${params.pageId}/${movie.id}`}
                                                          style={{textDecoration: 'none'}}>
                                                        <PostPreview movie={movie} genres={genres} />
                                                    </Link> :

                                                    <Link to={`/${sortOption}/${params.pageId}/${movie.id}`}
                                                          style={{textDecoration: 'none'}}>
                                                        <PostPreview movie={movie} genres={genres}/>
                                                    </Link>
                                            }
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
   const { movies, genres,sortOption,lastPage,searchOption } = store;
   return {
       movies,
       genres,
       sortOption,
       lastPage,
       searchOption
   }
};

const mapDispatchToProps = ({
    getMovies:(pageId) => getMovies(pageId),
    getGenres,
    getCredits,
    getSortedMovies:(sortOption, pageId)=>getSortedMovies(sortOption, pageId),
    getSearchMovie:(searchOption, pageId)=>getSearchMovie(searchOption, pageId),
    getDetailsMovie:(movieId) =>getDetailsMovie(movieId),
    getComments: (id) => getComments(id),
    getTrailer:(id)=>getTrailer(id)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList));
