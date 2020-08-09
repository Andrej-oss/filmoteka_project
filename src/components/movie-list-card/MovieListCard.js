import React,{ PureComponent } from 'react';
import StarRating from "../star-rating/StarRating";
import ActorCard from "../actor-card/ActorCard";
import {MovieComments} from "../movie-comments/MovieComments";
import { DarkThemeContext } from "../../context";
import { connect } from "react-redux";
import YouTube from "react-youtube";

import '../movie-list-card/MovieListCard.scss'
import {Link} from "react-router-dom";
import {
    getComments,
    getCredits,
    getDetailsMovie,
    getGenres,
    getMovies,
    getSearchMovie,
    getSortedMovies, getTrailer
} from "../../actions";


class MovieListCard extends PureComponent{
    constructor(props) {
        super(props);
    }
    state = {
        show: false
    };
    onShowComments = () => {
        debugger
        this.setState({
            show: !this.state.show
        })
    };
    onGetActor = (id) => {
        const { getActor,getActorBiography } = this.props;
        return () => {
             getActorBiography && getActorBiography(id) && getActor && getActor(id);
        }
   };
    componentDidMount() {
        debugger
        const { trailers, getTrailer,match:{params}, getCredits,getDetailsMovie,getComments,detailsMovie } = this.props
    if (!detailsMovie.id && params.id){
        getCredits && getCredits(params.id) && getDetailsMovie(params.id) && getComments(params.id) && getTrailer(params.id)

    }
    else if (!params.sortOption){
        getCredits && getCredits(params.pageId) && getDetailsMovie(params.pageId) && getComments(params.pageId) && getTrailer(params.pageId)
    }
        trailers && !trailers.length && getTrailer()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { getTrailer,match:{params}, getCredits,getDetailsMovie,getComments,detailsMovie } = this.props;
        if (params.pageId !== prevProps.match.params.pageId){
            getCredits && getCredits(params.pageId) && getDetailsMovie(params.pageId) && getComments(params.pageId) && getTrailer(params.pageId)
        }

        debugger
  }

    render(){
    const { genres: genresFuck,match:{params}, detailsMovie, credits, comments, trailers } = this.props;
    const { show } = this.state;
    debugger

    const {poster_path,
        popularity,
        title,
        release_date,
        genres,
        overview,
        vote_average,
        original_language,
        backdrop_path,
        adult,
        budget,
        video,
        id,
        vote_count,
    } = detailsMovie;
    const imgUrl = `https://image.tmdb.org/t/p/w300${poster_path}`;
    const backImg = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
    let data = [];
    release_date ?data = release_date.split('-'): data = [0];

    const year = data[0];
    return (
        <DarkThemeContext.Consumer>
            {
                (value) => <div className={`movie-list ${value.isDarkTheme && 'dark'}`}>
                    <div className='movie-list-movie' style={{backgroundImage: `url(${backImg})`}}>
                        <div className='movie-list-poster'>
                            <img src={imgUrl} style={{borderRadius: '10px', margin: '150px'}}/>
                        </div>
                        <div className='movie-list-movie-content'>
                            <h2>{title}({year})</h2>
                            <div className='movie-list-movie-content-stars'>
                                <StarRating vote_average={vote_average} vote_count={vote_count}/>
                            </div>
                            <div className='movie-list-movie-content-block'>
                                <div>Popularity: {popularity}</div>
                                <a key={id}>{release_date} Original language:
                                    { original_language} {genres && genres.map(genre => {
                                        return <li>{genre.name}</li>})}
                                </a>
                                <div>Budget: {budget}</div>
                                {adult ? <div>For adult: yes</div> : <div>For adult: no</div>}
                                <div className='movie-list-movie-content-block-overview'>
                                    Overview: {overview}
                                </div>
                                {!video && <div className='movie-list-movie-content-block-video'>
                                    Video: none
                                </div>}
                            </div>
                        </div>
                        {trailers && trailers.length && <YouTube  videoId={trailers[0].key} />}
                    </div>
                    <div className='movie-list-movie-actor'>
                        <div className='movie-list-movie-actor-content'>
                            {
                                credits && credits.map(actor =>
                                    <Link to={`/${params.sortOption}/${params.pageId}/${params.id}/actors/${actor.id}`}
                                          onClick={this.onGetActor(actor.id)}  style={{textDecoration: 'none'}}>
                                        <ActorCard key={actor.id} actor={actor}/></Link>)
                            }
                        </div>
                        {!show && <h1 onClick={this.onShowComments}>Show Comments</h1>}
                        {show && <h1 onClick={this.onShowComments}>Hide Comments</h1>}
                       {show && <div>
                        {
                            comments && comments.map(comment => <MovieComments key={comment.id} comment={comment} />)
                        }
                           {
                               !comments && <div>No Comments Yet!!!</div>
                           }
                        </div>}
                    </div>
                </div>
            }
        </DarkThemeContext.Consumer>
    );
    }
}

export default MovieListCard;
