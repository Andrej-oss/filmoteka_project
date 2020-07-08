import React from 'react';
import {FaStar} from "react-icons/all";

function StarRatingCard(props) {
    const { vote_average } = props;
    const rating = Math.round(vote_average)/2;
    return (
        <div className="stars">
            {[...Array(5)].map((star,i) =>  {
                const vote = i+1;
                return <FaStar
                    color={rating >= vote? "gold" : "grey"}
                    key={Math.random()*100}
                    size={20}/>})}
        </div>
    );
}

export default StarRatingCard;
