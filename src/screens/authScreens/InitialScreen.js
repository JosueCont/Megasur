import React,{useEffect,useState} from "react";
import { View, Text, ImageBackground, Image, Dimensions, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, Platform } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import HeaderInit from "../../../assets/svg/HeaderInit";
import Animated,{ useAnimatedStyle,withSpring, withTiming,useSharedValue, Extrapolate, interpolate } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/core";
import LogoMega from "../../../assets/svg/LogoMega";
import { useDispatch, useSelector } from "react-redux";
import { changeInput, changeModal, verifyPhoneNumber } from "../../store/ducks/authDuck";
import { Spinner } from "native-base";
import ModalAlertFailed from "../../components/modals/ModalAlertFail";

const {height, width} = Dimensions.get('window');

const InitialScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const isExpanded = useSharedValue(false);
    const [isPressed, setPressed] = useState(false)
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const phone = useSelector(state => state.authDuck.phone)
    const isValidPhone = useSelector(state => state.authDuck.isValidPhoneNumber)
    const loader = useSelector(state => state.authDuck.loading)
    const isActiveModal = useSelector(state => state.authDuck.modalFailed)
    const message = useSelector(state => state.authDuck.message)

    useEffect(() => {
        if(isValidPhone){
            setTimeout(() => {
                navigation.navigate('ValidateCode')
            },500)
        }
    },[isValidPhone])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', () => {
            setKeyboardOpen(true);
            //setAnimationScroll()
          });
      
          const keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardOpen(false);
          });
      
          return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
          };
    },[])




    const toggleAnimation = () => {
        isExpanded.value = !isExpanded.value; 
        setTimeout(() => {
            setPressed(isExpanded.value)

        },200)
    };


    const rStyle = useAnimatedStyle(() => {
        return{
            transform:[
                {translateY: withSpring(isExpanded.value ? 40 : 0,{duration:2000})},
            ],
        }
    },[] )
    const opacity = useAnimatedStyle(() => {
        const inputRange = [40,20,10,0]
        const opacityOutputRange = [0,0,0.3,1]
        const opacityAnimate = interpolate(
            isExpanded.value,
            inputRange,
            opacityOutputRange,
            Extrapolate.CLAMP
        );
        return{
            opacity: withTiming(opacityAnimate, {duration:2000}),
            //height: withSpring(150)
        }
    })

    const validatePhone = async() => {
        await dispatch(verifyPhoneNumber(phone))
            //navigation.navigate('ValidateCode')
    }

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView 
                enabled={keyboardOpen}
                style={styles.contKeyAvoiding}  
                contentContainerStyle={Platform.OS === 'android' &&  keyboardOpen ? styles.contentProc : null}
                behavior={Platform.OS === 'ios' ? 'padding' : 'position' }
                keyboardVerticalOffset={Platform.select({ios: 430, android:50 }) }>
            <View style={styles.contHeader}>
                <Image source={require('../../../assets/WaterWaves.png')} style={styles.imgBack}/>
                {/*<HeaderInit />*/}
                <View style={styles.contLogo}>
                    <LogoMega />
                </View>
            </View>
                <Animated.View style={[rStyle,styles.contEmail]}>
                    {isPressed ? (
                        <Animated.View style={[opacity,styles.contPressed]}>
                            <Text style={styles.lblEmail}>Por favor, escriba los 10 dígitos de su número telefónico:</Text>
                            <TextInput 
                                style={styles.input} 
                                keyboardType="number-pad" 
                                returnKeyType="done"
                                maxLength={10}
                                value={phone}
                                onChangeText={(value) => dispatch(changeInput({prop:'phone', value}))}
                            />
                        </Animated.View>
                    ): null}
                    <TouchableOpacity 
                        disabled={(isPressed && phone === '') ? true : false}
                        style={[styles.btn,{backgroundColor: isPressed && phone === '' ? Colors.gray : Colors.blueGreen }]} 
                        onPress={() => isPressed ? validatePhone() : toggleAnimation()}>
                        {loader ? <Spinner size={'sm'} color={'white'} /> : <Text style={styles.lblBtn}>{isPressed  ? 'Enviar' : 'Iniciar sesión'}</Text>}
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>

            <ModalAlertFailed 
                visible={isActiveModal} 
                setVisible={() => dispatch(changeModal({prop:'modalFailed', val:false}))}
                message={message}
                titleBtn="Entendido"
            />

            {/*<ImageBackground source={require('../../../assets/loginBkGnd.jpg')} style={styles.container}>
               <View style={styles.overlay}/>
                <KeyboardAvoidingView 
                    enabled={keyboardOpen}
                    style={styles.contKeyAvoiding}  
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.select({ios: 100 }) }>
                    <LogoSvg />
                    <View style={styles.contTitle}>
                        <M />
                        <E />
                        <G />
                        <A />
                        <S />
                        <U />
                        <R />
                    </View>
                    <Animated.View style={[rStyle,styles.contEmail]}>
                        {isPressed ? (
                            <Animated.View style={[opacity,{justifyContent:'center', alignItems:'center'}]}>
                                <Text style={styles.lblEmail}>Por favor, escriba los 10 dígitos de su número telefónico:</Text>
                                <TextInput style={styles.input} keyboardType="number-pad" returnKeyType="done"/>
                            </Animated.View>
                        ): null}
                        <TouchableOpacity style={styles.btn} onPress={() => isPressed ? validateEmail() : toggleAnimation()}>
                            <Text style={styles.lblBtn}>{isPressed  ? 'Enviar' : 'Iniciar sesión'}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </KeyboardAvoidingView>
                
                        </ImageBackground>*/}
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.white
        //justifyContent:'center', 
        //alignItems:'center'
    },
    contKeyAvoiding:{
        //flex:1, 
        justifyContent:'center',
        alignItems:'center'
    },
    contTitle:{
        flexDirection:'row', 
        //marginBottom:40, 
        marginTop:13
    },
    contEmail:{
        justifyContent:'center',
        alignItems:'center', 
        height:200
        //height: height/5
    },
    lblEmail:{
        textAlign:'center', 
        fontSize:getFontSize(20), 
        color: Colors.blackInit, 
        marginBottom:20,
        marginHorizontal:15
    },
    btn:{
        width: width/1.8, 
        height:56, 
        borderRadius:8, 
        justifyContent:'center',
        alignItems:'center'
    },
    lblBtn:{
        fontSize: getFontSize(16), color: Colors.white, fontWeight:'700'
    },
    input:{
        width: width/2, 
        height:56, 
        backgroundColor:Colors.white, 
        borderRadius:8, 
        marginBottom:40,
        padding:12,
        elevation:4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(22,104,56, 0.8)', 
    },
    contHeader:{
        alignItems:'center', 
        marginBottom:50,
    },
    imgBack:{
        width: width, 
        height:350, 
        resizeMode:'stretch'
    },
    contLogo:{
        backgroundColor: Colors.white, 
        width: 210, 
        height:210, 
        borderRadius:105,
        position:'absolute', 
        top: 240, 
        alignItems:'center', 
        justifyContent:'center'
    },
    contPressed:{
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:15
    },
    contentProc:{
        flex:1,
    }
})

export default InitialScreen;