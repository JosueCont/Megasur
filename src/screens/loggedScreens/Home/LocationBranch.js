import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image } from "react-native";
import { getFontSize, getPermissionLocation } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MapView,{ Marker} from "react-native-maps";

const {height, width} = Dimensions.get('window');

const LocationBranchScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [initialRegion, setInitialRegion] = useState(null)
    const [region, setRegion ] = useState(null)
    const orderData = useSelector(state => state.exchangeDuck.orderData)


    useEffect(() => {
        (async() => {
            const coords = await getPermissionLocation()
            console.log('coords',coords)
            setInitialRegion({
                longitude: coords?.coords?.longitude,
                latitude: coords?.coords?.latitude
            })
            setRegion({
                longitude: orderData?.branch?.location_as_lat_long?.lng,
                latitude: orderData?.branch?.location_as_lat_long?.lat
            })
        })()
    },[])
    return(
        <HeaderLogged title="Ubicación" goBack={() => navigation.goBack()} isBack={true} noPadding={true}>
            <View style={{flex:4, backgroundColor:'red'}}>
                <MapView 
                    style={{flex:1}}
                    region={{...region, longitudeDelta:  0.009, latitudeDelta: 0.04}}
                    initialRegion={{
                        longitude: initialRegion?.longitude,
                        latitude: initialRegion?.latitude,
                        longitudeDelta: 0.09,
                        latitudeDelta: 0.04
                    }}
                    //onRegionChangeComplete={(coords) => setNewRegion({latitude: coords.latitude, longitude: coords.longitude})}
                >
                    <Marker 
                        coordinate={{
                            longitude: orderData?.branch?.location_as_lat_long?.lng,
                            latitude: orderData?.branch?.location_as_lat_long?.lat
                        }} 
                        
                        //onPress={() => onPressMarker(marker) }
                    >
                        <View style={styles.contImage}>
                            <Image source={{uri: orderData?.branch?.franchise?.logo}} style={styles.imgFranchise}/>
                        </View>
                    </Marker>
                </MapView>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.lblTitle}>{orderData?.branch?.name}</Text>
                <Text style={styles.lblAddress}>{orderData?.branch?.address}</Text>
            </View>
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    lblTitle:{
        color: Colors.darkGray,
        fontSize: getFontSize(24),
        fontWeight:'700',
        marginBottom:10
    },
    lblAddress:{
        color: Colors.darkGray,
        fontSize: getFontSize(16),
        fontWeight:'400',
        width: width/1.3,
        textAlign:'center'
    },
    contImage:{
        width: 30, 
        height: 30, 
        borderRadius: 15, 
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
    imgFranchise:{
        flex:1, 
        width: undefined, 
        height: undefined, 
        borderRadius:17
    },
})

export default LocationBranchScreen;