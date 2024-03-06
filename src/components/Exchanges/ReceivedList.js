import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import DeliveredItem from "./ReceivedItem";
import EmptyList from "./EmptyList";
import { useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const DeliveredList = ({deliveredList, changeOrder}) => {
    const loader = useSelector(state => state.exchangeDuck.loading)

    return(
        <View style={styles.container}>
            {loader ? (
                <View style={styles.contSkeleton}>
                    {Array.from({length:4}).map((_,index) => (
                            <Skeleton key={index} lines={1} borderRadius={20} width={width/2.4} height={height*.3} mb={2} backgroundColor={'gray.100'}/>
                    ))}
                </View>
            ): deliveredList.length > 0 ? deliveredList.map((item,index) => (
                    <DeliveredItem item={item} index={index} pressed={changeOrder}/>
                ))
            :(
                <EmptyList message='No has recibido paquetes'/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        flexWrap:'wrap', 
        justifyContent:'space-between'
    },
    contSkeleton:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        flexWrap:'wrap'
    }
})

export default DeliveredList;