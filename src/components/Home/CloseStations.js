import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import CurveArrow from "../../../assets/svg/CurveArrow";

const {height, width} = Dimensions.get('window');

const CloseStations = ({stations}) => {
    return(
        <View style={{}}>
            <Text style={styles.title}>Estaciones cerca de ti</Text>
            <View style={{alignItems:'center'}}>
                {stations?.map((station, index) => (
                    <View style={styles.card} key={index}>
                        <View style={styles.contHeader}>
                            <Text style={styles.name}>{station.name}</Text>
                            <TouchableOpacity>
                                <CurveArrow />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.lbl}>{station.location}</Text>
                        <Text style={styles.lbl}>{station.schedule}</Text>
                        <View style={styles.contIndicators}>
                            <View style={[styles.contStatus,{backgroundColor: station.isOpen ? Colors.green : Colors.pink}]}>
                                <Text style={styles.lblStatus}>{station.isOpen ? 'Abierto' : 'Cerrado'}</Text>
                            </View>
                            <View style={styles.contDistance}>
                                <Text style={styles.lblDistance}>{(station.meters/1000).toString()} km</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize: getFontSize(18),
        fontWeight:'700',
        color: Colors.grayStrong,
        marginBottom:7,
        marginLeft:20
    },
    card:{
        width: width/1.1, 
        height:118, 
        backgroundColor: Colors.white, 
        borderRadius:8, 
        marginBottom:16,
        padding:12,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    contHeader:{
        flexDirection:'row', 
        justifyContent:'space-between',  
        alignItems:'center', 
        marginBottom:6
    },
    name:{
        color: Colors.darkGray, 
        fontSize: getFontSize(16), 
        fontWeight:'700'
    },
    lbl:{
        color: Colors.darkGray, 
        fontSize: getFontSize(12), 
        fontWeight:'400'
    },
    contIndicators:{
        flexDirection:'row', 
        marginTop:7
    },
    contStatus:{
        borderRadius:5, 
        marginRight:10,
        padding:5
    },
    lblStatus:{
        color: Colors.white,fontSize: 
        getFontSize(11), 
        fontWeight:'600'
    },
    contDistance:{
        padding:5, 
        borderWidth:0.5, 
        borderRadius:5
    },
    lblDistance:{
        color: Colors.darkGray,
        fontSize: getFontSize(11), 
        fontWeight:'600'
    }

})

export default CloseStations;