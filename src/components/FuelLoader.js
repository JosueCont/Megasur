import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import Fuel from "../../assets/svg/Fuel";
import Animated,{useSharedValue, useAnimatedStyle, withSpring} from "react-native-reanimated";

const {height, width} = Dimensions.get('window');
/*position:'absolute', bottom:0, right: width/4*/
const FuelLoader = ({withBorder=false, flow, color, isBig=false}) => {
    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = flow/4;
    },[flow])

    

    const widthStyle = useAnimatedStyle(() => {
        return{
            width: withSpring(`${(progress.value*100)+4}%`,{duration:1000})
        }
    })
    
    return(
        <View style={[styles.container,{width: isBig ? width/1.2 : width/1.4,}]}>
            <Animated.View 
                style={[
                    styles.progressBar,widthStyle,
                    { 
                        backgroundColor:color, 
                        borderTopRightRadius: withBorder ? 90 : (progress.value*100)+4 >= 75 ? 90 : 0, 
                        borderBottomRightRadius: withBorder ? 90 : (progress.value*100)+4 >= 75 ? 90 :0,
                        }]}/>
            <Animated.Text style={[styles.lbl,{color: (progress.value*100)+4  >= 0 ? Colors.white : Colors.blackInit }]}>E</Animated.Text>
            <Animated.Text style={[styles.lbl, {color: (progress.value*100)+4 >= 25 ? Colors.white : Colors.blackInit }]}>|</Animated.Text>
            <Fuel />
            <Animated.Text style={[styles.lbl,{color: (progress.value*100)+4 >= 50 ? Colors.white : Colors.blackInit }]}>|</Animated.Text>
            <Animated.Text style={[styles.lbl, {color: (progress.value*100)+4 >= 75 ? Colors.white : Colors.blackInit }]}>F</Animated.Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    container:{ 
        alignSelf:'center', 
        backgroundColor: Colors.white, 
        borderRadius:90, 
        height:30, 
        flexDirection:'row', 
        padding:5, 
        justifyContent:'space-between', 
        //marginBottom:20,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    lbl:{
        fontSize: getFontSize(16), 
        fontWeight:'700',
        //color: Colors.blackInit
    },
    progressBar:{
        height:30, 
        position:'absolute',
        borderTopLeftRadius:90,
        borderBottomLeftRadius:90
    }
})

export default FuelLoader;