import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import ListDiscountItem from "./ListDiscountItem";

const {height, width} = Dimensions.get('window');

const ListDiscount = ({dataDisconunt}) => {

    return(
        <View style={{marginLeft:20, marginBottom:25}}>
            <Text style={styles.title}>Promociones</Text>
            <FlatList 
                data={dataDisconunt}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft:10}}
                //snapToOffsets={[...Array(dataDisconunt.length)].map((x, i) =>  width * i + width/1.37)}
                //decelerationRate={0}
                snapToAlignment="center"
                renderItem={({item,index}) => item?.is_active && (
                    <ListDiscountItem item={item} index={index}/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize: getFontSize(18),
        fontWeight:'700',
        color: Colors.grayStrong
    }
})

export default ListDiscount;