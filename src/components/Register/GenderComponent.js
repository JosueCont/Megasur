import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Input from "../CustomInput";
import {Select} from 'native-base'
import { useDispatch, useSelector } from "react-redux";
import { changeInput } from "../../store/ducks/authDuck";

const {height, width} = Dimensions.get('window');

const GenderComponent = () => {
    const dispatch = useDispatch();
    const gender = useSelector(state => state.authDuck.gender)
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Elige tu género, ¡queremos personalizar tu experiencia!</Text>
            <Text style={styles.lbl}>Género</Text>
            <View style={styles.input}>
                <Select
                    onValueChange={(value) => dispatch(changeInput({prop:'gender', value}))}
                    borderWidth={0}
                    placeholder="Escoge tu genero"
                    style={{}}>
                        <Select.Item value="MALE" label="Masculino"/>
                        <Select.Item value="FEMALE" label="Femenino"/>
                    </Select>

            </View>
            <View style={{ width: width/1.4}}>
                <Text style={styles.legend}>Conocer tu género nos permite ofrecerte productos relevantes.</Text>
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
    input:{
        backgroundColor: Colors.white,
        width:width/1.13, 
        height: 50,  
        borderRadius:8, 
        padding:7,
        borderColor:Colors.gray,
        borderWidth:1
        //elevation:4,
        //shadowColor: '#000', // Color de la sombra
        //shadowOffset: {
        //  width: 0,  
        //  height: 4,
        //},
        //shadowOpacity: 0.25, 
        //shadowRadius: 4, 
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
export default GenderComponent;