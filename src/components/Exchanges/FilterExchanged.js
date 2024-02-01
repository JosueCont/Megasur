import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";

const {height, width} = Dimensions.get('window');

const FilterExchanged = ({selected=true, setPending, setReceived}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={setPending}>
                <Text style={[styles.lbl,{
                    color: selected ? Colors.darkGray : Colors.grayStrong,
                    fontWeight: selected ? '700' : '400'
                    }]}>Pendientes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={setReceived}>
                <Text style={[styles.lbl,{
                    color: selected ? Colors.grayStrong : Colors.darkGray,
                    fontWeight: selected ? '400' : '700'}]}>Recibidos</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        justifyContent:'space-evenly',
        width: width/1.2,
        marginTop:25,
        borderBottomColor: Colors.grayStrong,
        borderBottomWidth:0.6,
        paddingBottom:15
    },
    lbl:{
        fontSize: getFontSize(14),
        fontWeight:'400'
    }
})

export default FilterExchanged;