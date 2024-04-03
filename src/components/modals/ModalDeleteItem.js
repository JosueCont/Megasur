import React,{useEffect,useState} from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { Spinner } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const ModalDeleteItem = ({visible, setVisible,  message, onSubmit}) => {
    const loading = useSelector(state => state.invoicingDuck.loading)
    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                <Image source={require('../../../assets/warning.png')} style={{width:80, height:76, resizeMode:'contain'}}/>
                <Text style={styles.message}>{message}</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.grayStrong,  marginRight:6}]} onPress={setVisible}>
                        <Text style={styles.txtBtn}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.blueGreen, }]} onPress={onSubmit}>
                        {loading ? <Spinner size={'sm'} color={Colors.white} /> :<Text style={styles.txtBtn}>Aceptar</Text>}
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
        width: width/1.3,
        //height: height/4,
        backgroundColor: Colors.lightGray,
        borderRadius:20,
        alignItems:'center',
        paddingVertical:20,
        paddingHorizontal:10
    },
    message:{
        marginBottom:18, 
        marginTop:15, 
        fontSize: getFontSize(16), 
        fontWeight:'700', 
        color: Colors.darkGray, 
        textAlign:'center'
    },
    btn:{
        width:120, 
        height:40, 
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center'
    },
    txtBtn:{
        fontSize: getFontSize(16), 
        fontWeight:'700', 
        color:Colors.white
    }

})

export default ModalDeleteItem;