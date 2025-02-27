import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from 'redux-thunk'
import authDuck from "./ducks/authDuck";
import homeDuck from "./ducks/homeDuck";
import profileDuck from "./ducks/profileDuck";
import locationDuck from "./ducks/locationsDuck";
import chargesDuck from "./ducks/chargesDuck";
import exchangeDuck from "./ducks/exchangeDuck";
import notificationsDuck from "./ducks/NotificationsDuck";
import redeemDuck from "./ducks/redeemPointsDuck";
import contactDuck from "./ducks/contactDuck";
import invoicingDuck from "./ducks/invoicingDuck";

const rootReducer = combineReducers({
    authDuck: authDuck,
    homeDuck: homeDuck,
    profileDuck: profileDuck,
    locationDuck: locationDuck,
    chargesDuck: chargesDuck,
    exchangeDuck: exchangeDuck,
    notificationsDuck: notificationsDuck,
    redeemDuck: redeemDuck,
    contactDuck: contactDuck,
    invoicingDuck: invoicingDuck
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));