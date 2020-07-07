import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getSearchMovie } from "../../actions";
import { DarkThemeContext } from "../../context";

import logo from '../../img/imagen-filmoteka-0thumb.png'
import pug from '../../img/dog-watching-movies-pug-movie-cinema-theater-soda-popcorn-wearing-d-glasses-isolated-white-background-102640971.jpg'

import 'bootstrap/dist/css/bootstrap.min.css'
import "../header/Header.scss"
class  Header extends PureComponent {
    state = {
        title:''
    };
    onInput = (e) =>{
        debugger
       const { title } = this.state ;
        const titleMovie = title + `${e.nativeEvent.data}`;
        this.setState({
            title:titleMovie
        })
    };
    onGetSearchMovie=(e)=>{
        e.preventDefault();
        const { getSearchMovie } = this.props;
        const { title } =this.state;
        getSearchMovie && getSearchMovie(title)


    };
    render() {
        return (
            <DarkThemeContext.Consumer>
                {
                    (value) => {
                        const {  isDarkTheme,onDarkThemeToggle } = value;
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

                                    <form className="form-inline d-flex justify-content-center md-form form-sm mt-10">
                                        <input className="form-control form-control-sm ml-3 min-vw-50" type="text"
                                               placeholder="Search"
                                               aria-label="Search"
                                               onChange={this.onInput}/>
                                        <button className="btn btn-primary m-3"
                                                onClick={this.onGetSearchMovie}>
                                            Search
                                        </button>
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
const mapDispatchToProps = (dispatch) =>{
    return{
        getSearchMovie:(title) => dispatch(getSearchMovie(title))
    }
};

export default connect(null, mapDispatchToProps)(Header);
