import React, { Component } from 'react';
import imdDefault from '../../img/icon-5.png'
import { Badge } from 'reactstrap';

import "../poster-prewiev/PostPreview.scss"
import StarRatingCard from "../star-rating/StarRatingCard";


class PostPreview extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        const { movie, genres } = this.props;
        let {poster_path, title, release_date, genre_ids, vote_average } = movie;
        const mapMonth = [{id:0,month:"author_fucking_asshole"},
            {id:1,month:"January"},
            {id:1,month:"January"},
            {id:2,month:"February"},
            {id:3,month:"March"},
            {id:4,month:"April"},
            {id:5,month:"May"},
            {id:6,month:"June"},
            {id:7,month:"July"},
            {id:8,month:"August"},
            {id:9,month:"September"},
            {id:10,month:"October"},
            {id:11,month:"November"},
            {id:12,month:"December"}
        ];
      if (!release_date) {
          release_date = " -0- "
      }
        debugger
        const arrayDate = release_date.split('-')
        arrayDate.splice(1,1,mapMonth.find(mon => {
            if (mon.id == parseInt(arrayDate[1],10)){
                return mon.month
            }
        }));
        arrayDate[1] = arrayDate[1].month;
       const stringData = arrayDate.reverse().join(' ');
        const imgUrl = `https://image.tmdb.org/t/p/w200${poster_path}`;
        const selectedGenres = [];
        genres.map(genre => {
            return genre_ids.find(genreId =>  {
                if(genreId === genre.id){
                    selectedGenres.push(genre.name)
                }
            })
        });
    return (
       <div className="my-post-preview">
           <div  className="my-post-preview-post">
               {!poster_path && <img src={imdDefault} style={{width:"200px"}}/>}
               {poster_path && <img src={imgUrl}/>}
               {!!selectedGenres.length && selectedGenres.map(genre =>
                   <Badge color="info" key={genre.id}> {genre}</Badge> )}

               <div className="my-post-preview-post-title">{title}</div>{stringData}
               <StarRatingCard vote_average={vote_average} />
           </div>
       </div>
    );
 }
}


export default PostPreview;
