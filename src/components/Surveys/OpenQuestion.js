import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from "react-native";
import { TextArea } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { changeInputHome } from "../../store/ducks/homeDuck";

const {height, width} = Dimensions.get('window');

const OpenQuestion = ({question}) => {
    const dispatch = useDispatch()
    const comment = useSelector(state => state.homeDuck.comment)

    return(
        <View>
            <Text style={styles.question}>{question?.question}</Text>
            <TextArea 
                w={width/1.1}
                h={140}
                borderRadius={5}
                backgroundColor={Colors.white}
                marginTop={3}
                alignSelf={'center'}
                //marginX={3}
                marginBottom={5}
                shadow={{
                    elevation:4,
                    shadowColor: '#000', // Color de la sombra
                    shadowOffset: {
                        width: 0,  
                        height: 4,
                    },
                    shadowOpacity: 0.25, 
                    shadowRadius: 4, 
                }}
                
                value={comment}
                onChangeText={(val) => dispatch(changeInputHome({prop:'comment', val}))}
            />
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

export default OpenQuestion;