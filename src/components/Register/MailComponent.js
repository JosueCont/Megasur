import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Input from "../CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { changeInput } from "../../store/ducks/authDuck";

const {height, width} = Dimensions.get('window');

const MailComponent = () => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.authDuck.email)
    const isValid = useSelector(state => state.authDuck.isEmailValid)
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Genial, ¿cuál es tu correo electrónico?</Text>
            <Text style={styles.lbl}>Correo electrónico</Text>
            <Input 
                value={email} 
                onChangeText={(value) => dispatch(changeInput({prop:'email',value}))} 
                autoCapitalize="none"
                autoComplete="off"/>
            {email != '' && !isValid && <Text style={{color: Colors.red, marginTop:10, fontSize: getFontSize(16), }}>El email es invalido</Text>}
            <View style={{ width: width/1.4}}>
                <Text style={styles.legend}>¡Gracias por confiar en nosotros!Te prometemos no enviarte spam.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    title:{
        fontSize: getFontSize(24),
        fontWeight:'400',
        color: Colors.darkGray,
        textAlign:'center',
        marginBottom:60
    },
    legend:{
        fontSize: getFontSize(14),
        fontWeight:'400',
        textAlign:'center',
        marginTop:50
    },
    lbl:{
        fontSize:getFontSize(14), 
        color: Colors.grayStrong, 
        fontWeight:'400', 
        marginBottom:4,
        alignSelf:'flex-start',
        marginLeft:25
    },
})
export default MailComponent;