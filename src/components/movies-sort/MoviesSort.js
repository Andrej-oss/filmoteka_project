import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getSortedMovies } from "../../actions";
import { Link } from "react-router-dom";

import '../movies-sort/MovieSort.scss';

class MoviesSort extends Component {
    constructor(props) {
        super(props);
        const sortingOption = [{name:'select by popularity(desc)', selectOption:'popularity.desc'},
            {name:'select by popularity(asc)', selectOption:'popularity.asc'},
            {name:'select by title(desc)', selectOption:'original_title.desc'},
            {name:'select by title(asc)', selectOption:'original_title.asc'},
            {name:'select by date(desc)', selectOption:'release_date.desc'},
            {name:'select by date(asc)', selectOption:'release_date.asc'},
            {name:'select by vote(desc)', selectOption:'vote_count.desc'},
            {name:'select by vote(asc)', selectOption:'vote_count.asc'},
            {name:'select by vote average(desc)', selectOption:'vote_average.desc'},
            {name:'select by vote average(asc)', selectOption:'vote_average.asc'}
            ];
        this.state = ({
            isOpen: false,
            selectedOption:sortingOption,
            selectOption: sortingOption[0].name
        })
      }
    onToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    onSort = (option, name) =>{
        debugger
        const { getSortedMovies } = this.props;

   return () => {
       getSortedMovies && getSortedMovies(option);
       this.setState({
           selectOption: name,
           isOpen: false
       })
   }
    };

    render() {
        const { selectedOption, isOpen, selectOption } = this.state;
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={this.onToggle}>
                    {selectOption}
                </button>
                { isOpen &&
                <div className="dropdown-content" aria-labelledby="dropdownMenu2">
                    {selectedOption.map(option =>
                        <Link to={`/${option.selectOption}/1`}>
                            <button  class="dropdown-item"
                                 type="button"
                                 key={option.name}
                                 onClick={this.onSort(option.selectOption,option.name)}
                                 value={option.selectOption}>{option.name}
                            </button>
                        </Link>)}
                </div> }
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
   return {
       getSortedMovies: (sortOption,id) => {
           dispatch(getSortedMovies(sortOption,id))}
   }
}

export default connect(null, mapDispatchToProps)(MoviesSort);
