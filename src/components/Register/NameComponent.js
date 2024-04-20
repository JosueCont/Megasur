import React,{useState,useEffect} from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import Input from "../CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { changeInput } from "../../store/ducks/authDuck";

const {height, width} = Dimensions.get('window');

const NameComponent = () => {
    const dispatch = useDispatch();
    const name = useSelector(state => state.authDuck.name)
    const lastName = useSelector(state => state.authDuck.lastName)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Escribe tu nombre completo</Text>
            <View style={styles.contForm}>
                <Text style={styles.lbl}>Nombre(s)</Text>
                <Input value={name} onChangeText={(value) => dispatch(changeInput({prop:'name',value})) }/>
                <Text style={[styles.lbl,{marginTop:13}]}>Apellido(s)</Text>
                <Input value={lastName} onChangeText={(value) => dispatch(changeInput({prop:'lastName',value})) }/>
            </View>
            <View style={{ width: width/1.2}}>
                <Text style={styles.legend}>Queremos saludarte por tu nombre cuando nos visites.</Text>
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
        color: Colors.darkGray
    },
    contForm:{
        alignSelf:'flex-start', 
        marginLeft:25, 
        marginTop:20, 
        marginBottom:40
    },
    lbl:{
        fontSize:getFontSize(14), 
        color: Colors.grayStrong, 
        fontWeight:'400', 
        marginBottom:4
    },
    legend:{
        fontSize: getFontSize(14), 
        fontWeight:'400', 
        textAlign:'center'
    }
})

export default NameComponent;