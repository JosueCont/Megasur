import React,{useEffect,useState, useRef} from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Spinner } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { StatusBar } from 'expo-status-bar';
import { Video } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { changeModal, loginAction } from "../../store/ducks/authDuck";
import LottieView from 'lottie-react-native'

const {height, width} = Dimensions.get('window');

const RegisterDone = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authDuck.dataUser)
    const loader = useSelector(state => state.authDuck.loading)
    const completeRegister = useSelector(state => state.authDuck.completeRegister)
    const animation = useRef(null);


    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.lightGray}
                color={Colors.white}
                style="dark"
                hidden={false}
            />
            <View style={{height: height/3, width: width}}>
                {!completeRegister ? (
                    <Video  
                        source={require('../../../assets/confeti.mp4')}
                        style={{width: width, height: height/3,}}
                        useNativeControls={false}
                        resizeMode="cover"
                        isLooping
                        shouldPlay
                        isMuted
                    />
                ):(
                    <LottieView
                        autoPlay
                        resizeMode="cover"
                        ref={animation}
                        style={{
                            flex:1,
                            backgroundColor: 'white',
                        }}
                        source={require('./../../../assets/Coins.json')}
                    />
                )}
            </View>
            <Text style={styles.title}>¡Gracias!</Text>
            <View style={styles.contLegend}>
                <Text style={styles.legend}>Estás oficialmente listo para desbloquear un mundo de recompensas y ahorros. ¡Vamos a empezar!</Text>
            </View>
            <TouchableOpacity 
                style={styles.btn} 
                disabled={completeRegister}
                onPress={() => {
                    dispatch(changeModal({prop:'completeRegister', val: true}))
                    setTimeout(() => {
                        dispatch(loginAction(user))
                    },10000)
                }}>
                {loader ? <Spinner size={'sm'} color={'white'} /> :<Text style={styles.lblBtn}>Continuar</Text>}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Colors.white
    },
    title:{
        fontSize: getFontSize(73),
        fontWeight: '800',
        color: Colors.green,
        marginBottom:100
    },
    contLegend:{
        width: width/1.2, 
        marginBottom:30
    },
    legend:{
        fontSize: getFontSize(24), 
        fontWeight:'400', 
        color: Colors.darkGray, 
        textAlign:'center'
    },
    btn:{
        width: width/1.2, 
        height:44, 
        backgroundColor: Colors.blueGreen, 
        borderRadius:8, 
        alignSelf:'center', 
        justifyContent:'center', 
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    }
})

export default RegisterDone;