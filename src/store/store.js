import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from 'redux-thunk'
import authDuck from "./ducks/authDuck";
import homeDuck from "./ducks/homeDuck";

const rootReducer = combineReducers({
    authDuck: authDuck,
    homeDuck: homeDuck
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));