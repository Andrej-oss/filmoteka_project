import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getSearchMovie } from "../../actions";
import { DarkThemeContext } from "../../context";

import logo from '../../img/imagen-filmoteka-0thumb.png'
import pug from '../../img/dog-watching-movies-pug-movie-cinema-theater-soda-popcorn-wearing-d-glasses-isolated-white-background-102640971.jpg'

import 'bootstrap/dist/css/bootstrap.min.css'
import "../header/Header.scss"
import {Link} from "react-router-dom";
class  Header extends PureComponent {
    state = {
        title:''
    };
    onInput = (e) =>{
        debugger
        const titleMovie = e.target.value;
         this.setState({
            title:titleMovie
        })
    };
    onGetSearchMovie=(title)=>{

        const { getSearchMovie } = this.props;
        return ()=>{
            getSearchMovie && getSearchMovie(title)
        }


    };
    render() {
        return (
            <DarkThemeContext.Consumer>
                {
                    (value) => {
                        debugger
                        const {  isDarkTheme,onDarkThemeToggle } = value;
                        const { searchOption } = this.props;
                        const { title } = this.state;
                        return <div className='my-header'>
                            <div className='my-header-content'>
                                <div className='my-header-content-icons'>
                                    <div className="d-flex">
                                        <img className="my-header-content-icons-pug" src={logo}/>
                                        <h2>Filmoteka</h2>
                                    </div>
                                </div>
                                <div className="my-header-content-search">

                                    <nav className="navbar navbar-light navbar-1 white">
                                        <button className="navbar-toggler"
                                                type="button"
                                                aria-expanded="false"
                                                onClick={onDarkThemeToggle}>
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                    </nav>

                                    <form className="form-inline d-flex justify-content-center md-form form-sm mt-10"
                                    onSubmit={this.onGetSearchMovie}>
                                        <input className="form-control form-control-sm ml-3 min-vw-50" type="text"
                                               placeholder="Search"
                                               aria-label="Search"
                                               onChange={this.onInput}
                                               value={title}/>
                                            {!title.length && <button className="btn btn-secondary m-3"
                                                                      disabled={true}>
                                            Search
                                        </button>}{!!title.length && <button className="btn btn-secondary m-3"
                                                                            onClick={this.onGetSearchMovie(title)} disabled={false}>
                                        <Link to={`/${title}/1`} style={{textDecoration: 'none'}}> Search</Link>
                                            </button>}
                                    </form>
                                </div>
                                <div>
                                    <img className='my-header-content-icons-user' src={pug}/>
                                </div>
                            </div>

                        </div>
                    }
                }
            </DarkThemeContext.Consumer>
                );
    }
}
const mapStateToProps = (store) => {
    const { searchOption, sortOption } = store;
    return {
        searchOption,
        sortOption
    }
};
const mapDispatchToProps = (dispatch) =>{
    return{
        getSearchMovie:(title) => dispatch(getSearchMovie(title))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
