import React, {PureComponent} from 'react';
import { connect } from "react-redux";
import { getMovies, getSortedMovies, getSearchMovie,getCurrentPages } from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import { sortingOption } from "../../constants/Constants";

import "../pagination/Pagination.scss"

class Paginations extends PureComponent {
     pages = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10}];
     state = {
         pages: [...this.pages],
         isActivePage: true,
         activePage: this.props.match.params.pageId?parseInt(this.props.match.params.pageId): this.pages[0].id,
         lastPages: 0
     };
    pageGetMovies = (id) => {
         const { getMovies } = this.props;

         debugger
         return () =>{
             getMovies && getMovies(id);
             (id === 1 ?  this.setState({
                 pages: this.pages,
                 isActivePage: true,
                 activePage: this.pages[0].id,
                 lastPages: 0
             }) : this.setState({
                 isActivePage:true,
                 activePage: id,
             }))
         }
    };
    pageGetSortedMovies = (sortOption, searchOption, id = 1) => {
         const { getSortedMovies, getSearchMovie } = this.props;
          return () => {
            searchOption? getSearchMovie  && getSearchMovie(searchOption,id):
              getSortedMovies && getSortedMovies(sortOption, id);
              (id === 1 ?  this.setState({
                  pages: this.pages,
                  isActivePage: true,
                  activePage: this.pages[0].id,
                  lastPages: 0
              }) : this.setState({
                  isActivePage:true,
                  activePage: id,
              }))
          }
    };
     previousPage = () => {
         debugger
         const { lastPages } = this.state;
         const { currentPages,getCurrentPages } = this.props;
         const copyPages = [...this.pages];

             (currentPages.length?currentPages:this.pages).map(page=>
             {
                 if (page.id > 10){
                     this.setState({
                         pages: currentPages.length?([...currentPages]):copyPages,
                         lastPages: lastPages - 10
                     });
                     return page.id = page.id - 10}
                 });
         getCurrentPages && getCurrentPages(this.state.pages)
     };
   nextPages= () => {
       const { lastPage,getCurrentPages,currentPages  } = this.props;
       const { lastPages } = this.state;
        const copyPages = [...this.pages];
       const lastPagess =  lastPage - lastPages;
       ( currentPages.length?currentPages:this.pages).map((page) => {
           debugger
           if( lastPagess > 10) {
               this.setState({
                   pages: currentPages.length?currentPages:'',
                   lastPages: (lastPages + 10)
               });
               return page.id = page.id+10
           }
       });

            getCurrentPages && getCurrentPages(this.state.pages)

   };
    componentDidMount() {
        const { lastPage, getMovies,match:{params}, currentPages } = this.props;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { lastPage, getMovies,match:{params}, currentPages } = this.props;
        debugger
        if (currentPages.length || currentPages.length && (this.pages[0].id !== currentPages[0].id)){
            this.setState({
                pages: currentPages,
                isActivePage: true,
                activePage: parseInt(params.pageId),
                lastPages: currentPages[0].id - 1

            })
        }
     if ((prevProps.sortOption !== this.props.sortOption)||(prevProps.lastPage !== lastPage)){
        this.pages = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10}];
        debugger
        this.setState({
            pages: this.pages,
            isActivePage: true,
            activePage: params.pageId,
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
                         pages &&   pages.map((page,index) => {
                                 if (lastPage >= page.id) {
                                     return <Link
                                         key={page.id}
                                         to={`/${searchOption?searchOption:sortOption}/${page.id}`}
                                         style={{textDecoration: 'none'}}>
                                         <li type="button"
                                             key={page.id}
                                             className={isActivePage && (activePage === page.id) ?
                                                 "active" : "page-item"}>
                                             <a className="page-link"
                                                key={page.id}
                                                onClick={(sortOption || searchOption ?
                                                    this.pageGetSortedMovies(sortOption, searchOption, page.id) :
                                                    this.pageGetMovies(page.id))}>{page.id}
                                             </a>
                                         </li>
                                     </Link>
                                 }
                             }
                         )
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
    const { sortOption, lastPage, searchOption,currentPages } = store;
    return {
        sortOption,
        lastPage,
        searchOption,
        currentPages
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
        },
        getCurrentPages:(pages) => {
            dispatch(getCurrentPages(pages))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Paginations));
