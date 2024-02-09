import React,{useEffect,useState} from "react";
import {  Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Modal } from "react-native";
import { Colors } from "../../utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import { getFontSize } from "../../utils/functions";
import { AntDesign } from '@expo/vector-icons'; 
import QRCode from "react-native-qrcode-svg";
import { getQrCodeFuel } from "../../store/ducks/exchangeDuck";
import { Spinner } from "native-base";



const {height, width} = Dimensions.get('window');


const ModalExchangeFuel = ({visible, setVisible, onConfirm}) => {
    const dispatch = useDispatch()
    const minutes = useSelector(state => state.exchangeDuck.minutes)
    const seconds = useSelector(state => state.exchangeDuck.seconds)
    const isRunning = useSelector(state => state.exchangeDuck.isRunning)
    const code = useSelector(state => state.exchangeDuck.code)
    const user = useSelector(state => state.authDuck.dataUser)
    const loader = useSelector(state => state.exchangeDuck.loading)

    useEffect(() => {
        if(!isRunning && seconds === 0 && minutes === 0 && visible){
            dispatch(getQrCodeFuel({isRunning, user }))
        }
    },[isRunning, seconds, minutes, visible])

    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.contClose} onPress={setVisible}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Muestra este código QR al despachador para pagar con puntos</Text>
                    {!loader && code != '' ? (
                        <QRCode
                            value={code}
                            color={Colors.blackInit}
                            size={170}
                            backgroundColor="transparent"
                        />

                    ) : <Spinner size='sm' color={Colors.blueGreen}/> }
                    <TouchableOpacity style={styles.btn} onPress={onConfirm}>
                        <Text style={styles.lblBtn}>Confirmar transacción</Text>
                    </TouchableOpacity>
                    <Text style={styles.lblTimer}>Código QR expira en: <Text style={{fontWeight:'700'}}>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} {minutes <= 0 ? 'segundos' : 'minutos'}</Text></Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        width: width * .9,
        //height: height/4,
        backgroundColor: Colors.white,
        borderRadius:20,
        alignItems:'center',
        paddingVertical:20,
        paddingHorizontal:10,
    },
    title:{
        color: Colors.grayStrong,
        width: width * .5,
        textAlign:'center',
        fontSize: getFontSize(16),
        fontWeight:'300',
        marginBottom:15
    },
    contClose:{
        position:'absolute',
        top:0,
        right:0, 
        backgroundColor: Colors.gray, 
        borderTopEndRadius:15,  
        padding:4, marginBottom:5
    },
    btn:{
        width: width * 0.8,
        paddingVertical:14,
        backgroundColor: Colors.blueGreen,
        borderRadius:8,
        marginTop:15,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
    lblBtn:{
        color: Colors.white,
        fontSize: getFontSize(16),
        fontWeight:'400'
    },
    lblTimer:{
        color: Colors.grayStrong,
        fontSize: getFontSize(15),
        fontWeight:'400'
    }
})

export default ModalExchangeFuel