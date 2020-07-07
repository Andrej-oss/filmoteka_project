import { createStore, applyMiddleware} from "redux";
import { moviesReducer } from "../redusers/Redusers";
import { composeWithDevTools } from "redux-devtools-extension"
import  thunk  from 'redux-thunk'

export const moviesStore = createStore(moviesReducer, composeWithDevTools(applyMiddleware(thunk)));
