import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import PendingItem from "./PendingItem";

const {height, width} = Dimensions.get('window');

const PendingList = ({pendingList, changeOrder}) => {
    return(
        <View style={styles.container}>
            {pendingList.map((item,index) => (
                <PendingItem item={item} index={index} pressed={changeOrder}/>
            ))}
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