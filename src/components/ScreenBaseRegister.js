import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import HeaderGreen from "../../assets/svg/HeaderGreen";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import { StatusBar } from 'expo-status-bar';
import FuelLoader from "./FuelLoader";
import LogoMega from "../../assets/svg/LogoMega";

const {height, width} = Dimensions.get('window');

const ScreenBaseRegister = ({children, changeSection,componentType, onsubmit, isDisabled,scrollViewRef}) => {
    //MAndar una variable isDisable para que identifique en cada componente si esta desabilitado el boton

    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="transparent"
                color={Colors.white}
                style='light'
                hidden={false}
            />
            <Image source={require('../../assets/waves.png')} style={{width: width, height: 130, resizeMode:'stretch'}}/>
            <View style={{alignItems:'center', marginVertical:20}}>
                <LogoMega />
            </View>
            <Text style={{fontSize: getFontSize(40), color: Colors.blackInit, textAlign:'center', fontWeight:'800', marginBottom:10}}>¡Bienvenido!</Text>
            <ScrollView
                ref={scrollViewRef}
                keyboardShouldPersistTaps='handled'
                automaticallyAdjustKeyboardInsets
                nestedScrollEnabled={true}
                overScrollMode="always"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom:20
                    
                }}>
            <View style={{marginBottom:20}}>
                {children}
            </View>
            <FuelLoader withBorder={true} flow={componentType} color={Colors.orange}/>
            <TouchableOpacity onPress={changeSection} style={[styles.btnContinue,{backgroundColor: isDisabled ? Colors.gray : Colors.blueGreen,}]} disabled={isDisabled}>
                <Text style={styles.lblContinue}>Continuar</Text>
            </TouchableOpacity>
            {componentType === 3 || componentType === 4  ? (
                <TouchableOpacity onPress={onsubmit} style={styles.btnSubmit}>
                    <Text style={styles.lblSubmit}>Omitir</Text>
                </TouchableOpacity> ):null}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.lightGray
    },
    title:{
        fontSize: getFontSize(45),
        color: Colors.white,
        fontWeight:'800',
        textAlign:'center',
        marginHorizontal:20
    },
    contPoint:{
        flexDirection:'row', 
        width: width/2.5, 
        justifyContent:'space-between',
    },
    contTitle:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center'
    },
    btnContinue:{
        width: width/1.2, 
        height:44,  
        borderRadius:8, 
        alignSelf:'center', 
        justifyContent:'center', 
        alignItems:'center',
        marginTop:20
    },
    lblContinue:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    },
    btnSubmit:{
        alignItems:'center', 
        marginTop:17
    },
    lblSubmit:{
        fontSize: getFontSize(18), 
        fontWeight:'400', 
        color: Colors.darkGray, 
        textDecorationLine:'underline'
    }

})

export default ScreenBaseRegister;