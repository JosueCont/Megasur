import React,{useEffect,useState} from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { Colors } from "../../utils/Colors";
import Check from '../../../assets/svg/Check'
import { getFontSize } from "../../utils/functions";
import CodeInputs from "../CodeInputs";
import { useSelector } from "react-redux";
import { Spinner } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { useSharedValue } from "react-native-reanimated";

const {height, width} = Dimensions.get('window');


const ModalLocation = ({visible, onClose, station, loading, isOpen}) => {
    useEffect(() => {
        //console.log('station',station)
    },[station])

    return(
        <>
            {visible ? (
                <View style={[styles.container,]}>
                    <View style={styles.card}>
                        {loading ? (
                                <View style={styles.contSpinner}>
                                    <Spinner size={'sm'} color={Colors.blueGreen} />
                                </View>
                        ):(
                            <>
                                <TouchableOpacity style={styles.contClose} onPress={onClose}>
                                    <AntDesign name="close" size={24} color={Colors.blueGreen} />
                                </TouchableOpacity>
                                <Text style={styles.lblStation}>{station?.franchise?.name}</Text>
                                <Text style={styles.lblname}>{station?.name}</Text>
                                <Text style={styles.lblStation}>{station?.company?.name}</Text>
                                <Text style={styles.lblAddress}>{station?.address}</Text>
                                {station?.distance && <View style={styles.contKm}>
                                    <Text>{Math.floor(station?.distance) === 0 ? `${(Math.round(station?.distance*1000)).toString()} mtrs` : `${Math.round(station?.distance).toString()} km`}</Text>
                                </View>}
                            </>

                        )}
                    </View>
                </View>) : null}

        </>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        position:'absolute',
        bottom:-10, //isopen -30
        //flex:1, 
        //alignSelf:'flex-end',
        //alignItems:'center'
    },
    card:{
        width: width,
        height: height/2.6,
        backgroundColor: Colors.white,
        padding:12
    },
    contClose:{
        alignSelf:'flex-end',
    },
    contSpinner:{
        justifyContent:'center', 
        alignItems:'center', 
        flex:1
    },
    lblStation:{
        fontSize: getFontSize(15), 
        fontWeight:'300', 
        color: Colors.grayStrong
    },
    lblname:{
        fontSize: getFontSize(20), 
        fontWeight:'600', 
        color: Colors.darkGray,
        marginVertical:5
    },
    lblAddress:{
        marginTop:10, 
        fontSize: getFontSize(15), 
        fontWeight:'500'
    },
    contKm:{
        borderWidth:1, 
        width:80, 
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:15, 
        borderRadius:5
    }
})

export default ModalLocation;