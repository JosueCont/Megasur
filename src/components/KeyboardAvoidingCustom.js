import React, {useEffect, useState} from "react";
import { KeyboardAvoidingView, Keyboard, Platform, StyleSheet, Dimensions, TouchableHighlight } from "react-native";
import { Colors } from "../utils/Colors";

const {height, width} = Dimensions.get('window');


const KeyboardAvoidingCustom = ({children,iosOffset=0, isModal=false}) => {
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
            keyboardVerticalOffset={Platform.select({ios: iosOffset }) }>
                <TouchableHighlight onPress={() =>   Keyboard.dismiss() } underlayColor={Colors.white} style={isModal ? styles.contBtn : {}}>
                    {children}
                </TouchableHighlight>

        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    contKeyAvoiding:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
    },
    contBtn:{
        width: width/1.1, 
        borderRadius:15, 
        alignItems:'center'
    }
})

export default KeyboardAvoidingCustom