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
                {question?.responses.map((item,index) => (
                    <TouchableOpacity 
                        key={index+1}
                        onPress={() => setValue(item.response)}
                        style={styles.btn}>
                            <View 
                                style={[styles.content,{
                                    borderColor: item?.response === value ? Colors.blueGreen : Colors.gray,
                                }]}
                            >

                                {item?.response === value && (
                                    <View
                                        style={styles.indicator}
                                    />
                                )}
                            </View>
                                <Text style={styles.lbl}>{item.response}</Text>
                    </TouchableOpacity>

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
    btn:{
        flexDirection:'row', 
        marginBottom:10, 
        alignItems:'center'
    },
    content:{
        width: 25,
        height: 25,
        borderRadius: 12.5,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator:{
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: Colors.blueGreen,
    },
    lbl:{
        marginLeft: 8, 
        fontSize: getFontSize(14), 
        fontWeight:'400'
    }
})

export default MultipleQuestion;