import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import Fuel from "../../assets/svg/Fuel";
import Animated,{useSharedValue, useAnimatedStyle, withSpring} from "react-native-reanimated";

const {height, width} = Dimensions.get('window');
/*position:'absolute', bottom:0, right: width/4*/
const FuelLoader = ({withBorder=false, flow}) => {
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
        <View style={styles.container}>
            <Animated.View style={[styles.progressBar,widthStyle,{ borderTopRightRadius: withBorder ? 90 : 0, borderBottomRightRadius: withBorder ? 90 : 0 }]}/>
            <Text style={[styles.lbl,{color: Colors.white}]}>E</Text>
            <Text style={styles.lbl}>|</Text>
            <Fuel />
            <Text style={styles.lbl}>|</Text>
            <Text style={styles.lbl}>F</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    container:{
        width: width/1.4, 
        alignSelf:'center', 
        backgroundColor: Colors.white, 
        borderRadius:90, 
        height:30, 
        flexDirection:'row', 
        padding:5, 
        justifyContent:'space-between', 
        marginBottom:20
    },
    lbl:{
        fontSize: getFontSize(16), 
        fontWeight:'700',
        color: Colors.lightGray
    },
    progressBar:{
        height:30, 
        backgroundColor:Colors.green, 
        position:'absolute',
        borderTopLeftRadius:90,
        borderBottomLeftRadius:90
    }
})

export default FuelLoader;