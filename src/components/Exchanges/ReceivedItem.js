import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import moment from "moment";

const {height, width} = Dimensions.get('window');

const DeliveredItem = ({item,index, pressed}) => {
    return(
        <TouchableOpacity style={styles.card} onPress={() => pressed(item)}>
            <Image source={require('../../../assets/box.png')}/>
            <Text style={styles.title}>Número de pedido: {item?.id}</Text>
            <Text style={styles.subtitle}>Fecha de entregado:</Text>
            <Text style={[styles.subtitle, {fontWeight:'700'}]}>{moment(item?.timestamp, ).format('DD MMM YYYY')}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width: width/2.4,
        //height: 225,
        backgroundColor: Colors.white,
        borderRadius:13,
        marginBottom:16,
        alignItems:'center',
        padding:5
    },
    title:{
        color: Colors.blueGreen,
        fontSize: getFontSize(14),
        fontWeight:'800',
        textAlign:'center',
        marginBottom:10
    },
    subtitle:{
        color: Colors.grayStrong,
        fontSize: getFontSize(10),
        fontWeight:'400'
    }
})

export default DeliveredItem;