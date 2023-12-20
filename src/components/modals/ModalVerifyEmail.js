import React,{useEffect,useState} from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { Colors } from "../../utils/Colors";
import Check from '../../../assets/svg/Check'
import { getFontSize } from "../../utils/functions";
import CodeInputs from "../CodeInputs";

const {height, width} = Dimensions.get('window');

const ModalVerifyEmail = ({visible, onClose, onVerify }) => {
    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={require('../../../assets/questionMark.png')} style={styles.img}/>
                    <Text style={styles.lblDesc}>Ingresa el código de verificación que enviamos a tu correo.</Text>
                    <CodeInputs />
                    <View style={styles.contBtn}>
                        <TouchableOpacity onPress={onClose}style={[styles.btn,{backgroundColor: Colors.grayStrong}]}>
                            <Text style={styles.lblBtn}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{backgroundColor: Colors.blueGreen}]}>
                            <Text style={styles.lblBtn}>Verificar</Text>
                        </TouchableOpacity>
                    </View>
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
        width: width/1.2,
        //height: height/4,
        backgroundColor: Colors.lightGray,
        borderRadius:20,
        alignItems:'center',
        paddingVertical:20
    },
    img:{
        width:60, 
        height:60, 
        resizeMode:'contain'
    },
    lblDesc:{
        width: width/1.6, 
        textAlign:'center', 
        marginTop:17, 
        marginBottom:10
    },
    contBtn:{
        flexDirection:'row',
        justifyContent:'space-between' ,
        width: width/1.7, 
        marginTop:20
    },
    btn:{
        width: width/4, 
        height:40,  
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    }
})

export default ModalVerifyEmail;