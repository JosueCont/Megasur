import React,{useEffect, useState} from "react";
import { TouchableOpacity, View, Text, Image , Dimensions} from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import GainPoint from "../../../assets/svg/GainPoint";
import { useDispatch } from "react-redux"; 

const {height, width} = Dimensions.get('window');

const ProvitionalPoints = ({pressed, openModal}) => {
    return(
        <TouchableOpacity onPress={openModal}>
            <View style={{width: width/1.1, height:160, backgroundColor:Colors.purple, alignSelf:'center', borderRadius:16, flexDirection:'row', alignItems:'center', marginBottom:20}}>
                <GainPoint />
                <Image source={require('../../../assets/coins.png')}/>
                <View>
                    <Text style={{color: Colors.white, fontSize: getFontSize(15), fontWeight:'400', transform: [{ rotate: '-4.591deg' }]}}>Responde</Text>
                    <Text style={{color: Colors.white,fontSize: getFontSize(15),fontWeight:'400', marginLeft:5, transform: [{ rotate: '-4.591deg' },]}}>Una <Text style={{fontSize: getFontSize(20), fontWeight:'800'}}>breve</Text></Text>
                    <Text style={{color: Colors.white,marginLeft:5, transform: [{ rotate: '-4.591deg' },],fontSize: getFontSize(20), fontWeight:'800'}}>Encuesta</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProvitionalPoints;