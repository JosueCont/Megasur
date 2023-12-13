import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";

const {height, width} = Dimensions.get('window');

const ListPromotionItem = ({item,index}) => {
    return(
        <View style={styles.card}>
            <Image source={item.image} style={styles.img}/>
            <View style={{width: width/2.5,marginLeft:8}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width: width/1.2, 
        height:160, 
        backgroundColor: Colors.white, 
        borderRadius:8, 
        marginRight:10, 
        marginTop:8,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        marginBottom:5,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 2,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    title:{
        textAlign:'center', 
        marginBottom:8, 
        color: Colors.blueGreen, 
        fontSize: getFontSize(16), 
        fontWeight:'700'
    },
    desc:{
        textAlign:'center', 
        fontSize: getFontSize(13), 
        fontWeight:'400', 
        color: Colors.grayStrong
    },
    img:{
        width:120, 
        height:130, 
        resizeMode:'contain'
    }
})

export default ListPromotionItem;