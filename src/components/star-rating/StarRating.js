import React, {Component} from 'react';
import '../star-rating/StarRating.scss'
import { FaStar } from "react-icons/all";

function StarRating(props) {

        debugger
        const { vote_average, vote_count } = props;
        const rating = Math.round(vote_average);
        return (
            <div className="stars">
                {[...Array(10)].map((star,i) =>  {
                   const vote = i+1;
                    return <FaStar
                        color={rating >= vote? "gold" : "grey"}
                        key={Math.random()*100}
                        size={20}/>})}
                 <div>Voted: {vote_count}</div>
            </div>
        );
    }

export default StarRating;
