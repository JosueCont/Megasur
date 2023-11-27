import React, {useEffect, useState} from "react";
import { KeyboardAvoidingView, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Colors } from "../utils/Colors";

const KeyboardAvoidingCustom = ({children}) => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
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
    },[])
    return(
        <KeyboardAvoidingView 
            enabled={keyboardOpen}
            style={styles.contKeyAvoiding}  
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.select({ios: 150 }) }>
                <View onTouchStart={ Keyboard.dismiss}>
                    {children}
                </View>

        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    contKeyAvoiding:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
    },
})

export default KeyboardAvoidingCustom