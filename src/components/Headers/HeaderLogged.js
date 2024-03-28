import React,{Children, useEffect,useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, RefreshControl } from "react-native";
import { Spinner } from "native-base";
import { StatusBar } from 'expo-status-bar';
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');


const HeaderLogged = ({children,isBack=false, title='Bienvenidos', onRefresh, refresh=false, goBack, noPadding=false, showSubtitle=false, bgColor=Colors.white}) => {
    const navigation = useNavigation()
    const badge = useSelector(state => state.notificationsDuck.badge)
    return(
        <View style={[styles.container,{backgroundColor: bgColor}]}>
            <StatusBar
                animated={true}
                backgroundColor="transparent"
                color={Colors.white}
                style='light'
                hidden={false}
            />
            <View style={styles.header}>
                <View style={{flexDirection:'row', alignItems:'center' }}>
                     {isBack && <TouchableOpacity style={{marginRight:5}} onPress={goBack}><AntDesign name="arrowleft" size={24} color={Colors.white} /></TouchableOpacity>}
                     <View>
                        <TouchableOpacity
                            disabled={!isBack}
                            onPress={goBack}>
                            <Text style={styles.title}>{title}</Text>
                        </TouchableOpacity>
                        {showSubtitle && <Text style={styles.lblSubtitle}>Para eliminar un mensaje, deslícelo a la izquierda</Text>}
                     </View>
                </View>
                {!showSubtitle && <TouchableOpacity style={styles.btnNotify} onPress={() => navigation.navigate('Notification') }>
                    <>
                        <MaterialCommunityIcons name="bell" size={24} color="black" />
                        {badge > 0 && <View style={styles.counterNotify}>
                            <Text style={styles.lblCount}>{badge > 9 ? '9+' : badge}</Text>
                        </View>}
                    
                    </>
                </TouchableOpacity>}
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
                    <View style={{marginVertical:noPadding ? 0 : 20, flex:1}}>
                        {children}
                    </View>
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
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
    },
    lblSubtitle:{
        color: Colors.white,
        fontSize: getFontSize(11),
        fontWeight:'500'
    }

})

export default HeaderLogged;