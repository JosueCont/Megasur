import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {Spinner, View} from "native-base";
import LoggedStack from "./LoggedStack";
import AuthStack from "./AuthStack";
import SplashScreen from "../screens/SplashScreen";
import { preventAutoHideAsync } from "expo-splash-screen";

preventAutoHideAsync();

const NavigationContainerConfig = () => {
    const [loggedIn, setLoggedIn] = useState(null)
    const [loading, setLoading] = useState(true)
    const status = false;

    useEffect(() => {
        if (status) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        //setTimeout(() => {
        //    setLoading(false)
        //}, 300)
    },[status])

    return(
        <NavigationContainer>
            {loading ? (
                <SplashScreen onComplete={(val) => setLoading(val)}/>
                
            ): (loading != true && loggedIn) ? <LoggedStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default NavigationContainerConfig;