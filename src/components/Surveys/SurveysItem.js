import React, {useEffect,} from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import moment from "moment";

const {height, width} = Dimensions.get('window');


const SurveyItem = ({item, index, onSelectedSurvey, isAnswered=false}) => {
    return(
        <TouchableOpacity style={styles.card} key={index} onPress={() => isAnswered ? console.log('pressed') : onSelectedSurvey(item)}>
            <View style={styles.contHeader}>
                <View style={styles.contTitle}>
                    <View style={styles.contIcon}>
                        <FontAwesome5 name="clipboard-list" size={20} color={Colors.blueGreen} />
                    </View>
                    <Text style={styles.lblTitle}>{isAnswered ? item?.poll?.name : item?.name}</Text>
                    
                </View>
                <Text style={styles.lblBonus}>{isAnswered ? '+'+item?.poll?.bonus_points.toString() : item?.bonus_points.toString()} pts.</Text>
            </View>
            <Text style={styles.lblDesc} ellipsizeMode='tail' numberOfLines={2} >{isAnswered ? item?.poll?.description : item?.description}</Text>
            <View style={[styles.contTitle,{justifyContent:'space-between', }]}>
                {isAnswered ? (
                    <Text style={styles.lblDate}><Text style={{color: Colors.darkGray,fontWeight:'700'}}>Respondida el:</Text> {moment(item?.answer_date).format('DD MMMM H:MM')}</Text>
                ):(
                    <Text style={styles.lblDate}><Text style={{color: Colors.darkGray,fontWeight:'700'}}>Valida hasta:</Text> {moment(item?.end_date).format('DD MMMM H:MM')}</Text>
                )}
                {!isAnswered && <Text style={{ color: Colors.grayStrong, fontSize: getFontSize(13), fontWeight:'700'}}>Preguntas: {item?.questions.length}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        //flex:1,
        height: height/6,
        padding:12,
        backgroundColor: Colors.white,
        borderRadius:8,
        marginBottom:10,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    contIcon:{
        width: 30, 
        height: 30, 
        borderRadius:15, 
        backgroundColor: Colors.white, 
        justifyContent:'center', 
        alignItems:'center',
        marginRight:5,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    contHeader:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        marginBottom:8
    },
    contTitle:{
        flexDirection:'row', 
        alignItems:'center'
    },
    lblTitle:{
        color: Colors.darkGray, 
        fontSize: getFontSize(18), 
        fontWeight:'700'
    },
    lblBonus:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(15), 
        fontWeight:'700'
    },
    lblDesc:{
        color: Colors.darkGray, 
        fontSize: getFontSize(14), 
        fontWeight:'400', 
        marginBottom:10
    },
    lblDate:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    }
})

export default SurveyItem;