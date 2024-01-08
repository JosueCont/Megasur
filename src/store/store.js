import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from 'redux-thunk'
import authDuck from "./ducks/authDuck";
import homeDuck from "./ducks/homeDuck";
import profileDuck from "./ducks/profileDuck";
import locationDuck from "./ducks/locationsDuck";

const rootReducer = combineReducers({
    authDuck: authDuck,
    homeDuck: homeDuck,
    profileDuck: profileDuck,
    locationDuck: locationDuck
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));