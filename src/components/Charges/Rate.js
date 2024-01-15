import React,{useState} from "react";
import { View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from "../../utils/Colors";

const RateComponent = ({rate}) => {

    const renderStars = () => {
        let stars=[];
        for(let i=0; i<5; i++){
            stars.push(i)
        }

        return stars.map((_,index) => (
            <FontAwesome name="star" size={15} color={index < rate ? Colors.yellow : Colors.gray} />
        ))
    }
    return(
        <View style={{flexDirection:'row'}}>
            {renderStars()}
        </View>
    )
}

export default RateComponent;