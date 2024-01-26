import React, { useState, useRef} from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";

const {height, width} = Dimensions.get('window');


const SliderGallery = ({gallery}) => {

    const [currentIndex,setCurrentIndex]=useState(0);

    const change = useRef(item => {
        setCurrentIndex(item?.viewableItems[0]?.index);
    })
    return(
        <View style={{flex:1}}>
            <FlatList 
                horizontal
                pagingEnabled
                data={gallery} 
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item, index}) => (
                    <View  key={index} style={{flex:1}}>
                        <Image source={{uri: item.image}} style={styles.img}/>
                    </View>
                )}
                viewabilityConfig={{viewAreaCoveragePercentThreshold: 50,}}
                onViewableItemsChanged={ change.current }
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.contMarkers}>
                <Text style={{color: Colors.white}}>{currentIndex+1}/{gallery.length}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        width: width, 
        height:230, 
        resizeMode: 'contain'
    },
    contMarkers:{
        backgroundColor:Colors.blackInit, 
        position:'absolute',
        bottom:10, 
        right:10, 
        borderRadius:7, 
        padding:4
    }
})

export default SliderGallery;