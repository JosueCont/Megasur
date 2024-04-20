import React,{useEffect,useState} from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { Colors } from "../../utils/Colors";
import Check from '../../../assets/svg/Check'
import { getFontSize } from "../../utils/functions";

const {height, width} = Dimensions.get('window');

const ModalDownload = ({visible, setVisible, onSubmit}) => {
    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.contTitle}>
                        <Text style={styles.lblTitle}>Formas de descargas</Text>
                    </View>
                    <Text>Selecciona el formato deseado para la descarga.</Text>
                    <View style={styles.contActions}>
                        <TouchableOpacity onPress={setVisible}>
                            <Image source={require('../../../assets/pdf.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={setVisible}>
                            <Image source={require('../../../assets/xml.png')} style={styles.img}/>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={styles.btn} onPress={setVisible}>
                        <Text style={styles.lblBtn}>Cerrar</Text>
                    </TouchableOpacity>
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
    contTitle:{
        paddingBottom:4, 
        borderBottomWidth: 2, 
        borderBottomColor: Colors.borders, 
        marginBottom:10
    },
    lblTitle:{
        color: Colors.darkGray, 
        fontSize: getFontSize(15), 
        fontWeight:'700'
    },
    contActions:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        width:130, 
        marginVertical: 15
    },
    img:{
        width: 50, 
        height:50, 
        resizeMode:'contain'
    },
    btn:{
        width: width*.7,
        height: 40,
        borderRadius:10,
        backgroundColor: Colors.blueGreen,
        justifyContent:'center',
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white,
        fontSize: getFontSize(14),
        fontWeight:'400'
    }
})

export default ModalDownload;