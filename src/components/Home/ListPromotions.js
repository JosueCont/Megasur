import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import ListPromotionItem from "./ListPromotionItem";

const {height, width} = Dimensions.get('window');

const ListPromotions = ({dataPromotion}) => {


    return(
        <View style={{marginLeft:20, marginBottom:25}}>
            <Text style={styles.title}>Anuncios</Text>
            <FlatList 
                data={dataPromotion}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft:10}}
                //snapToOffsets={[...Array(dataPromotion.length)].map((x, i) =>  width * i + width/1.2)}
                //decelerationRate={0}
                snapToAlignment="center"
                renderItem={({item,index}) => item?.is_active && (
                    <ListPromotionItem item={item} index={index}/>
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

export default ListPromotions;