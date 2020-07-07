import React,{ PureComponent } from 'react';
import StarRating from "../star-rating/StarRating";
import ActorCard from "../actor-card/ActorCard";
import { DarkThemeContext } from "../../context";


import '../movie-list-card/MovieListCard.scss'

export class MovieListCard extends PureComponent{
    constructor(props) {
        super(props);
    }

    render(){
    const { genres,match:{params}, movies, credits } = this.props;
    const movieFindIndex = movies.findIndex(item => item.id === parseInt(params.id));
    const {poster_path,
        popularity,
        title,
        release_date,
        genre_ids,
        overview,
        vote_average,
        original_language,
        backdrop_path,
        adult,
        id,
        video,
        vote_count,
    } = movies[movieFindIndex];
    const imgUrl = `https://image.tmdb.org/t/p/w300${poster_path}`;
    const backImg = `https://image.tmdb.org/t/p/w300${backdrop_path}`;
    let data = [];
    release_date ?data = release_date.split('-'): data = [0];

    const year = data[0];
    const selectedGenres = [];
    genres.map(genre => {
        return genre_ids.find(genreId =>  {
            if(genreId === genre.id){
                selectedGenres.push(genre.name)
            }
        })
    });
    return (
        <DarkThemeContext.Consumer>
            {
                (value) => <div className={`movie-list ${value.isDarkTheme && 'dark'}`}>
                    <div className='movie-list-movie' style={{backgroundImage: `url(${backImg})`}}>
                        <div className='movie-list-poster'>
                            <img src={imgUrl} style={{borderRadius: '10px'}}/>
                        </div>
                        <div className='movie-list-movie-content'>
                            <h2>{title}({year})</h2>
                            <div className='movie-list-movie-content-stars'>
                                <StarRating vote_average={vote_average} vote_count={vote_count}/>
                            </div>
                            <div className='movie-list-movie-content-block'>
                                <div>{release_date} Original language:
                                    {original_language} {selectedGenres.join()}
                                </div>
                                {adult ? <div>For adult: yes</div> : <div>For adult: no</div>}
                                <div>Popularity: {popularity}</div>
                                <div className='movie-list-movie-content-block-overview'>
                                    Overview: {overview}
                                </div>
                                {!video && <div className='movie-list-movie-content-block-video'>
                                    Video: none
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='movie-list-movie-actor'>
                        <div className='movie-list-movie-actor-content'>
                            {
                                credits && credits.map(actor =>
                                    <ActorCard key={actor.id}
                                               actor={actor}/>)
                            }
                        </div>
                    </div>
                </div>
            }
        </DarkThemeContext.Consumer>
    );
    }
}

export default MovieListCard;
