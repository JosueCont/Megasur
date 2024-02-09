import React, {useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, TouchableHighlight, Dimensions, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Spinner, useToast, Alert, VStack, HStack, } from "native-base";
import { Colors } from "../../utils/Colors";
import HeaderGreen from '../../../assets/svg/HeaderGreen';
import { AntDesign } from '@expo/vector-icons'; 
import SMS from "../../../assets/svg/SMS";
import { useNavigation } from "@react-navigation/core";
import KeyboardAvoidingCustom from "../../components/KeyboardAvoidingCustom";
import ScreenBaseValidateCode from "../../components/ScreenBaseValidateCode";
import ModalAlertSuccess from "../../components/modals/AlertModalSucces";
import ModalAlertFailed from "../../components/modals/ModalAlertFail";
import { useDispatch, useSelector } from "react-redux";
import { updateVerificationCode, validateCode, changeModal, resetValidateCode, verifyPhoneNumber } from "../../store/ducks/authDuck";

const {height, width} = Dimensions.get('window');

const ValidateCodeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const verificationCode = useSelector(state => state.authDuck.verificationCode);
    const phone = useSelector(state => state.authDuck.phone)
    const modalAlertSuccess = useSelector(state => state.authDuck.modalSucces)
    const modalAlertFailed = useSelector(state => state.authDuck.modalFailed)
    const message = useSelector(state => state.authDuck.message)
    const loader = useSelector(state => state.authDuck.loading)
    const isLogged = useSelector(state => state.authDuck.isLogged)
    const dataUser = useSelector(state => state.authDuck.dataUser)
    const toast = useToast();

    const inputRefs = useRef([]);

    useEffect(() => {
        if(isLogged){
            toast.show({
                placement:'top',
                render:({id}) =>(
                    <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status='success' variant='solid' backgroundColor={Colors.green}>
                        <VStack space={1} flexShrink={1} w="100%" >
                            <HStack flexShrink={1} alignItems="center" justifyContent="space-between" >
                                <HStack space={2} flexShrink={1} alignItems="center">
                                    <Alert.Icon/>
                                    <Text style={{color: Colors.white, fontSize: getFontSize(17)}}>¡Bienvenido!</Text>
                                </HStack>
                            </HStack>
                            <Text style={{marginLeft:20, color: Colors.white}}>{dataUser?.first_name} {dataUser?.last_name}</Text>
                        </VStack>
                    </Alert>
                )
            })
        }
    },[isLogged])

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && index > 0 && !verificationCode[index]) {
          inputRefs.current[index - 1].focus();
        }
        
    };

    const renderCodeInputs = () => {
        const codeInputs = [];
        for (let i = 0; i < 5; i++){
            codeInputs.push(
                <TextInput
                  key={i}
                  textContentType='oneTimeCode'
                  autoComplete='sms-otp'
                  ref={(ref) => (inputRefs.current[i] = ref)}
                  style={styles.input}
                  maxLength={1}
                  keyboardType="number-pad"
                  returnKeyLabel="Hecho"
                  onChangeText={(value) => {
                    dispatch(updateVerificationCode(i,value))
                    if (value && inputRefs.current[i + 1]) {
                        inputRefs.current[i + 1].focus();
                    }
                  }/*handleCodeChange(i, value)*/}
                  onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(i, key)}
                  value={verificationCode[i] || ''}
                />
              );
        }
        return codeInputs
    }

    //const sendCode = () => {
    //    let success = true;
    //    if(success){
    //        setModalAlertSuccess(true)
    //        setMesagge('Verificación exitosa')
    //    }else{
    //        setModalAlertFailed(true)
    //        setMesagge('Código incorrecto')
    //    } 
    //}
    return(
        <ScreenBaseValidateCode 
            goBack={() => {
                dispatch(resetValidateCode())
                navigation.goBack()
            }}>

            <Text style={styles.subtitle}>Ingresa el código de verificación que enviamos.</Text>
            <View style={styles.validateCont}>{renderCodeInputs()}</View>
            <View style={styles.center}>
                <TouchableOpacity 
                    disabled={verificationCode.length < 5 }
                    style={[styles.btnValidate,{backgroundColor: verificationCode.length < 5 ? Colors.gray :Colors.blueGreen, }]} 
                    onPress={async() => await dispatch(validateCode({verificationCode, phone}))}>
                    {loader ? <Spinner size={'sm'} color={'white'} /> : <Text style={styles.txtValidate}>Verificar</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(verifyPhoneNumber(phone))}>
                    <Text style={styles.resend}>Reenviar código</Text>
                </TouchableOpacity>
            </View>
            <ModalAlertSuccess 
                visible={modalAlertSuccess}
                message={message}
                setVisible={() => {
                    //setModalAlertSuccess(false)
                    dispatch(changeModal({prop:'modalSucces',val:false}))

                    setTimeout(() => {
                        //navegar a la siguiente pantalla
                        navigation.navigate('Register')
                    },500)
                }}
            />
            <ModalAlertFailed 
                visible={modalAlertFailed}
                message={message}
                setVisible={() => {
                    //setModalAlertFailed(false)
                    dispatch(changeModal({prop:'modalFailed',val:false}))
                    setTimeout(() => {
                        //Volver a llamar a la funcion de verificar
                    },500)
                }}
            />
        </ScreenBaseValidateCode>
    )
}

const styles = StyleSheet.create({
    subtitle:{
        marginTop:60, 
        marginBottom:50, 
        textAlign:'center',
        fontSize: getFontSize(24), 
        fontWeight:'300', 
        width: width/1.7, 
        alignSelf:'center',
        color: Colors.darkGray
    },
    validateCont:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf:'center',
        width: width/1.3,
        marginBottom: 80,
    },
    input: {
        borderWidth: 1,
        borderRadius:8,
        borderColor: Colors.gray,
        backgroundColor: Colors.white,
        textAlign: 'center',
        fontSize: getFontSize(45),
        fontWeight:'300',
        color:Colors.darkGray,
        width: width/7,
        height:70,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    center:{
        alignItems:'center'
    },
    btnValidate:{
        width: width/1.2, 
        height: 44, 
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center', 
        marginBottom:30
    },
    txtValidate:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    },
    resend:{
        fontSize: getFontSize(16), 
        fontWeight:'300', 
        color: Colors.darkGray, 
        textDecorationLine:'underline'
    }
})

export default ValidateCodeScreen;