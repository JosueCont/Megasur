import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { Ionicons } from '@expo/vector-icons';
import SurveyItem from "../Surveys/SurveysItem";


const {height, width} = Dimensions.get('window');

const AnsweredSurveyList = ({surveys}) => {
    return(
        <View>
            {surveys.length > 0 ? surveys.map((item,index) => (
                <View key={index}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <View style={styles.line}/>
                    {item?.surveys.map((item,index) => (
                        <SurveyItem item={item} index={index} isAnswered={true}/>
                    ))}
                </View>
            )): (
                <View style={styles.contEmpty}>
                    <Ionicons name="file-tray-sharp" size={44} color={Colors.blueGreen} />
                    <Text style={styles.lbl}>No has contestado encuestas</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(20), 
        fontWeight:'700', 
        textTransform:'capitalize',
        marginBottom:5
    },
    line:{
        borderBottomWidth:0.8, 
        borderBottomColor: Colors.grayStrong,
        marginBottom:20
    },
    lbl:{
        color: Colors.grayStrong,
        fontSize: getFontSize(16),
        fontWeight:'400'
    },
    contEmpty:{
        height: height/2, 
        justifyContent:'center', 
        alignItems:'center',
    }
})

export default AnsweredSurveyList;