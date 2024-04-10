import React,{ useEffect,useState } from "react";
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../CustomInput";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import KeyboardAvoidingCustom from "../KeyboardAvoidingCustom";
import { AntDesign } from '@expo/vector-icons'; 
import { Spinner } from "native-base";


const {height, width} = Dimensions.get('window');

const ModalPhysicalCard = ({visible, setVisible, onSubmit, onChange}) => {
    const cardNumber = useSelector(state => state.redeemDuck.cardNumber)
    const loading = useSelector(state => state.redeemDuck.loading)


    const separateText = (cardText) => {
        const cleanedNumber = cardText.replace(/\D/g, '');
  
        // Dividir el número en bloques de 4 dígitos separados por un espacio
        const formattedNumber = cleanedNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

        return formattedNumber;
    }

    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <KeyboardAvoidingCustom isModal={true}>
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.contClose} onPress={setVisible}>
                            <AntDesign name="close" size={24} color={Colors.grayStrong} />
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <Text style={styles.lblTitle}>Canjear tarjeta física</Text>
                            <Text style={styles.lblDesc}>Para agregar puntos a su cuenta digital, introduzca los dígitos al reverso de la tarjeta física.</Text>
                            <Input 
                                placeholder='Ingresa el número de tu tarjeta'
                                maxLength={19}
                                autoCorrect={false}
                                keyboardType='number-pad'
                                returnKeyType='done'
                                autoCapitalize="none"
                                autoComplete="off"
                                value={separateText(cardNumber)}
                                setValue={(value) => onChange(value)}
                                //editable={false}
                                isLogged={true} 
                                style={styles.input}
                            />
                            <TouchableOpacity
                                disabled={!cardNumber != ''}
                                onPress={onSubmit} 
                                style={[styles.btn,{ backgroundColor: !cardNumber != ''  ? Colors.gray : Colors.blueGreen}]}>
                                {loading ? <Spinner size={'sm'} color={'white'} /> :<Text style={styles.lblBtn}>Canjear</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingCustom>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
    },
    card:{
        backgroundColor: Colors.white,
        borderRadius:15,
        width: width/1.1,
        paddingBottom:20,
        marginHorizontal:10,
    },
    contClose:{
        alignSelf:'flex-end', 
        backgroundColor: Colors.grayBorders, 
        borderTopEndRadius:15,  
        padding:4, marginBottom:5
    },
    input:{
        width: width *.7,
        height: 44,  
        borderRadius:8, 
        padding:7,
        borderColor:Colors.gray,
        borderWidth:1,
        marginBottom:20
    },
    content:{
        alignItems:'center', 
        paddingHorizontal:20
    },
    lblTitle:{
        color: Colors.darkGray, 
        fontSize: getFontSize(25), 
        fontWeight:'700', 
        marginBottom:15
    },
    lblDesc:{
        textAlign:'center', 
        color: Colors.grayStrong, 
        fontSize: getFontSize(13), 
        fontWeight:'400', 
        marginBottom:20
    },
    btn:{
        backgroundColor: Colors.blueGreen,  
        width: width*.7, 
        paddingVertical:13, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    }
})

export default ModalPhysicalCard