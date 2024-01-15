import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import RateComponent from "./Rate";
import moment from "moment";

const {height, width} = Dimensions.get('window');

const ChargesItem = ({charge, index, lastItem, openModal}) => {
    
    const getTypeFuel = (type) => {
        let types = {
            'MAGNA': {type:'Magna', color: Colors.green},
            'PREMIUM': {type:'Premium', color: Colors.red},
            'DIESEL': {type:'Diesel', color: 'black'}
        }

        return(
            <View style={[styles.contType,{backgroundColor: types[type]?.color, }]}>
                <Text style={styles.lblType}>{types[type]?.type}</Text>
            </View>
        )
    }
    return(
        <View key={index} style={[styles.container,{borderBottomWidth: lastItem != index ? 0.5 : 0,}]}>
            <View style={{flexDirection:'row'}}>
                <View style={styles.card}>
                    <Text style={styles.lblNum}>{charge?.fuel_quantity}</Text>
                    <Text style={styles.lblLts}>Litros</Text>
                    <Text style={styles.lblPrice}>${charge?.unit_price} /lt</Text>
                </View>
                <View>
                    <Text style={styles.lblName}>{charge?.name}</Text>
                    <Text style={styles.lblDate}>{moment(charge?.fuel_datetime).format('MMMM DD')} • {moment(charge?.fuel_datetime).format('hh:mm A')}</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        {getTypeFuel(charge?.product_code)}
                        <View style={{marginLeft:11}}>
                            <Text style={styles.lblPayment}>MX$</Text>
                            <Text style={styles.lblPayment}>{charge?.total_paid}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.contRate}>
                {charge?.score != null ? (
                    <RateComponent rate={charge?.score}/>
                ) : (
                    <TouchableOpacity style={styles.btnRate} onPress={() => openModal(charge)}>
                        <Text style={styles.lblBtn}>Calificar</Text>
                    </TouchableOpacity>)}
                <Text style={styles.lblPoints}>+{charge?.points || 10}</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        paddingRight:10,
        borderBottomColor: Colors.borders,
        paddingVertical:12
    },
    card:{
        width:73, 
        height:71, 
        backgroundColor: Colors.white, 
        borderRadius:13, 
        borderWidth:1, 
        borderColor: Colors.borders, 
        justifyContent:'center', 
        alignItems:'center', 
        marginRight:10
    },
    lblNum:{
        color: Colors.greenStrong, 
        fontSize: getFontSize(25), 
        fontWeight:'800', 
        lineHeight:25,
    },
    lblLts:{
        color: Colors.greenStrong, 
        fontSize: getFontSize(16), 
        fontWeight:'600', 
        lineHeight:16 
    },
    lblPrice:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(11), 
        fontWeight:'600'
    },
    lblPayment:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(13), 
        fontWeight:'700'
    },
    lblName:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(16), 
        fontWeight:'700'
    },
    lblDate:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(13), 
        width: width/2.4,
        fontWeight:'400', 
        textTransform:'capitalize'
    },
    contRate:{
        alignItems:'center', 
        justifyContent:'space-between', 
        paddingBottom:10
    },
    btnRate:{
        width:95, 
        height:31, 
        backgroundColor: Colors.blueGreen, 
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    },
    lblPoints:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(16), 
        fontWeight:'700'
    },
    contType:{
        width:57, 
        height:18, 
        borderRadius:4, 
        justifyContent:'center', 
        alignItems:'center'
    },
    lblType:{
        color: Colors.white, 
        fontSize: getFontSize(10), 
        fontWeight:'600'
    }
})
export default ChargesItem;