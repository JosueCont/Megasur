import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import ChargesItem from "./ChargesItem";
import { changeModalCharges, updateInfoCharge } from "../../store/ducks/chargesDuck";
import { useDispatch, useSelector } from "react-redux";
import ModalRateCharge from "../modals/ModalRateCharge";
import { Ionicons } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');

const ChargesList = ({charges, setVisible}) => {
    const loader = useSelector(state => state.chargesDuck.loading)

    return(
        <View>
            {loader ? (
                <View>
                    <Skeleton.Text px="10" lines={1} mb={2} mt={2} backgroundColor={'gray.100'}/>
                    {Array.from({length:3}).map((_,index) => (
                            <Skeleton key={index} lines={1} borderRadius={20} height={height/6} mb={2} backgroundColor={'gray.100'}/>
                    ))}
                </View>
            ): charges.length > 0 ? charges.map((charge, index) => (
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
                        <View style={[styles.line,{ borderStyle:'dotted', marginTop:10,}]}/>
                        
                    </View>
                ))
            :(
                <View style={styles.contEmpty}>
                    <Ionicons name="file-tray-sharp" size={44} color={Colors.blueGreen} />
                    <Text style={styles.lblEmpty}>No se encontraron cargas</Text>
                </View>
            )}
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
    },
    contEmpty:{
        height:100, 
        justifyContent:'center',
        alignItems:'center'
    },
    lblEmpty:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    }
})

export default ChargesList;