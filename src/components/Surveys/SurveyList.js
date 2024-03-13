import React, {useEffect,} from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import SurveyItem from "./SurveysItem";

const SurveyList = ({surveys, onSelectedSurvey}) => {
    const loader = useSelector(state => state.homeDuck.loading)
    return(
        <View>
            <Text style={styles.title}>Disponibles</Text>
            <View style={[styles.line,]}/>
            {!loader ? 
                surveys.length > 0 && surveys.map((item,index) => (
                    item?.questions.length > 0 && <SurveyItem item={item} index={index} onSelectedSurvey={(val) => onSelectedSurvey(val)}/>
                ))
            :(
                <View><Text>Cargando</Text></View>
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
    },
    line:{
        borderBottomWidth:0.8, 
        borderBottomColor: Colors.grayStrong,
        marginBottom:20
    }
})

export default SurveyList;