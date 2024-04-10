import React, { useCallback , useEffect} from "react";
import { BackHandler } from "react-native";
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
import AnnouncementDetail from "../screens/loggedScreens/Home/AnnouncementDetail";
import ConfirmExchange from "../screens/loggedScreens/Home/ConfirmExchange";
import LocationBranchScreen from "../screens/loggedScreens/Home/LocationBranch";
import NotificationScreen from "../screens/loggedScreens/NotificationScreen";
import ConfirmFuelExchange from "../screens/loggedScreens/Home/ConfirmFuelExchange";
import SurveysScreen from "../screens/loggedScreens/Home/SurveyScreen";
import UserProfileScreen from "../screens/loggedScreens/Profile/UserProfileScreen";
import LegalInfoScreen from "../screens/loggedScreens/Profile/LegalInfoScreen";
import MyCarScreen from "../screens/loggedScreens/Profile/MyCarScreen";
import LinkScreen from "../screens/loggedScreens/Profile/LinkScreen";
import AnsweredSurveyScreen from "../screens/loggedScreens/Profile/AnswerSurveyScreen";
import CheckInScreen from "../screens/loggedScreens/Profile/CheckInScree";
import ConfirmRateScreen from "../screens/loggedScreens/Charges/ConfirmRateScreen";
import SurveyDoneScreen from "../screens/loggedScreens/Home/SurveyDone";
import DetailCardScreen from "../screens/loggedScreens/Profile/DetailCardScreen";
import RedeemPointsDone from "../screens/loggedScreens/Profile/RedeemPointsScreen";
import ContactScreen from "../screens/loggedScreens/Profile/ContactScreen";
import SendQuestionScreen from "../screens/loggedScreens/Contact/SendQuestionScreen";
import FrecuentQuestionsScreen from "../screens/loggedScreens/Contact/FrequentQuestionsScreen";
import AboutAppScreen from "../screens/loggedScreens/Profile/AboutAppScreen";
import RegisterRfcScreen from "../screens/loggedScreens/Profile/RegisterRfcScreen";
import { useNavigation, useRoute, useFocusEffect, CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { resetCount } from "../store/ducks/exchangeDuck";
import { onChangeValueRedeem, setCardSelected } from "../store/ducks/redeemPointsDuck";

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
            {/*<Stack.Screen name="Exchange" component={ProductsScreen}/>
            <Stack.Screen name="DetailProduct" component={DetailProduct}/>
            <Stack.Screen name="Confirm" component={ConfirmExchange} />
            <Stack.Screen name="LocationBranch" component={LocationBranchScreen} />
        <Stack.Screen name="ConfirmFuel" component={ConfirmFuelExchange}/>*/}
            <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail}/>
            <Stack.Screen name="Surveys" component={SurveysScreen} />
            <Stack.Screen name="SurveyDone" component={SurveyDoneScreen}/>
            <Stack.Screen name="LinkUp" component={LinkScreen}/>
            {/*<Stack.Screen name="DetailCard" component={DetailCardScreen}/>
            <Stack.Screen name="RedemPoints" component={RedeemPointsDone}/>*/}

        </Stack.Navigator>

    )
}

const ProfileNavigator = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            initialRouteName="Account"
            screenOptions={({navigation, route}) =>({
                headerShown: false
            })}
        >
            <Stack.Screen name="Account" component={ProfileScreen}/>
            <Stack.Screen name="FormProfile" component={UserProfileScreen}/>
            <Stack.Screen name="MyCar" component={MyCarScreen}/>
            <Stack.Screen name="Link" component={LinkScreen}/>
            <Stack.Screen name="CheckIn" component={CheckInScreen}/>
            <Stack.Screen name="AnsweredSurvey" component={AnsweredSurveyScreen}/>
            <Stack.Screen name="InfoLegal" component={LegalInfoScreen}/>
            <Stack.Screen name="About" component={AboutAppScreen}/>
            <Stack.Screen name="DetailCard" component={DetailCardScreen}/>
            <Stack.Screen name="RedemPoints" component={RedeemPointsDone}/>
            <Stack.Screen name="Contact" component={ContactScreen}/>
            <Stack.Screen name="ContactUs" component={SendQuestionScreen}/>
            <Stack.Screen name="FrecuentQuestions" component={FrecuentQuestionsScreen}/>
            <Stack.Screen name="RegisterRfc" component={RegisterRfcScreen}/>
            
        </Stack.Navigator>
    )
}

const ChargesNavigator = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            initialRouteName="ListCharges"
            screenOptions={({navigation, route}) =>({
                headerShown: false
            })}
        >
            <Stack.Screen name="ListCharges" component={ChargerScreen}/>
            <Stack.Screen name="ConfirmRate" component={ConfirmRateScreen}/>
            
        </Stack.Navigator>
    )
}

const StoreNavigator = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            initialRouteName="Exchange"
            screenOptions={({navigation, route}) =>({
                headerShown: false
            })}
        >
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
                headerShown:false,
                tabBarHideOnKeyboard: true,
            })}>
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Charges" component={ChargesNavigator}/>
            <Tab.Screen name="Store" component={StoreNavigator}/>
            <Tab.Screen name="Stations" component={LocationScreen}/>
            <Tab.Screen name="Profile" component={ProfileNavigator}/>
        </Tab.Navigator>

    )
}
const LoggedStack = () => {
    const navigation =useNavigation()
    const dispatch = useDispatch()
    const modalAddCard = useSelector(state => state.redeemDuck.modalAddCard)
    const totalSurveys = useSelector(state => state.homeDuck.totalSurveys)


    useFocusEffect(
        useCallback(() => {
            const handleBackButton = () => {
                //console.log('bloquadeo', navigation.getCurrentRoute())
                if(modalAddCard) console.log('Cerrar el modal')
                let route = navigation.getCurrentRoute().name
                if(route === 'House' || route === 'ListCharges' || route==='Account'){
                    return true;
    
                }else{
                    if(route === 'DetailProduct') dispatch(resetCount())
                    else if(route === 'DetailCard'){
                        dispatch(setCardSelected(null))
                        modalAddCard && dispatch(onChangeValueRedeem({prop:'modalAddCard', value: false}))
                    }else if(route === 'SurveyDone'){
                        totalSurveys > 1 ? navigation.navigate('Surveys') : navigation.navigate('House')
                    }else if(route === 'Contact'){
                        navigation.dispatch(CommonActions.reset({
                            index:0,
                            routes:[{name:navigation?.getCurrentRoute().params?.route, params: {screen: navigation?.getCurrentRoute().params?.route }}]
                        }))
                    }else if(route === 'Stations'){
                        if(!navigation?.getCurrentRoute()?.params?.fromCloseStations) return true;
                    }
                }
            }

            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
            return () => {
              BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            };
        },[])

    )
    return(
        <Stack.Navigator 
            initialRouteName="TabNavigator"
            
            screenOptions={({navigation, route}) =>({
                headerShown: false                
            })}
        >
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name='Notification' component={NotificationScreen} />
        </Stack.Navigator>
    )
}

export default LoggedStack;