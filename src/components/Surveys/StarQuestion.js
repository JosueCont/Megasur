import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import RateStars from "../RateStars";

const StarQuestion = ({question, starRating, setStar}) => {
    return(
        <View>
            <Text style={styles.question}>{question?.question}</Text>
            <RateStars starRating={starRating} setStar={(val) => setStar(val)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    question:{
        textAlign:'center', 
        fontSize: getFontSize(17), 
        color: Colors.blueGreen,
        marginBottom:50
    },
})

export default StarQuestion;