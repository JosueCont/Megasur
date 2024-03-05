import React, {useEffect, useState} from "react";
import { KeyboardAvoidingView, Keyboard, Platform, StyleSheet, Dimensions, TouchableHighlight, View } from "react-native";
import { Colors } from "../utils/Colors";

const {height, width} = Dimensions.get('window');


const KeyboardAvoidingCustom = ({children,iosOffset=0, isModal=false, bottomModal=false, isRegister=false}) => {
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
            style={bottomModal ? styles.contAvoidinBottom :styles.contKeyAvoiding}  
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.select({ios: iosOffset }) }>
                {isRegister ? (
                    <View style={{flex:1}} onTouchEnd={() => keyboardOpen &&  Keyboard.dismiss()}>
                        {children}

                    </View>
                ):(
                    <TouchableHighlight onPress={() =>   Keyboard.dismiss() } underlayColor={Colors.white} style={isModal ? bottomModal ? styles.contentBottom : styles.contBtn : {}}>
                        {children}
                    </TouchableHighlight>
                )}

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
    },
    contentBottom:{
        borderRadius:15, 
        alignItems:'center'
    },
    contAvoidinBottom:{
        flex:1, 
        justifyContent:'flex-end',
        alignItems:'center',
    }
})

export default KeyboardAvoidingCustom