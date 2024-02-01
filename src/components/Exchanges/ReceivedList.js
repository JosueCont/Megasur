import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import DeliveredItem from "./ReceivedItem";

const {height, width} = Dimensions.get('window');

const DeliveredList = ({deliveredList, changeOrder}) => {
    return(
        <View style={styles.container}>
            {deliveredList.map((item,index) => (
                <DeliveredItem item={item} index={index} pressed={changeOrder}/>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        flexWrap:'wrap', 
        justifyContent:'space-between'
    }
})

export default DeliveredList;