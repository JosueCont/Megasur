import React,{useEffect,useState} from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { Colors } from "../../utils/Colors";
import Check from '../../../assets/svg/Check'
import { getFontSize } from "../../utils/functions";

const {height, width} = Dimensions.get('window');

const ModalDeleteAccount = ({visible, setVisible, onSubmit}) => {
    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={require('../../../assets/warning.png')} style={styles.img}/>
                    <Text style={styles.message}>¿Está seguro que quiere borrar su cuenta?</Text>
                    <View style={styles.contBtns}>
                        <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.grayStrong,}]} onPress={setVisible}>
                            <Text style={styles.txtBtn}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.blueGreen,}]} onPress={onSubmit}>
                            <Text style={styles.txtBtn}>Adelante</Text>
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
        width:80, 
        height:80, 
        resizeMode:'contain'
    },
    message:{
        marginBottom:18, 
        marginTop:15, 
        paddingHorizontal:10,
        fontSize: getFontSize(16), 
        fontWeight:'700', 
        color: Colors.blackInit, 
        textAlign:'center'
    },
    contBtns:{
        flexDirection:'row', 
        justifyContent:'space-between' ,
        width: width/1.7
    },
    btn:{
        width: width/4, 
        height:40,  
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center'
    },
    txtBtn:{
        fontSize: getFontSize(16), 
        fontWeight:'400', 
        color:Colors.white
    }

})

export default ModalDeleteAccount;