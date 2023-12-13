import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle, runOnJS,  interpolate, Extrapolate, withSpring } from "react-native-reanimated";
import { GestureHandlerRootView, GestureDetector, Gesture} from 'react-native-gesture-handler'
import LogoMega from "../../../assets/svg/LogoMega";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 



const {height, width} = Dimensions.get('window');

const FlipCard = () => {
    const [isFlipped, setFlip] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const tap = Gesture.Tap()
    
    const rotation = useSharedValue(0)
    const AnimatedImageBack = Animated.createAnimatedComponent(ImageBackground)

    const toggleFilp = () => {
        rotation.value = withTiming(
            isFlipped ? 0 : 180,
            {duration: 500, easing: Easing.ease},
            () => {
                //Despues de la animación se actualiza el estado
                runOnJS(setFlip)(!isFlipped);
            }
        )
    }

    const frontCardStyle = useAnimatedStyle(() => {
        return{
            transform: [{perspective:1000},{rotateY:`${rotation.value}deg`},]
        }
    });

    const backCardStyle = useAnimatedStyle(() => {
        return{
            transform: [ {perspective:1000},{rotateY: `${rotation.value + 180}deg`}, {scaleX: -1},]
        }
    })

    const opacitySelect = useAnimatedStyle(() => {
        const inputRange = [0,50, 100,160]
        const rotationOutputRange = [1,0,0,1]
        const opacityAnimate = interpolate(
            rotation.value,
            inputRange,
            rotationOutputRange,
            Extrapolate.CLAMP
        );

        const inputRangeBack = [180,100, 50,0]
        const rotationOutputRangeBack = [1,1,0,1]
        const opacityAnimateBack = interpolate(
            rotation.value,
            inputRangeBack,
            rotationOutputRangeBack,
            Extrapolate.CLAMP
        );
        return{
            opacity: !isFlipped ? withSpring(opacityAnimateBack) :  withSpring(opacityAnimate)
        }
    })
    return(
        <>
            <GestureHandlerRootView>
                <GestureDetector
                    gesture={tap.onStart(() => toggleFilp())}
                    >
                        {isFlipped ? (
                            <Animated.View style={[ backCardStyle ,styles.card]}>
                                <ImageBackground 
                                        source={require('../../../assets/CardBackGround.png')} 
                                        resizeMode='contain'
                                        style={styles.imgBack}>
                                            <Animated.View style={opacitySelect}>
                                                <TouchableOpacity>
                                                    <AntDesign name="arrowleft" size={24} color={Colors.white} />

                                                </TouchableOpacity>
                                                <View style={styles.contQr}>
                                                    <AntDesign name="qrcode" size={130} color={Colors.white} />
                                                    <Text style={{color: Colors.white}}>Código valido</Text>
                                                    <Text style={{color: Colors.white}}>Durante: 00:00 min</Text>
                                                </View>
                                            </Animated.View>
                                </ImageBackground>

                            </Animated.View>

                        ) : (
                            <Animated.View style={[frontCardStyle,styles.card,{ transform:[{scaleY:1}]}]}>
                                <ImageBackground 
                                        source={require('../../../assets/CardBackGround.png')} 
                                        resizeMode='contain'
                                        style={styles.imgBack}>
                                            <Animated.View style={opacitySelect}>
                                                <View style={{marginBottom:20}}>
                                                    <LogoMega />
                                                </View>
                                                <View style={styles.contDes}>
                                                    <View style={{width: width/1.5,}}>
                                                        <Text style={styles.lblname}>Josué Francisco Contreras Flores</Text>
                                                        <Text style={styles.lbl}>Cuentas con: <Text style={styles.lblPoints}>1200 pts</Text></Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => console.log('pressed')}>
                                                        <MaterialCommunityIcons name="qrcode-scan" size={50} color={Colors.white} />

                                                    </TouchableOpacity>
                                                </View>

                                            </Animated.View>
                                </ImageBackground>

                            </Animated.View>

                        )}
                </GestureDetector>
                
            </GestureHandlerRootView>
        
        </>
    )
}

const styles = StyleSheet.create({
    card:{
        width: width/1.1, 
        height:250, 
        alignSelf:'center'
    },
    imgBack:{
        flex:1,
        paddingHorizontal:20, 
        paddingVertical:30
    },
    contQr:{
        justifyContent:'center', 
        alignItems:'center'
    },
    contDes:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    lblname:{
        fontSize: getFontSize(16), 
        color: Colors.white, 
        fontWeight:'700', 
        marginBottom:3
    },
    lbl:{
        fontSize: getFontSize(12), 
        color: Colors.white, 
        fontWeight:'300'
    },
    lblPoints:{
        fontSize: getFontSize(16), 
        fontWeight:'800'
    }
})

export default FlipCard;