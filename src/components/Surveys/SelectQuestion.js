import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Checkbox } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";


const SelectQuestion = ({question, value,setGroupValues }) => {
    return(
        <View>
            <Text style={styles.question}>{question?.question}</Text>
            <View style={{marginHorizontal:25, marginTop:15}}>
                    {question?.responses.map((item,index) => (
                        <Checkbox 
                            onChange={(val) => setGroupValues(item)}
                            value={item.response} 
                            my={2} 
                            key={index}>
                            {item.response}
                        </Checkbox>
                    ))}
               
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    question:{
        textAlign:'center', 
        fontSize: getFontSize(17), 
        color: Colors.blueGreen
    },
})

export default SelectQuestion;