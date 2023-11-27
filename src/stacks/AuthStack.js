import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialScreen from "../screens/authScreens/InitialScreen";
import ValidateCodeScreen from "../screens/authScreens/ValidateCodeScreen";
import RegisterScreen from "../screens/authScreens/RegisterScreen";
import RegisterDone from "../screens/authScreens/RegisterDone";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            initialRouteName="Login"
            screenOptions={({navigation, route}) =>({

            })}
        >
            <Stack.Screen name="InitialScreen" component={InitialScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ValidateCode" component={ValidateCodeScreen} options={{headerShown: false}} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}} />
            <Stack.Screen name="RegisterDone" component={RegisterDone} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default AuthStack;