import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import PendingItem from "./PendingItem";
import EmptyList from "./EmptyList";
import { useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const PendingList = ({pendingList, changeOrder}) => {
    const loader = useSelector(state => state.exchangeDuck.loading)
    return(
        <View style={styles.container}>
            {loader ? (
                <View>
                    {Array.from({length:3}).map((_,index) => (
                            <Skeleton key={index} lines={1} borderRadius={20} height={height/6} mb={2} backgroundColor={'gray.100'}/>
                    ))}
                </View>
            ) : pendingList.length > 0 ? pendingList.map((item,index) => (
                    <PendingItem item={item} index={index} pressed={changeOrder}/>
                ))
            :(
                <EmptyList message='No hay paquetes pendientes por mostrar'/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        //flexDirection:'row', 
        //flexWrap:'wrap', 
        //justifyContent:'space-between'
    }
})

export default PendingList;