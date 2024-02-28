import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Radio } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";


const MultipleQuestion = ({question, value, setValue}) => {
    return(
        <View style={{flex:1, marginTop:10}}>
            <Text style={styles.question}>{question?.question}</Text>
            <View style={{marginHorizontal:25, marginTop:15}}>
                <Radio.Group
                    value={value}
                    onChange={(val) => {
                      setValue(val);
                    }}
                 name="optionMultiple">
                    {question?.responses.map((item,index) => (
                        <Radio key={index} value={item.response} my={2} >
                            {item?.response}
                        </Radio>
                    ))}
                </Radio.Group>
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

export default MultipleQuestion;