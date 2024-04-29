import React,{useEffect,useState} from "react";
import {  Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Modal, Permission, PermissionsAndroid, Platform, Alert, Linking } from "react-native";
import { Colors } from "../../utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import { getFontSize } from "../../utils/functions";
import { AntDesign } from '@expo/vector-icons'; 
import QRCode from "react-native-qrcode-svg";
import { cleanFuelQr, getQrCodeFuel, getQrExchangeFuel, onLoading } from "../../store/ducks/exchangeDuck";
import { Spinner } from "native-base";
import { getPermissionLocation } from "../../utils/functions";
import {PermissionStatus} from 'expo-location'
import * as Location from 'expo-location'


const {height, width} = Dimensions.get('window');


const ModalExchangeFuel = ({visible, setVisible, onConfirm, typeFuel, totalFuel}) => {
    const dispatch = useDispatch()
    const minutes = useSelector(state => state.exchangeDuck.minutes)
    const seconds = useSelector(state => state.exchangeDuck.seconds)
    const isRunning = useSelector(state => state.exchangeDuck.isRunning)
    const code = useSelector(state => state.exchangeDuck.code)
    const user = useSelector(state => state.authDuck.dataUser)
    const loader = useSelector(state => state.exchangeDuck.loading)
    const userCard = useSelector(state => state.authDuck.cardsStorage)
    const message = useSelector(state => state.exchangeDuck.message)
    const [isAllowed, setIsAllowed]  = useState(false)

    const types = {
        0: 'MAGNA',
        1: 'PREMIUM',
        2: 'DIESEL'
    }

    useEffect(() => {
        (async() => {
            if(user?.id && visible){
                dispatch(onLoading())
                const location = await getPermissionLocation();
                if(location?.coords && location != undefined){
                    await dispatch(getQrExchangeFuel({
                        cardId: userCard[0]?.user_card_id,
                        latitude: location?.coords?.latitude,
                        longitude: location?.coords?.longitude,
                        total_fuel: totalFuel,
                        type: types[typeFuel]
                    }))
                    setIsAllowed(true)
                }else{
                    console.log('sin permisos')
                    setIsAllowed(false)
                    dispatch(cleanFuelQr())
                }
            } 

        })()
    },[user?.id, visible])

    const showPermissionsAndroid = async() => {
        try {          
            const permision = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Megasur solicita permiso para ubicación',
                    message: 'Los datos proporcionados serán utilizados exclusivamente para validar la sucursal de canje y garantizar la seguridad en la generación de códigos en dicha sucursal.',
                    //buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                });
             if(permision === PermissionsAndroid.RESULTS.GRANTED){
                setVisible()
             }
            //const location = await getPermissionLocation();
        } catch (e) {
            console.log('error permisions',e)
        }
    }

    const showPermissionsIos = async() => {
        const permisison = await Location.requestForegroundPermissionsAsync()
        if(permisison.status === 'denied') {
            setVisible()
            setTimeout(() => {
                Alert.alert(
                    "Permisos denegados",
                    "Para permitir acceso a tu ubicación, abre configuración y acepta los permisos.",
                    [
                      { text: "Cancelar", style: "cancel" },
                      {
                        text: "Abrir configuración",
                        onPress: () => {
                          Linking.openURL("app-settings:");
                        }
                      }
                    ]
                  );
            }, 500)
        }
        console.log('permisos ios', permisison)
    }

    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.contClose} onPress={setVisible}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    {code != null && <Text style={styles.title}>Muestra este código QR al despachador para pagar con puntos.</Text>}
                    {!loader ?
                        code != null && isAllowed ? (
                            <QRCode
                                value={code}
                                color={Colors.blackInit}
                                size={170}
                                backgroundColor="transparent"
                            />

                        ):(
                            <Text style={styles.title}>{message}</Text>

                    ): <Spinner size='sm' color={Colors.blueGreen}/> }
                    {!isAllowed && code === null && !loader &&(
                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={() => Platform.OS === 'ios' ? showPermissionsIos() : showPermissionsAndroid()}>
                            <Text style={styles.lblBtn}>Solicitar permisos</Text>
                        </TouchableOpacity>
                    )}
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