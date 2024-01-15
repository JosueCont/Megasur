import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import ChargesItem from "./ChargesItem";
import { changeModalCharges, updateInfoCharge } from "../../store/ducks/chargesDuck";
import { useDispatch, useSelector } from "react-redux";
import ModalRateCharge from "../modals/ModalRateCharge";

const ChargesList = ({charges, setVisible}) => {
    return(
        <View>
            {charges.map((charge, index) => (
                <View key={index} style={styles.container}>
                    <Text style={styles.title}>{charge?.title}</Text>
                    <View style={[styles.line,]}/>
                    {charge.charges.map((item,index) => 
                        <ChargesItem 
                            charge={item} 
                            index={index} 
                            lastItem={charge.charges.length -1} 
                            openModal={(val) => setVisible(val)}
                        />
                    )}
                    <View style={[styles.line,{ borderStyle:'dotted', marginTop:10}]}/>
                    
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:29,
        paddingVertical:10
    },
    title:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(20), 
        fontWeight:'700', 
        textTransform:'capitalize'
    },
    line:{
        borderWidth:0.8, 
        borderColor: Colors.grayStrong,
    }
})

export default ChargesList;