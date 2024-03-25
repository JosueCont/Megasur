
import React,{useEffect,useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, ImageBackground } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Animated,{useSharedValue, useAnimatedStyle, Easing, interpolate, Extrapolate, withSpring, withTiming} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { onShowBanner } from "../../store/ducks/homeDuck";

const {height, width} = Dimensions.get('window');

const Question = ({cardId}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [isAnswered, setAnswer] = useState(false)
    const isAnimated = useSharedValue(false)
    const animationValue = useSharedValue(0);

    const startAnimation = () => {
        isAnimated.value = true
        animationValue.value = withTiming(1, {
            duration: 1000,
            easing: Easing.linear,
        });
    }

    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [150,80,50,0]
        const heightOutputRange = [100,75,50,0]
        const heightAnimate = interpolate(
            isAnimated.value,
            inputRange,
            heightOutputRange,
            Extrapolate.CLAMP
        );
        return{
            opacity: withTiming(isAnimated.value ? 0 : 1, {duration: 1000, easing: Easing.ease}),
            height:  isAnimated.value ? withTiming(heightAnimate, {duration:1000,easing: Easing.ease}) : 100
        }
    })
    return(
        <>
            <Animated.View style={[styles.contQuestion, animatedStyle]}>
                {isAnswered ? (
                    <Text style={styles.lblThanks}>Gracias por participar...</Text>
                ):(
                    <>
                        <Text style={styles.question}>¿Tienes una tarjeta física?</Text>
                        <View style={styles.contBtn}>
                            <TouchableOpacity 
                                onPress={() => {
                                    setAnswer(true);
                                    dispatch(onShowBanner(cardId,2))
                                    setTimeout(() => {
                                        startAnimation()
                                    },1000);
                                }}
                                style={[styles.btnQuestion,{backgroundColor: Colors.blueGreen,}]}>
                                <Text style={styles.lblQuestion}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Profile',{screen: 'Link', params: {route:'House'}})}
                                style={[styles.btnQuestion,{backgroundColor: Colors.pink,}]}>
                                <Text style={styles.lblQuestion}>Si</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Animated.View>
        
        </>
    )
}

const styles = StyleSheet.create({
    contQuestion:{
        height: 100, 
        width: width, 
        //backgroundColor:'red', 
        alignItems:'center',
    },
    question:{
        color: Colors.darkGray, 
        fontSize: getFontSize(24), 
        fontWeight:'700', 
        marginBottom:13
    },
    contBtn:{
        flexDirection:'row', 
        justifyContent:'space-around', 
        width:width 
    },
    btnQuestion:{
        width: width/2.5, 
        height:44, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8
    },
    lblQuestion:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'700'
    },
    lblThanks:{
        fontSize: getFontSize(24), 
        color: Colors.pink, 
        fontWeight:'700',
    }
})

export default Question;