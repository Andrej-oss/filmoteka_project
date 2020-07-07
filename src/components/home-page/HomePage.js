import React from 'react';
import MoviesList from "../movies-list/MoviesList";
import { DarkThemeContext } from "../../App";
import { moviesStore } from "../../store/Store";
import { Provider } from 'react-redux'
import {withRouter} from "react-router-dom";


import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function HomePage() {
    debugger
  return (
    <div className="App">
        <DarkThemeContext.Consumer>
        <Provider store={moviesStore}>
            <MoviesList/>
        </Provider>
      </DarkThemeContext.Consumer>
    </div>
  );
}


export default withRouter(HomePage);
