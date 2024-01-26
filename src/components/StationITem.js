import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import CurveArrow from "../../assets/svg/CurveArrow";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const {height, width} = Dimensions.get('window');

const StationItem = ({station, index, isLocation, changeRegion, openMaps}) => {

    const navigation = useNavigation();
    return(
        <TouchableOpacity 
            onPress={() => isLocation ? changeRegion(station?.location_as_lat_long) : console.log('NAda') }
            style={[styles.card, {marginTop: isLocation ? 10 : 0, width: isLocation ? width/1.06 : width/1.1, }]} 
            key={index}>
            <View style={styles.contHeader}>
                {isLocation ? (
                    <View style={styles.contIsLocation}>
                        <View style={styles.contImage}>
                            <Image source={{uri: station?.franchise?.logo}} style={styles.imgFranchise}/>
                        </View>
                        <Text style={styles.name}>{station.name}</Text>
                    </View>
                ):(
                    <Text style={styles.name}>{station.name}</Text>
                )}
                <TouchableOpacity onPress={() => isLocation ? openMaps(station?.location_as_lat_long, station?.name) : navigation.navigate('Stations',{fromCloseStations:true})}>
                    <CurveArrow />
                </TouchableOpacity>
            </View>
            <Text style={styles.lbl}>{station?.address}</Text>
            {/*<Text style={styles.lbl}>{station.schedule}</Text>*/}
            <View style={styles.contIndicators}>
                {/*<View style={[styles.contStatus,{backgroundColor: station.isOpen ? Colors.green : Colors.pink}]}>
                    <Text style={styles.lblStatus}>{station.isOpen ? 'Abierto' : 'Cerrado'}</Text>
                </View>*/}
                <View style={styles.contDistance}>
                    <Text style={styles.lblDistance}>{station?.distance?.toLocaleString(undefined,{
                        minimumFractionDigits:0,
                        maximumFractionDigits:0
                    })} km</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        //width: width/1.1, 
        //height:115, 
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
    contIsLocation:{
        flexDirection:'row', 
        alignItems:'center'
    },
    contImage:{
        width: 34, 
        height: 34, 
        borderRadius: 17, 
        backgroundColor: Colors.white, 
        marginRight:5,
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
        fontWeight:'700',
        width: width/1.5
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
    contDistance:{
        padding:5, 
        borderWidth:0.5, 
        borderRadius:5
    },
    lblDistance:{
        color: Colors.darkGray,
        fontSize: getFontSize(11), 
        fontWeight:'600'
    },
    imgFranchise:{
        flex:1, 
        width: undefined, 
        height: undefined, 
        borderRadius:17
    }
})

export default StationItem