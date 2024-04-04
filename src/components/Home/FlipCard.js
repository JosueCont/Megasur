import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground} from "react-native";
import { Spinner } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle, runOnJS,  interpolate, Extrapolate, withSpring } from "react-native-reanimated";
import { GestureHandlerRootView, GestureDetector, Gesture} from 'react-native-gesture-handler'
import LogoMega from "../../../assets/svg/LogoMega";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from "react-redux";
import { getQrCode, autoGenerateQr, changeModalHome } from "../../store/ducks/homeDuck";
import QRCode from "react-native-qrcode-svg";
import * as ScreenCapture from 'expo-screen-capture'
import * as MediaLibrary from 'expo-media-library';


const {height, width} = Dimensions.get('window');

const FlipCard = ({cards, points =0}) => {
    const dispatch = useDispatch();
    const [isFlipped, setFlip] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const tap = Gesture.Tap()

    const isRunning = useSelector(state => state.homeDuck.isRunning)
    const minutes = useSelector(state => state.homeDuck.minutes)
    const seconds = useSelector(state => state.homeDuck.seconds)
    const code = useSelector(state => state.homeDuck.code)
    const loader = useSelector(state => state.homeDuck.loading)
    const timer = useSelector(state => state.homeDuck.setupData?.expire_time_qr)
    
    const rotation = useSharedValue(0)
    const AnimatedImageBack = Animated.createAnimatedComponent(ImageBackground)

    const user = useSelector(state => state.authDuck.dataUser)

    useEffect(() => {
        if(!isRunning && seconds === 0 && minutes === 0 && isFlipped){
            dispatch(getQrCode({isRunning, user, cards, timer}))
        }
    },[seconds, isRunning, isFlipped, minutes])

    useEffect(() => {
        if(isFlipped){
            if(hasPermissions()){
                const subscription = ScreenCapture.addScreenshotListener(() => {
                    console.log('Mostrar modal de captuta de pantalla')
                    dispatch(changeModalHome({prop:'modalScreenShot', val: true}))
                    //setModal(true)
                });
                return () => subscription.remove();
    
            }
        }
    },[isFlipped])

    const hasPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === 'granted';
    };

    const toggleFilp = () => {
        if(user?.id && cards != null){
            rotation.value = withTiming(
                isFlipped ? 0 : 180,
                {duration: 500, easing: Easing.ease},
                () => {
                    //Despues de la animación se actualiza el estado
                    runOnJS(setFlip)(!isFlipped);
                }
            )

        }else console.log('no se puede girar')
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
        const inputRange = [0,50,179,180]
        const rotationOutputRange = [0,0,0,1]
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
        //console.log('rotation',rotation.value, 'filp',isFlipped)
        return{
            opacity: !isFlipped ? withSpring(opacityAnimateBack) :  withSpring(opacityAnimate)
        }
    })
    return(
        <>
            
            {isFlipped ? (
                <Animated.View style={[ backCardStyle ,styles.card]}>
                    <ImageBackground 
                            source={require('../../../assets/CardBackGround.png')} 
                            resizeMode='contain'
                            style={styles.imgBack}>
                                <Animated.View style={opacitySelect}>
                                        <GestureHandlerRootView>
                                            <GestureDetector gesture={tap.onStart(() => toggleFilp())}>
                                                <TouchableOpacity>
                                                    <AntDesign name="arrowleft" size={24} color={Colors.white} />
                                                </TouchableOpacity>
                                            </GestureDetector>
                                        </GestureHandlerRootView>
                                    <View style={styles.contQr}>
                                        {code != '' && !loader ? (
                                            <>
                                                <QRCode
                                                    value={code}
                                                    color={Colors.white}
                                                    size={130}
                                                    backgroundColor="transparent"
                                                />
                                                <Text style={{color: Colors.white, marginTop:5}}>Código válido</Text>
                                                <Text style={{color: Colors.white}}>durante: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} {minutes <= 0 ? 'segundos' : 'minutos'}</Text>
                                            
                                            </>

                                        ): (
                                            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                                                <Spinner size={'sm'} color={Colors.white} />
                                            </View>

                                        )}
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
                                            <Text style={styles.lblname}>{user?.first_name} {user?.last_name}</Text>
                                            <Text style={styles.lbl}>Cuentas con: <Text style={styles.lblPoints}>{points.toString()} puntos</Text></Text>
                                        </View>
                                            <GestureHandlerRootView>
                                                <GestureDetector gesture={tap.onStart(() => toggleFilp())}>
                                                    <TouchableOpacity disabled={user?.id && cards != null ? false : true} onPress={() => dispatch(autoGenerateQr())}>
                                                        <MaterialCommunityIcons name="qrcode-scan" size={50} color={Colors.white} />
                                                    </TouchableOpacity>
                                                </GestureDetector>
                                            </GestureHandlerRootView>

                                    </View>

                                </Animated.View>
                    </ImageBackground>

                </Animated.View>

            )}
              
        
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