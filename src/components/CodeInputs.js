import React, {useEffect, useState, useRef} from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateVerificationCode } from "../store/ducks/authDuck";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import { updateCodeEmail } from "../store/ducks/profileDuck";

const {height, width} = Dimensions.get('window');


const CodeInputs = ({type = 'number-pad', validationType='auth'}) => {
    const dispatch = useDispatch();
    const verificationCode = useSelector(state => validationType === 'auth' ? state.authDuck.verificationCode : state.profileDuck.code);

    const inputRefs = useRef([]);

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && index > 0 && !verificationCode[index]) {
          inputRefs.current[index - 1].focus();
        }
        
    };

    const renderInputs = () => {
        const codeInputs = [];
        for (let i = 0; i < 4; i++){
            codeInputs.push(
                <TextInput
                  key={i}
                  ref={(ref) => (inputRefs.current[i] = ref)}
                  style={styles.input}
                  maxLength={1}
                  keyboardType={type}
                  returnKeyType='done'
                  returnKeyLabel="Hecho"
                  onChangeText={(value) => {
                    validationType === 'auth' ? dispatch(updateVerificationCode(i,value)) : dispatch(updateCodeEmail(i,value))
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

    return <View style={styles.container}>{renderInputs()}</View>
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf:'center',
        width: width/1.6,
        //marginBottom: 80,
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
        width: width/8,
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
})

export default CodeInputs;