import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from 'redux-thunk'
import authDuck from "./ducks/authDuck";

const rootReducer = combineReducers({
    authDuck: authDuck
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));