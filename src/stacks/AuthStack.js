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
            initialRouteName="InitialScreen"
            screenOptions={({navigation, route}) =>({
                headerShown:false,
                gestureEnabled: false
            })}
        >
            <Stack.Screen name="InitialScreen" component={InitialScreen} />
            <Stack.Screen name="ValidateCode" component={ValidateCodeScreen}  />
            <Stack.Screen name='Register' component={RegisterScreen}  />
            <Stack.Screen name="RegisterDone" component={RegisterDone}  />
        </Stack.Navigator>
    )
}

export default AuthStack;