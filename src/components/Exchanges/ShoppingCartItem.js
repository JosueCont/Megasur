import React,{ useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";

const ShoppingItem = ({item, index}) => {
    return(
        <View style={{flexDirection:'row', marginBottom:12, }}>
            <View style={{width: 75, height: 75, borderRadius: 13, borderWidth: 0.5, borderColor: Colors.grayStrong, marginRight:10}}>
                <Image source={{uri: item?.image}} style={{flex:1, borderRadius:13, resizeMode:'contain'}}/>
            </View>
            <View style={{justifyContent:'space-evenly'}}>
                <Text style={{color: Colors.blueGreen, fontSize: getFontSize(16), fontWeight:'400'}}>{item?.name}</Text>
                <View style={styles.contCounter}>
                    <TouchableOpacity >
                        <Text style={[styles.lbl,{fontSize: getFontSize(20),}]}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.lblCount}>0</Text>
                    <TouchableOpacity >
                        <Text style={[styles.lbl,{ fontSize: getFontSize(20)}]}>+</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contCounter:{
        width: 120, 
        height:30,
        flexDirection:'row',
        borderWidth:1,
        borderColor: Colors.green,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:5
    },
    lblCount:{
        color: Colors.blueGreen,
        fontSize: getFontSize(13),
        fontWeight:'400'
    },
    lbl:{
        color: Colors.blueGreen, 
        fontWeight:'700'
    },
})

export default ShoppingItem;