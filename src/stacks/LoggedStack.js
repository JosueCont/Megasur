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
import LocationBranchScreen from "../screens/loggedScreens/Home/LocationBranch";
import NotificationScreen from "../screens/loggedScreens/NotificationScreen";
import ConfirmFuelExchange from "../screens/loggedScreens/Home/ConfirmFuelExchange";

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
            <Stack.Screen name="LocationBranch" component={LocationBranchScreen} />
            <Stack.Screen name="ConfirmFuel" component={ConfirmFuelExchange}/>
        </Stack.Navigator>

    )
}

const TabNavigator = () => {
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
const LoggedStack = () => {
    return(
        <Stack.Navigator 
            initialRouteName="TabNavigator"
            
            screenOptions={({navigation, route}) =>({
                headerShown: false,
            })}
        >
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name='Notification' component={NotificationScreen} />
        </Stack.Navigator>
    )
}

export default LoggedStack;