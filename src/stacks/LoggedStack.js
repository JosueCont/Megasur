import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/loggedScreens/HomeScreen";

const Stack = createNativeStackNavigator();
const LoggedStack = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            initialRouteName="Login"
            screenOptions={({navigation, route}) =>({

            })}
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default LoggedStack;