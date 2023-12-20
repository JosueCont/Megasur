import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from 'redux-thunk'
import authDuck from "./ducks/authDuck";
import homeDuck from "./ducks/homeDuck";
import profileDuck from "./ducks/profileDuck";

const rootReducer = combineReducers({
    authDuck: authDuck,
    homeDuck: homeDuck,
    profileDuck: profileDuck
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));