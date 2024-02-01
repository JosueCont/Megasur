import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EmptyList = ({message}) => {
    return(
        <View style={styles.container}>
            <MaterialCommunityIcons name="package-variant" size={50} color={Colors.grayStrong} />
            <Text style={styles.lbl}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    lbl:{
        color: Colors.grayStrong,
        fontSize: getFontSize(18),
        fontWeight:'500',
        textAlign:'center'
    }
})

export default EmptyList;