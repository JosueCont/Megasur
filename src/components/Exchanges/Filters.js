import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, FlatList } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const Filters = ({filters, selected=null, setSelected}) => {
    return(
        <View>
            <View style={styles.container}>
                <FlatList 
                    data={filters}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToOffsets={[...Array(filters.length)].map((x, i) =>  width * i + 100)}
                    decelerationRate={0}
                    contentContainerStyle={{marginLeft:10}}
                    snapToAlignment="center"
                    renderItem={({item,index}) => (
                        <TouchableOpacity 
                            onPress={() => setSelected(item)}
                            key={index} style={[styles.item,{
                            borderWidth: selected?.id === item?.id ? 1 : 0,
                            borderColor: selected?.id === item?.id ? Colors.blueGreen : Colors.white
                            }]}>
                            <Text style={[styles.title,{ color: selected?.id === item?.id ? Colors.blueGreen : Colors.grayStrong}]}>{item?.name}</Text>
                        </TouchableOpacity>
                    )}
                />

            </View>
        
            <View style={{borderBottomColor: Colors.grayStrong, borderBottomWidth:0.6,}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:30, 
        marginTop:24, 
        width: width/1.1,
        marginBottom:10
    },
    item:{
        marginRight:18, 
        justifyContent:'center', 
        paddingVertical:3,
        paddingHorizontal:7,
        borderRadius:8
    },
    title:{
        fontSize: getFontSize(14), 
        fontWeight:'400'
    }
})

export default Filters;