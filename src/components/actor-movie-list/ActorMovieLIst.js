import React, {Component} from 'react';
import {withRouter} from "react-router";
import PostPreview from "../poster-prewiev/PostPreview";
import {Link} from "react-router-dom";
import { DarkThemeContext } from "../../context";

import '../actor-movie-list/ActorMovieList.scss'
import avatarImg from '../../img/awaiting-image-profile-1000-1000.jpg'

class ActorMovieLIst extends Component {
    constructor(props) {
        super(props);
    }
    onGetMovie = (idMovie) => {
        const { getCredits,getDetailsMovie,getComments,getTrailer } = this.props;
        debugger
        return () => {
            getCredits && getCredits(idMovie) && getDetailsMovie(idMovie) && getComments(idMovie) && getTrailer(idMovie);
        }
}
componentDidMount() {
        const { match:{params},getActorBiography,getActor } = this.props;
        debugger
    if(params.id){
        getActor && getActor(params.id) && getActorBiography && getActorBiography(params.id);
    }
}
componentDidUpdate(prevProps, prevState, snapshot) {
        debugger
}

    render() {
        debugger
        const { moviesActor, actor, genres } = this.props;
        console.log(moviesActor)
        const { birthday,deathday,name,biography,place_of_birth,profile_path } = actor;
        const actorImg = `https://image.tmdb.org/t/p/w200${profile_path}`;
        return (
            <DarkThemeContext.Consumer>
          { value => <div className={`actor-list ${value.isDarkTheme && 'dark'}`}>
                <div className="actor-list-biography">
                    {profile_path ? <img src={actorImg} className="actor-list-biography-img"/> :
                    <img src={avatarImg} style={{width: '200px', height: '200px'}}/>}
                    <div className="actor-list-biography-content">
                        <h1>{name}</h1>
                        <div className="actor-list-biography-content-date">({birthday} - {deathday != null? deathday :''})</div>
                        <br/>
                        <div>Born: {place_of_birth}</div>
                        <br/>
                        <div>Biography: </div>
                        <div>{biography === ""? (<div className="actor-list-biography-content-biography"/>) : biography}</div>
                    </div>
                    </div>
                <div className="actor-list-filmography">
                    <table>
                        <tr>
                            <th>№</th>
                            <th>Year</th>
                            <th>Movie</th>
                            <th>Overview</th>
                            <th>Character</th>
                        </tr>
                        {
                            moviesActor && moviesActor.map((movie,index) => {
                                return <tr>
                                    <th>{index+1}</th>
                                    <th>{movie.release_date}</th>
                                    <th><div onClick={this.onGetMovie(movie.id)}>
                                            <Link to={`/${movie.id}`}
                                                  style={{textDecoration: 'none'}} onClick={this.onGetMovie(movie.id)}>
                                                <PostPreview movie={movie} genres={genres}/>
                                            </Link>
                                    </div></th>
                                    <th>{movie.overview}</th>
                                    <th>{movie.character}</th>
                                </tr>
                            })
                        }
                    </table>
                </div>
            </div>}
            </DarkThemeContext.Consumer>
        );
    }
}

export default withRouter(ActorMovieLIst);
