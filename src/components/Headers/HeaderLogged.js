import React,{Children, useEffect,useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, RefreshControl } from "react-native";
import { Spinner } from "native-base";
import { StatusBar } from 'expo-status-bar';
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 


const {height, width} = Dimensions.get('window');


const HeaderLogged = ({children,isBack=false, title='Bienvenidos', onRefresh, refresh=false, goBack, noPadding=false}) => {
    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="transparent"
                color={Colors.white}
                style='light'
                hidden={false}
            />
            <View style={styles.header}>
                <View style={{flexDirection:'row', }}>
                     {isBack && <TouchableOpacity onPress={goBack}><AntDesign name="arrowleft" size={24} color={Colors.white} /></TouchableOpacity>}
                     <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.btnNotify}>
                    <>
                        <MaterialCommunityIcons name="bell" size={24} color="black" />
                        <View style={styles.counterNotify}>
                            <Text style={styles.lblCount}>3</Text>
                        </View>
                    
                    </>
                </TouchableOpacity>
            </View>
            <ScrollView
                
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} tintColor={Colors.blueGreen} />}
                keyboardShouldPersistTaps='handled'
                automaticallyAdjustKeyboardInsets
                nestedScrollEnabled={true}
                overScrollMode="always"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 20
                    
                }}>
                    <View style={{marginVertical:noPadding ? 0 : 20,}}>
                        {children}
                    </View>
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.lightGray
    },
    header:{
        width: width,
        height:110,
        backgroundColor: Colors.blueGreen,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        paddingTop:25
    },
    title:{
        color: Colors.darkWhite, 
        fontSize: getFontSize(26), 
        fontWeight:'600'
    },
    btnNotify:{
        backgroundColor: Colors.yellow, 
        width:40, 
        height:40, 
        borderRadius:20, 
        justifyContent:'center', 
        alignItems:'center',
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    counterNotify:{
        position:'absolute', 
        top:0, left:28, 
        backgroundColor: Colors.pink,
        width:22, height:22, 
        borderRadius:11, 
        justifyContent:'center', 
        alignItems:'center'
    },
    lblCount:{
        color: Colors.white,
        fontSize: getFontSize(13), 
        fontWeight:'700', 
    }

})

export default HeaderLogged;