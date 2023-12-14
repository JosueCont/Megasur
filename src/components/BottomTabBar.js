import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";

const CustomBottomTabBar = ({state, navigation}) => {
    return(
        <View style={styles.tabBarContainer}>
            {state.routes.map(( route, index ) => {
                const focused = state.index === index;
                const itemColor = focused ? Colors.blueGreen : Colors.blackInit;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                } 
                
                let iconName;
                let label;
                switch (route.name) {
                    case "Home":
                        iconName = "home-outline";
                        label = 'Inicio'
                        break;
                    case "Charges":
                        iconName = "local-gas-station";
                        label = 'Cargas'
                        break;
                    case "Scan":
                        iconName = 'scan';
                        label = 'Escanea'
                        break;
                    case 'Stations':
                        iconName = 'location-outline';
                        label = 'Estaciones'
                        break;
                    default:
                        iconName = 'person-outline';
                        label = 'Perfíl'
                        break;
                }

                const  animatedValue = new Animated.Value(1);
                const onPressIn = () => {
                    Animated.spring(animatedValue, {
                        toValue: 0.9,
                        useNativeDriver: true,
                    }).start();
                };
    
                const onPressOut = () => {
                    Animated.spring(animatedValue, {
                        toValue: 1,
                        useNativeDriver: true,
                    }).start();
                };

                const animatedStyle = {
                    transform: [{ scale: animatedValue }],
                };

                return(
                    <Animated.View
                        style={[styles.tabItem, animatedStyle,]}
                        key={route.name}>
                            <TouchableOpacity 
                                onPress={onPress}
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                            >
                                <View style={{ alignItems: "center"}}>
                                    {route.name === 'Scan' ? (
                                        <View style={styles.scanItem}>
                                            <Ionicons name={iconName} size={20} color={itemColor} style={{ marginBottom: 2}}/>
                                            <Text style={[{color: itemColor }, styles.tabBarText]}>{label}</Text>
                                        </View>
                                    ):(
                                        <>
                                            {route.name === 'Charges' ? <MaterialIcons name={iconName} size={21} color={itemColor} style={{ marginBottom: 2}}/>
                                              : <Ionicons  name={iconName} size={20} color={itemColor} style={{ marginBottom: 2}}/>}
                                            <Text style={[{color: itemColor }, styles.tabBarText]}>{label}</Text>
                                        </>
                                    )}
                                </View>
                                </TouchableOpacity>
                    </Animated.View>
                )

            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBarContainer:{
        flexDirection: 'row',
        height: 60,
        borderColor: 'white',
        borderTopColor: Colors.border,
        borderWidth: 1,
        justifyContent: 'space-evenly',
    },
    tabItem: {
        width: 60,
        marginTop:10
    },
    tabBarText: {
        fontSize: getFontSize(10),
        fontWeight: '700',
    },
    scanItem:{
        backgroundColor:Colors.white, 
        position:'absolute', 
        bottom:-30, 
        width: 86, 
        height:86, 
        borderRadius:43,
        borderWidth:6,
        borderColor: Colors.yellow,
        justifyContent:'center',
        alignItems:'center',
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    }
})

export default CustomBottomTabBar;