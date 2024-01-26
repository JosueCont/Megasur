import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/loggedScreens/HomeScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTabBar from "../components/BottomTabBar";
import ChargerScreen from "../screens/loggedScreens/ChargerScreen";
import ScanScreen from "../screens/loggedScreens/ScanScreen";
import LocationScreen from "../screens/loggedScreens/LocationScreen";
import ProfileScreen from "../screens/loggedScreens/ProfileScreen";
import ProductsScreen from "../screens/loggedScreens/Home/ProductsScreen";
import DetailProduct from "../screens/loggedScreens/Home/DetailProduct";
import ConfirmExchange from "../screens/loggedScreens/Home/ConfirmExchange";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            initialRouteName="House"
            screenOptions={({navigation, route}) =>({
                headerShown: false
            })}
        >
            <Stack.Screen name="House" component={HomeScreen}/>
            <Stack.Screen name="Exchange" component={ProductsScreen}/>
            <Stack.Screen name="DetailProduct" component={DetailProduct}/>
            <Stack.Screen name="Confirm" component={ConfirmExchange} />
        </Stack.Navigator>

    )
}
const LoggedStack = () => {
    return(
        <Tab.Navigator 
            tabBar={(props) => <CustomBottomTabBar {...props}/>} 
            screenOptions={({navigation, route}) =>({
                headerShown:false
            })}>
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Charges" component={ChargerScreen}/>
            <Tab.Screen name="Scan" component={ScanScreen}/>
            <Tab.Screen name="Stations" component={LocationScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    )
}

export default LoggedStack;