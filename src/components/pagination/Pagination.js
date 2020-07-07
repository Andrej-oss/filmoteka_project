import React, {PureComponent} from 'react';
import { connect } from "react-redux";
import { getMovies, getSortedMovies, getSearchMovie } from "../../actions";
import { Link } from 'react-router-dom';

import "../pagination/Pagination.scss"

class Paginations extends PureComponent {
     pages = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10}];
     state = {
         pages: [...this.pages],
         isActivePage: true,
         activePage: this.pages[0].id,
         lastPages: 0
     };
    pageGetMovies = (id) => {
         const { getMovies } = this.props;

         debugger
         return () =>{
             getMovies && getMovies(id);
             this.setState({
                 isActivePage:true,
                 activePage: id
             })
         }
    };
    pageGetSortedMovies = (sortOption, searchOption, id = 1) => {
         const { getSortedMovies = 'by_default', getSearchMovie } = this.props
          return () => {
            searchOption? getSearchMovie  && getSearchMovie(searchOption,id):
              getSortedMovies && getSortedMovies(sortOption, id);
              this.setState({
                  isActivePage:true,
                  activePage: id,

              })
          }
    };
     previousPage = () => {
         debugger
         const { lastPages } = this.state;

         const copyPages = [...this.pages];

             this.pages.map(page=>
             {
                 if (page.id > 10){
                     this.setState({
                         pages: copyPages,
                         lastPages: lastPages + 10
                     });
                     return page.id = page.id - 10}
                 });
     };
   nextPages= () => {
       const { lastPage  } = this.props;
       const { lastPages } = this.state;
       const copyPages = [...this.pages];
       const lastPagess = lastPages -(- lastPage);
        this.pages.map((page) => {
           if( lastPagess > 10) {
               this.setState({
                   pages: copyPages,
                   lastPages: (lastPages - 10)
               });
               return page.id = page.id+10
           }
       });

   };

componentDidUpdate(prevProps, prevState, snapshot) {
    const { lastPage, getMovies } = this.props;
 if (!lastPage){
     getMovies()
 }
    if ((prevProps.sortOption !== this.props.sortOption)||(prevProps.lastPage !== lastPage)){
        this.pages = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10}];
        debugger
        this.setState({
            pages: [...this.pages],
            isActivePage: true,
            activePage: this.pages[0].id,
            lastPages: 0
        })
    }
}

    render() {
        const { sortOption,searchOption,lastPage } = this.props;
        const { pages,isActivePage,activePage } = this.state;
        debugger
        return (
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" type="button">
                            <a className="page-link" onClick={this.previousPage}>Previous</a>
                        </li>
                        {
                         pages &&   pages.map((page,index) =>
                             (lastPage >= page.id)?
                             <Link
                                 to={`/${sortOption}/${page.id}`}
                                 style={{ textDecoration: 'none'}}>
                                 <li type="button"
                                     key={page.id}
                                     className={isActivePage && (activePage===page.id)?
                                     "active":"page-item"}>
                                <a className="page-link"
                                   onClick={(sortOption || searchOption?
                                       this.pageGetSortedMovies(sortOption, searchOption, page.id):
                                       this.pageGetMovies(page.id))}>{page.id}
                                </a>
                                </li>
                             </Link>:
                         "")
                        }
                        <li className="page-item" type="button" >
                            <a className="page-link"  onClick={this.nextPages}>Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const { sortOption, lastPage, searchOption } = store;
    return {
        sortOption,
        lastPage,
        searchOption
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMovies: (id) => {
            dispatch(getMovies(id));
        },
        getSortedMovies: (sortOption,id) => {
            dispatch(getSortedMovies(sortOption,id))
        },
        getSearchMovie:(title, pageId) => {
            dispatch(getSearchMovie(title,pageId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginations);
