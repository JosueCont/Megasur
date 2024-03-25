import React from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";

const {height, width} = Dimensions.get('window');

const ModalScreenShot = ({visible, setVisible}) => {
    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        <View style={styles.contImage}>
                            <Image source={require('../../../assets/LogoMegaCard.png')} style={styles.logo}/>
                        </View>
                        <Text style={styles.title}>Captura de pantalla detectada</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Ionicons name="alert-circle" size={100} color={Colors.red} /> 
                        <Text style={styles.lblWarning}>¡Atención!</Text>   
                        <Text style={styles.desc}>
                            Por su seguridad, no se permiten capturas de pantalla a los códigos QR de la aplicación. 
                            Le recomendamos borrar la captura de su dispositivo móvil cuanto antes. Gracias.
                        </Text>
                        <TouchableOpacity 
                            onPress={setVisible}
                            style={styles.btn}>
                            <Text style={styles.lblBtn}>Entendido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.8)', 
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        width: width * .9,
        paddingVertical:14,
        backgroundColor: Colors.white, 
        //alignItems:'center', 
        borderRadius:15, 
        paddingHorizontal:10,
        padding:12
    },
    logo:{
        width:70, 
        height:30, 
        resizeMode:'contain'
    },
    contImage:{
        width:50, 
        height:50, 
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center', 
        backgroundColor:Colors.white,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    title:{
        color: Colors.darkGray,
        fontSize: getFontSize(16),
        fontWeight:'700',
        marginLeft:10
    },
    lblWarning:{
        color: Colors.blueGreen,
        fontSize: getFontSize(20),
        fontWeight:'700',
        marginBottom:15
    },
    desc:{
        textAlign:'center',
        color: Colors.grayStrong,
        fontSize: getFontSize(15),
        fontWeight:'400',
        //marginBottom:15
    },
    btn:{
        paddingVertical:15, 
        paddingHorizontal:50, 
        backgroundColor: Colors.blueGreen, 
        borderRadius:8, 
        marginVertical:20
    },
    lblBtn:{
        color: Colors.white,
        fontSize: getFontSize(14),
        fontWeight:'400'
    }
})

export default ModalScreenShot;