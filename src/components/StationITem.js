import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import CurveArrow from "../../assets/svg/CurveArrow";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { setLocationStation } from "../store/ducks/locationsDuck";


const {height, width} = Dimensions.get('window');

const StationItem = ({station, index, isLocation, changeRegion, openMaps, disabled}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const setNavigate = () => {
        dispatch(setLocationStation(station?.location_as_lat_long))
        navigation.navigate('Stations',{fromCloseStations:true, locationStation: station?.location_as_lat_long })
    }
    return(
        <TouchableOpacity 
            disabled={disabled}
            onPress={() => isLocation ? changeRegion(station?.location_as_lat_long) : setNavigate() }
            style={[styles.card, {marginTop: isLocation ? 10 : 0, width: isLocation ? width/1.06 : width/1.1, }]} 
            key={index}>
            <View style={styles.contHeader}>
                
                <View style={styles.contIsLocation}>
                    <View style={styles.contImage}>
                        <Image source={{uri: station?.franchise?.logo}} style={styles.imgFranchise}/>
                    </View>
                    <Text style={styles.name}>{station.name}</Text>
                </View>
                
                <TouchableOpacity 
                    style={{width:20, height:20, borderColor: Colors.blueGreen, borderRadius:4, borderWidth:1, justifyContent:'center',alignItems:'center', transform:[{rotate:'45deg'}]}}
                    onPress={() => openMaps(station?.location_as_lat_long, station?.name) }>
                    <MaterialCommunityIcons name="google-maps" size={15} color={Colors.blueGreen} style={{transform:[{rotate:'-45deg'}]}}/>
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