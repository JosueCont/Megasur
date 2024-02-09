import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import moment from "moment";
import ExchangeList from "./ExchangesList";
import { MaterialIcons } from '@expo/vector-icons';
import Progress from "../CustomProgress";
import { useNavigation } from "@react-navigation/native";

const DeliveredSelected = ({products, delivered}) => {
    return(
        <View>
            <Text style={styles.lblTitle}>Número de pedido: {delivered?.id}</Text>
            <Text style={styles.lblDate}>Fecha de recibido: <Text style={{fontWeight:'700'}}>{moment(delivered?.timestamp,).format('DD MMM YYYY')}</Text></Text>
            <ExchangeList data={products} showTitle={false} showActions={false}/>
        </View>
    )
}

const styles = StyleSheet.create({
    lblTitle:{
        color: Colors.blueGreen,
        fontSize: getFontSize(16),
        fontWeight:'800'
    },
    lblDate:{
        color: Colors.grayStrong,
        fontSize: getFontSize(12),
        fontWeight:'400',
        marginBottom:28
    },
})

export default DeliveredSelected;