import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BackHandler } from "react-native";
import {Spinner, View} from "native-base";
import LoggedStack from "./LoggedStack";
import AuthStack from "./AuthStack";
import SplashScreen from "../screens/SplashScreen";
import { preventAutoHideAsync } from "expo-splash-screen";
import { useSelector, useDispatch } from "react-redux";
import { createSession } from "../store/ducks/authDuck";
import { injectStore } from "../utils/services/AxiosConfig";
import { store } from "../store/store";
import { getCountNotifications, getUserNotifications } from "../store/ducks/NotificationsDuck";
import { useNavigation, useRoute } from "@react-navigation/native";

preventAutoHideAsync();

injectStore(store)

const NavigationContainerConfig = () => {
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(null)
    const [loading, setLoading] = useState(true)
    const status = useSelector(state => state.authDuck.isLogged);
    const userId = useSelector(state => state.authDuck.dataUser?.id)


    useEffect(() => {
        getSession()
        if (status) {
            setLoggedIn(true)
            getDataNotifications()
        } else {
            setLoggedIn(false)
        }
        //setTimeout(() => {
        //    setLoading(false)
        //}, 300)
    },[status])



    const getSession = async() => dispatch(await createSession())

    const getDataNotifications = async() => {
        try {
            dispatch(getUserNotifications(`?page=1&per_page=50&is_read=true&user_id=${userId}`))
            dispatch(getCountNotifications())
        } catch (e) {
            console.log('e',e)
        }
    }

    return(
        <NavigationContainer>
            {loading ? (
                <SplashScreen onComplete={(val) => setLoading(val)}/>
                
            ): (loading != true && loggedIn) ? <LoggedStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default NavigationContainerConfig;