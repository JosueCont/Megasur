import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Input from "../CustomInput";
import { Feather } from '@expo/vector-icons'; 


const {height, width} = Dimensions.get('window');

const PersonalInfoForm = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.lbl}>Nombre(s)</Text>
            <Input isLogged={true}/>
            <Text style={styles.lbl}>Apellidos(s)</Text>
            <Input isLogged={true}/>
            <Text style={styles.lbl}>Correo electrónico</Text>
            <Input isLogged={true}/>
            <Text style={styles.lbl}>Número celular (10 digitos)</Text>
            <Input isLogged={true}/>
            <Text style={styles.lbl}>Fecha de nacimiento</Text>
            <Input isLogged={true}/>
            <Text style={styles.lbl}>Género</Text>
            <Input isLogged={true}/>
            <Text style={styles.lbl}>Identificación oficial</Text>
            <View style={styles.contBt}>
                <TouchableOpacity style={[styles.btn,{marginRight:8}]}>
                    <Feather name="camera" size={40} color={Colors.gray} />
                    <Text style={styles.lblBtn}>Frente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Feather name="camera" size={40} color={Colors.gray} />
                    <Text style={styles.lblBtn}>Reverso</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnSave}>
                <Text style={styles.lblBtnSave}>Guardar</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center'
    },
    lbl:{
        fontSize:getFontSize(14), 
        color: Colors.grayStrong, 
        fontWeight:'400', 
        marginBottom:4,
        alignSelf:'flex-start',
        marginLeft:10,
        marginTop:7,
    },
    contBt:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginBottom:20
    },
    btn:{
        flex:1, 
        backgroundColor: Colors.white, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8, 
        paddingVertical:10,
    },
    lblBtn:{
        color: Colors.gray, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    },
    btnSave:{
        backgroundColor: Colors.blueGreen, 
        width: width/1.7, 
        paddingVertical:12, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8
    },
    lblBtnSave:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    }
})

export default PersonalInfoForm;