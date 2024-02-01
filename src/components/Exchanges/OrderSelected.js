import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import moment from "moment";
import ExchangeList from "./ExchangesList";
import { MaterialIcons } from '@expo/vector-icons';
import Progress from "../CustomProgress";
import { useNavigation } from "@react-navigation/native";
import PendingItem from "./PendingItem";

const {height, width} = Dimensions.get('window');

const OrderSelected = ({orderData, products}) => {
    const navigation = useNavigation();

    return(
        <View>
            {/*<Text style={styles.lblTitle}>Número de pedido: {orderData?.id}</Text>
            <Text style={styles.lblDate}>Fecha estimada de entrega: <Text style={{fontWeight:'700'}}>{moment(orderData?.timestamp,).format('DD MMM YYYY')}</Text></Text>*/}
            <PendingItem item={orderData} isDisable={true}/>
            
            <ExchangeList data={products} showTitle={false} showActions={false}/>
            <View style={styles.contLocation}>
                <Image source={require('../../../assets/location.png')}/>
                <TouchableOpacity onPress={() => navigation.navigate('LocationBranch',)}>
                    <Text style={styles.lblLocation}>Ver ubicación de la estación</Text>            
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    contLocation:{
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center'
    },
    lblLocation:{
        color: Colors.grayV3, 
        fontSize: getFontSize(18), 
        fontWeight:'400', 
        textDecorationLine:'underline', 
        marginLeft:10
    }
})

export default OrderSelected;