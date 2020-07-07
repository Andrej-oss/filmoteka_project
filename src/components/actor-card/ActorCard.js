import React from 'react';
import imdDefault from "../../img/awaiting-image-profile-1000-1000.jpg";

import "../actor-card/ActorCard.scss";

function ActorCard(props) {
    debugger
    const { actor } = props;
    const {cast_id,
    character,
    credit_id,
    gender,
    id,
    name,
    order,
    profile_path} = actor;
    const imgUrl = `https://image.tmdb.org/t/p/w200${profile_path}`;

    return (
        <div className="actor-card">
            <div  className="actor-card-poster">
                {!profile_path && <img src={imdDefault} style={{width:"100px"}}/>}
                {profile_path && <img src={imgUrl}/>}
                <div className="actor-card-poster-name">{name}</div>
                <div>{character}</div>
            </div>
        </div>
    );
}

export default ActorCard;
