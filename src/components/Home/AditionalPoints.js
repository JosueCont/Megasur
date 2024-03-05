import React,{useEffect, useState} from "react";
import { TouchableOpacity, View, Text, Image , Dimensions, StyleSheet} from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import GainPoint from "../../../assets/svg/GainPoint";
import { useDispatch } from "react-redux"; 
import { useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const ProvitionalPoints = ({pressed, showSurvey, totalSurveys}) => {
    const banner = useSelector(state => state.homeDuck.setupData)

    return(
        <>
        {totalSurveys >=1 && (
            <TouchableOpacity onPress={showSurvey}>
                {banner?.banner != null ? (
                    <Image source={{uri: banner.banner}} style={{width: width/1.1, height: 160, resizeMode:'contain', alignSelf:'center'}}/>
                ):(
                    <View style={styles.container}>
                        <GainPoint />
                        <Image source={require('../../../assets/coins.png')}/>
                        <View>
                            <Text style={[styles.lbl,{ fontSize: getFontSize(15),}]}>Responde</Text>
                            <Text style={[styles.lbl,{fontSize: getFontSize(15), marginLeft:5, }]}>Una <Text style={{fontSize: getFontSize(20), fontWeight:'800'}}>breve</Text></Text>
                            <Text style={[styles.lbl,{marginLeft:5,fontSize: getFontSize(20), fontWeight:'800'}]}>Encuesta</Text>
                        </View>
                    </View>

                )}
            </TouchableOpacity>
        )}
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        width: width/1.1, 
        height:160, 
        backgroundColor:Colors.purple, 
        alignSelf:'center', 
        borderRadius:16, 
        flexDirection:'row', 
        alignItems:'center', 
        marginBottom:20
    },
    lbl:{
        color: Colors.white,
        transform: [{ rotate: '-4.591deg' }],
        fontWeight:'400',

    }
})

export default ProvitionalPoints;