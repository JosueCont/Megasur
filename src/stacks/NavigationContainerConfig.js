import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {Spinner, View} from "native-base";
import LoggedStack from "./LoggedStack";
import AuthStack from "./AuthStack";
import SplashScreen from "../screens/SplashScreen";
import { preventAutoHideAsync } from "expo-splash-screen";
import { useSelector, useDispatch } from "react-redux";
import { createSession } from "../store/ducks/authDuck";

preventAutoHideAsync();

const NavigationContainerConfig = () => {
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(null)
    const [loading, setLoading] = useState(true)
    const status = useSelector(state => state.authDuck.isLogged);

    useEffect(() => {
        getSession()
        if (status) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        //setTimeout(() => {
        //    setLoading(false)
        //}, 300)
    },[status])

    const getSession = async() => dispatch(await createSession())

    return(
        <NavigationContainer>
            {loading ? (
                <SplashScreen onComplete={(val) => setLoading(val)}/>
                
            ): (loading != true && loggedIn) ? <LoggedStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default NavigationContainerConfig;