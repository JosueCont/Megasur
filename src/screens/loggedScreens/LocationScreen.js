import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, Platform, ScrollView, Image, StyleSheet, Linking } from "react-native";
import { getFontSize, getPermissionLocation } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderLogged from "../../components/Headers/HeaderLogged";
import MapView,{Marker, Callout, CalloutSubview} from "react-native-maps";
import Animated, { useSharedValue, withTiming, interpolate, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { PanGestureHandler, State, GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import AccordionList from "../../components/profile/AccordionList";
import HeaderLocation from "../../components/Headers/HeaderLocation";
import PersonalInfoForm from "../../components/profile/PersonalInfo";
import StationList from "../../components/StationsList";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { onChangeModalLoc } from "../../store/ducks/locationsDuck";
import ModalLocation from "../../components/modals/ModalLocationStation";


const {height, width} = Dimensions.get('window');

const LocationScreen = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const route = useRoute();
    const dispatch = useDispatch();
    const [initialRegion, setRegion] = useState(null)
    const [region, setNewRegion] = useState(null)
    const [isOpen, setIsOpen] = useState(true);
    const [selectedMarker, setSelectMarker] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const pan = Gesture.Pan();
    const stations = useSelector(state => state.locationDuck.nearBranches)
    const zones = useSelector(state => state.locationDuck.branchesZones)
    const modalActive = useSelector(state => state.locationDuck.modalLocation)



    //longitudeDelta cuando este el accordion 0.009, height 2.5, contrario heigth 1.54 y longitudeDelta 0.9
    /*
    CAmbiar tamaño al ir actualzando el evento
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, heigth/3);
      })
    */

      useEffect(() => {
        setIsOpen(true)
        
      },[isFocused])

    useEffect(() => {
        (async() => {
            const location = await getPermissionLocation()
            console.log('location', Platform.OS, location)
            setRegion({
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude
            })
            setNewRegion({
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude
            })
        })();
        getByZone()
    },[])

    const getByZone = () => {
        let dataAccordion = []
        dataAccordion.push({
            title:'Estaciones cerca de ti', 
            component: <StationList 
                stations={stations} 
                isLocation={true} 
                changeRegion={(coords) => onChangeRegion(coords)}
                openMaps={(coords, name) => onOpenMaps(coords, name)}
                />
        })
        zones.map((zone,index) => {
            dataAccordion.push({
                title: zone.name,
                component: <StationList 
                    stations={getZones(zones, zone.name)} 
                    isLocation={true} 
                    changeRegion={(coords) => onChangeRegion(coords)}
                    openMaps={(coords, name) => onOpenMaps(coords, name)}
                />
            })
        })

        return dataAccordion

    }

    const onOpenMaps = (coords, locationName) => {
        const url = `https://www.google.com/maps/search/?api=1&q=${encodeURIComponent(locationName)}&query=${coords.lat},${coords.lng}`;
        Linking.openURL(url);
    }

    const onChangeRegion = (coords) => {
        setNewRegion({
            ...region,
            latitude: coords.lat,
            longitude: coords.lng
        })
    }

    const getZones = (branches, zone) => {
        let newZone = branches.filter(branch => zone === branch.name) 
        return newZone[0]?.branches || []
    }

    const onGestureEvent = event => {
        context.value = { y: translateY.value };
        //translateY.value = event.nativeEvent.translationY;
      };

    const onGestureUpdate = event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, -height/3 + 50);
    }
    
    const onGestureEnd = event => {
       const shouldCloseSheet = event.translationY > 100;
       //translateY.value = withSpring(shouldCloseSheet ? 0 : height/3);
       setIsOpen(!shouldCloseSheet);
       if(isOpen || !isOpen) setNewRegion({...initialRegion})
      
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value}],
        height: withTiming(isOpen ? height/2.7 : 50, {duration: 500}),
        //opacity: withSpring(isOpen ? 1 : 0)
      };
    });

    const sizeMap = useAnimatedStyle(() => {
      return{
          height: withTiming(isOpen ? height/2.3 : height/1.54 , {duration: 500})
      }
    })

    const opacity = useAnimatedStyle(() => {
      return{
          opacity: withTiming(isOpen ? 1 : 0, {duration:300})
      }
    })

    const onPressMarker = (marker) => {
        setModalLoading(true)
        setNewRegion({
            latitude: marker?.location_as_lat_long.lat,
            longitude: marker?.location_as_lat_long?.lng
        })
        dispatch(onChangeModalLoc({prop:'modalLocation', value: true}))
        setSelectMarker(marker)
        setTimeout(() => {
            setModalLoading(false)
        },500)
    }

    
    return(
        <HeaderLocation 
            isBack={route?.params?.fromCloseStations || false} 
            title="Ubicaciones" 
            noPadding={true}
            goBack={() => navigation.goBack() }>
                <Animated.View style={[sizeMap,{width: width, }]}>
                    {initialRegion != null &&
                     <MapView 
                        style={{flex:1}}
                        region={{...region, longitudeDelta: isOpen ? 0.009 : 0.9, latitudeDelta: 0.04}}
                        initialRegion={{
                            longitude: initialRegion?.longitude,
                            latitude: initialRegion?.latitude,
                            longitudeDelta: 0.09,
                            latitudeDelta: 0.04
                        }}
                        //onRegionChangeComplete={(coords) => setNewRegion({latitude: coords.latitude, longitude: coords.longitude})}
                        >
                        <Marker style={{zIndex:10}}coordinate={{
                            longitude: initialRegion?.longitude,
                            latitude: initialRegion?.latitude
                        }}>
                            <View style={{width:15, height:15, borderRadius:7.5, backgroundColor: Colors.blueGreen, borderWidth:1, borderColor: Colors.white}}/>
                        </Marker>
                        
                            <>
                                {stations.map((marker, index) => (
                                <Marker 
                                    key={index}
                                    coordinate={{
                                        longitude: marker?.location_as_lat_long?.lng,
                                        latitude: marker?.location_as_lat_long?.lat
                                    }} 
                                    
                                    onPress={() => onPressMarker(marker) }
                                >
                                    <View style={styles.contImage}>
                                         <Image source={{uri: marker?.franchise?.logo}} style={styles.imgFranchise}/>
                                    </View>
                                </Marker>
                                ))}
                                {!!zones && zones.map((marker,index) => marker?.branches?.map((item,index) => (
                                    <Marker 
                                        key={index}
                                        coordinate={{
                                            longitude: item?.location_as_lat_long?.lng,
                                            latitude: item?.location_as_lat_long?.lat
                                        }} 
                                        onPress={() => onPressMarker(item)}
                                    
                                    >
                                        <View style={styles.contImage}>
                                            <Image source={{uri: item?.franchise?.logo}} style={styles.imgFranchise}/>
                                        </View>
                                    </Marker>

                                )))}
                            </>
                        
                    </MapView>}
                    {isOpen && !modalActive && (
                        <TouchableOpacity
                            onPress={()=> setNewRegion({...initialRegion})}
                            style={styles.btnMyLocation}>
                            <MaterialIcons name="my-location" size={15} color={Colors.white} />
                        </TouchableOpacity>
                    )}
                </Animated.View>
                
                <GestureHandlerRootView>
                    <GestureDetector
                        gesture={pan.onStart((event) => onGestureEvent(event)).onUpdate(event => onGestureUpdate(event)).onEnd((event) => onGestureEnd(event))}
                        //onGestureEvent={onGestureEvent}
                        //onHandlerStateChange={onGestureEnd}
                        >
                        <Animated.View style={[animatedStyle,{backgroundColor: modalActive ? Colors.white: Colors.lightGray,}]}>
                            <TouchableOpacity style={{alignSelf:'center', marginBottom:5}}
                                onPress={() => {
                                    setIsOpen(!isOpen);
                                    //translateY.value = isOpen ? 0 : height/3;
                                }}>
                                <View style={{width:154, height:8, backgroundColor: Colors.gray, borderRadius:8, marginTop:3}}/>
                            </TouchableOpacity>
                            <ScrollView
                                keyboardShouldPersistTaps='handled'
                                automaticallyAdjustKeyboardInsets
                                nestedScrollEnabled={true}
                                overScrollMode="always"
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={isOpen ? true : false}
                                //style={{flex:1}}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: 30,

                                }}>
                                    <Animated.View style={opacity}>
                                        <AccordionList data={getByZone()} isLocation={true}/>
                                    </Animated.View>
                                    
                            </ScrollView>
                        </Animated.View>

                    </GestureDetector>

                </GestureHandlerRootView>

                <ModalLocation 
                    visible={modalActive}
                    onClose={() => dispatch(onChangeModalLoc({prop:'modalLocation', value: false}))}
                    station={selectedMarker}
                    loading={modalLoading}
                    isOpen={isOpen}
                />

        </HeaderLocation>
    )
}

const styles = StyleSheet.create({
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
    btnMyLocation:{
        position:'absolute', 
        justifyContent:'center', 
        alignItems:'center', 
        right:10, 
        bottom:5, 
        backgroundColor:Colors.blueGreen, 
        width:30, 
        height: 30, 
        borderRadius:15 
    }
})

export default LocationScreen;