
import React,{Component} from 'react';

import '../movie-comments/MovieComments.scss'

export function MovieComments(props){
        const { comment } = props;
        const { author, content } = comment;
        return (
            <div>
                {author && <div><div className="comment-author">
                    Author: <h1>{author}</h1>
                    <div>Comment</div>
                </div>
                <hr/>
                <div className="comment-content">
                {content}
                    </div>
                    <hr/></div>}
            </div>
        );
};
