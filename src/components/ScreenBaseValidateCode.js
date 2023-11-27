import React,{useEffect, useState} from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { StatusBar } from 'expo-status-bar';

import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import HeaderGreen from "../../assets/svg/HeaderGreen";
import { AntDesign } from '@expo/vector-icons'; 
import SMS from "../../assets/svg/SMS";

const {height, width} = Dimensions.get('window');


const ScreenBaseValidateCode = ({children, goBack}) => {
    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.green}
                style="light"
                hidden={false}
            />
             <TouchableOpacity onPress={goBack} style={styles.back}>
                    <AntDesign name="arrowleft" size={28} color={Colors.white} />
                </TouchableOpacity>
            <HeaderGreen>
                <View style={styles.contHeader}>
                    <View style={{alignSelf:'center', backgroundColor: Colors.green }}>
                        <SMS />

                    </View>
                    <Text style={styles.titleHeader}>Ingresar código de verificación</Text>
                </View>
            </HeaderGreen>
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
                    {children}
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
        //paddingTop:60,
        justifyContent:'center', 
        alignItems:'center',
        //backgroundColor:'red',
        height: '100%'
    },
    titleHeader:{
        textAlign:'center', 
        fontSize: getFontSize(24), 
        color: Colors.white, 
        marginTop:23, 
        fontWeight:'700'
    },
    back:{
        position:'absolute', 
        top:40, 
        left:24, zIndex:10
    },
})

export default ScreenBaseValidateCode;