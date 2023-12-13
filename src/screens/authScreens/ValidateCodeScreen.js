import React, {useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, TouchableHighlight, Dimensions, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { getFontSize } from "../../utils/functions";
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
import { updateVerificationCode } from "../../store/ducks/authDuck";

const {height, width} = Dimensions.get('window');

const ValidateCodeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const verificationCode = useSelector(state => state.authDuck.verificationCode);
    //const [verificationCode, setVerificationCode] = useState('');
    const [modalAlertSuccess, setModalAlertSuccess] = useState(false)
    const [modalAlertFailed, setModalAlertFailed] = useState(false)
    const [message, setMesagge] = useState('');

    //const [keyboardOpen, setKeyboardOpen] = useState(false);

    const inputRefs = useRef([]);

    /*useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', () => {
            setKeyboardOpen(true);
            //setAnimationScroll()
          });
      
          const keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardOpen(false);
          });
      
          return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
          };
    },[])*/

    //const handleCodeChange = (index, value) => {
    //    setVerificationCode((prevCode) => {
    //      const newCode = [...prevCode];
    //      newCode[index] = value;
    //      return newCode.join('');
    //    });
    //
    //    if (value && inputRefs.current[index + 1]) {
    //      inputRefs.current[index + 1].focus();
    //    }
    //};

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && index > 0 && !verificationCode[index]) {
          inputRefs.current[index - 1].focus();
        }
        
    };

    const renderCodeInputs = () => {
        const codeInputs = [];
        for (let i = 0; i < 4; i++){
            codeInputs.push(
                <TextInput
                  key={i}
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

    const sendCode = () => {
        let success = true;
        if(success){
            setModalAlertSuccess(true)
            setMesagge('Verificación exitosa')
        }else{
            setModalAlertFailed(true)
            setMesagge('Código incorrecto')
        } 
    }
    return(
        <ScreenBaseValidateCode goBack={() => navigation.goBack()}>

            <Text style={styles.subtitle}>Ingresa el código de verificación que enviamos.</Text>
            <View style={styles.validateCont}>{renderCodeInputs()}</View>
            <View style={styles.center}>
                <TouchableOpacity 
                    disabled={verificationCode.length < 4 }
                    style={[styles.btnValidate,{backgroundColor: verificationCode.length < 4 ? Colors.gray :Colors.blueGreen, }]} 
                    onPress={() => sendCode()}>
                    <Text style={styles.txtValidate}>Verificar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.resend}>Reenviar código</Text>
                </TouchableOpacity>
            </View>
            <ModalAlertSuccess 
                visible={modalAlertSuccess}
                message={message}
                setVisible={() => {
                    setModalAlertSuccess(false)
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
                    setModalAlertFailed(false)
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