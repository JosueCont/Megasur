import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import HeaderGreen from "../../assets/svg/HeaderGreen";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import { StatusBar } from 'expo-status-bar';
import FuelLoader from "./FuelLoader";

const {height, width} = Dimensions.get('window');

const ScreenBaseRegister = ({children, changeSection,componentType, onsubmit}) => {
    //MAndar una variable isDisable para que identifique en cada componente si esta desabilitado el boton
    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.green}
                color={Colors.white}
                style="light"
                hidden={false}
            />
            <View style={{zIndex:10, backgroundColor: Colors.green, height:220}}>
                <View style={styles.contHeader}>
                    <Image source={require('../../assets/bienvenido.png')} style={styles.imgWelcome}/>
                </View>
            </View>
        
                <View style={styles.contImage}>
                    <Image source={require('../../assets/Station.jpg')} style={styles.img}  />
                </View>
            <ScrollView
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
            <FuelLoader withBorder={true} flow={componentType}/>
            <TouchableOpacity onPress={changeSection} style={styles.btnContinue}>
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
    contHeader:{
        paddingHorizontal:24, 
        justifyContent:'center', 
        alignItems:'center',
        height: '100%',
    },
    title:{
        fontSize: getFontSize(45),
        color: Colors.white,
        fontWeight:'800',
        textAlign:'center',
        marginHorizontal:20
    },
    imgWelcome:{
        height:70, 
        width: width, 
        resizeMode:'contain'
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
    contImage:{
        //width: width, 
        //aspectRatio: 428 / 350, 
        position:'relative', 
        bottom:60,
        width: width, 
        height:255, 
        zIndex:20,
    },
    img:{
        flex:1, 
        height:undefined, 
        width:undefined, 
        resizeMode:'stretch',
        borderTopLeftRadius:70,
        borderTopRightRadius:70,
    },
    btnContinue:{
        width: width/1.2, 
        height:44, 
        backgroundColor: Colors.green, 
        borderRadius:8, 
        alignSelf:'center', 
        justifyContent:'center', 
        alignItems:'center'
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