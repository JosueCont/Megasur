import React,{useEffect,useState} from "react";
import { View, Text, ImageBackground, Image, Dimensions, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, Platform } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import LogoSvg from "../../../assets/svg/Logo";
import M from "../../../assets/svg/M";
import E from "../../../assets/svg/E";
import G from "../../../assets/svg/G";
import A from "../../../assets/svg/A";
import S from "../../../assets/svg/S";
import U from "../../../assets/svg/U";
import R from "../../../assets/svg/R";
import Animated,{ useAnimatedStyle,withSpring, withTiming,useSharedValue, Extrapolate, interpolate } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/core";

const {height, width} = Dimensions.get('window');

const InitialScreen = () => {
    const navigation = useNavigation()
    const isExpanded = useSharedValue(false);
    const [isPressed, setPressed] = useState(false)
    const [keyboardOpen, setKeyboardOpen] = useState(false);

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
                {translateY: withSpring(isExpanded.value ? height/4.8 : 0)},
            ],
        }
    },[] )
    const opacity = useAnimatedStyle(() => {
        const inputRange = [0,0.5,1]
        const opacityOutputRange = [0,0.5,1]
        const opacityAnimate = interpolate(
            isExpanded.value,
            inputRange,
            opacityOutputRange,
            Extrapolate.CLAMP
        );
        return{
            opacity: opacityAnimate
        }
    })

    const validateEmail = () => {
        navigation.navigate('ValidateCode')
    }
    return(
        <ImageBackground source={require('../../../assets/loginBkGnd.jpg')} style={styles.container}>
           {/*<View style={styles.overlay}/>*/}
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
            
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent:'center', 
        //alignItems:'center'
    },
    contKeyAvoiding:{
        flex:1, 
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
        height: height/5
    },
    lblEmail:{
        textAlign:'center', 
        fontSize:getFontSize(20), 
        color: Colors.white, 
        marginBottom:20,
        marginHorizontal:15
    },
    btn:{
        width: width/1.8, 
        height:56, 
        backgroundColor:Colors.yellow, 
        borderRadius:8, 
        justifyContent:'center',
        alignItems:'center'
    },
    lblBtn:{
        fontSize: getFontSize(16), color: Colors.darkGray, fontWeight:'700'
    },
    input:{
        width: width/1.15, 
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
})

export default InitialScreen;