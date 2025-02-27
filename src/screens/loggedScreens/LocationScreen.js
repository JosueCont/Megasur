import React,{useState,useEffect, useRef, useCallback} from "react";
import { 
    View, Text, TouchableOpacity, Dimensions, Platform, ScrollView, 
    Image, StyleSheet, Linking, FlatList, PanResponder, Animated,
    PermissionsAndroid, Alert } from "react-native";
import { getFontSize, getPermissionLocation } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderLogged from "../../components/Headers/HeaderLogged";
import MapView,{Marker, Callout, CalloutSubview, PROVIDER_GOOGLE} from "react-native-maps";
//import Animated, { useSharedValue, withTiming, interpolate, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { PanGestureHandler, State, GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import AccordionList from "../../components/profile/AccordionList";
import HeaderLocation from "../../components/Headers/HeaderLocation";
import PersonalInfoForm from "../../components/profile/PersonalInfo";
import StationList from "../../components/StationsList";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { onChangeModalLoc, setLocationStation } from "../../store/ducks/locationsDuck";
import ModalLocation from "../../components/modals/ModalLocationStation";
import AccordionItem from "../../components/profile/AccordionItem";
import { getStations } from "../../utils/services/ApiApp";
import * as Location from 'expo-location'
import { Spinner } from "native-base";

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
    const [stations, setStations] = useState([])
    const [zones, setZones] = useState([])
    //const translateY = useSharedValue(0);
    //const context = useSharedValue({ y: 0 });
    //const pan = Gesture.Pan();
    //const stations = useSelector(state => state.locationDuck.nearBranches)
    //const zones = useSelector(state => state.locationDuck.branchesZones)
    const modalActive = useSelector(state => state.locationDuck.modalLocation)
    const locationStation = useSelector(state => state.locationDuck.locationStation)
    const [dataAccordion, setDataAccordion] = useState([])
    const [loading, setLoading] = useState(true)
    const [isPermissions, setIsPermission] = useState(false)
    const [disableChange, setDisableChange] = useState(false)
    const [isMapReady, setIsMapReady] = useState(false);

    const sheetMaxHeight = height - 200;
    const sheetMinHeight = 75;

    const MAX_Y = sheetMinHeight - sheetMaxHeight;
    const MID_Y = (MAX_Y / 2) + 50;
    const MIN_Y = 0;

    const MAx_FLEX = 0.85
    const MIN_FLEX = 0.55

    const THRESHOLD = 60;

    const lastRef = useRef(MID_Y);
    const sheetRef = useRef(new Animated.Value(MID_Y)).current;
    const animatedMapSize = useRef(new Animated.Value(MIN_FLEX)).current;
    const animatedMapOpacity = useRef(new Animated.Value(1)).current;
    const timeoutId = useRef();

    //const { locationStation,  } = route?.params
    useEffect(() => {
      setIsOpen(true)
      if(route?.params?.locationStation ){
          setTimeout(() => {
              //onChangeRegion(route?.params?.locationStation)
            setNewRegion({
                latitude: route?.params?.locationStation?.lat,
                longitude: route?.params?.locationStation?.lng
            })

        },500)
      }
    },[isFocused,])
 
    useEffect(() => {
        (async() => {
            //if(isFocused){
                setLoading(true)
                const location = await getPermissionLocation()
                console.log('location', Platform.OS, location)
                //getZonesStations(location?.coords)
                if( location != undefined && location?.coords){
                    setIsPermission(true)
                    setRegion({
                        latitude: location?.coords?.latitude,
                        longitude: location?.coords?.longitude
                    })
                    setNewRegion({
                        latitude: locationStation != null ? locationStation.lat : location?.coords?.latitude,
                        longitude: locationStation != null ? locationStation.lng : location?.coords?.longitude
                    })
                    dispatch((setLocationStation(null)))

                }else {
                    setLoading(false)
                    setIsPermission(false)
                }
                //getByZone()
                
            //}
        })();
    },[])

    useEffect(() => {
        if(initialRegion != null && initialRegion != undefined) getZonesStations(initialRegion)
    },[initialRegion])

    const getZonesStations = async(coords) => {
        try {
            //setLoading(true)
            const stations = await getStations(coords?.latitude, coords?.longitude)
            setZones(stations?.data?.branches_by_zone)
            setStations(stations?.data?.near_branches)
            let dataAccordion = []
            dataAccordion.push({
                title:'Estaciones cerca de ti', 
                stations: stations?.data?.near_branches
            })
            stations?.data?.branches_by_zone.map((zone,index) => {
                if(zone.branches.length > 0){
                    dataAccordion.push({
                        title: zone.name,
                        stations: getZones(stations?.data?.branches_by_zone, zone.name)
                    })
                }
            })
            setLoading(false)

            setDataAccordion(dataAccordion)

        } catch (e) {
            console.log('error stations',e)
        }
    }

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            sheetRef.setOffset(lastRef.current);
          },
          onPanResponderMove: (_, gesture) => {
            sheetRef.setValue(gesture.dy);
          },
          onPanResponderRelease: (_, gesture) => {
            sheetRef.flattenOffset();
    
            if(gesture.dy > 0){
                //dragging down
                if(gesture.dy <= THRESHOLD) {
                    lastRef.current === MAX_Y ? autoSpring(MAX_Y) : autoSpring(MID_Y);
                    lastRef.current <= MID_Y && lastRef.current === MAX_Y && lastRef.current != MAX_Y ? calculatesizeMap(MAx_FLEX) : calculatesizeMap(MIN_FLEX)
                }else if(lastRef.current === MAX_Y){
                    //calculatesizeMap(0.5) 
                    autoSpring(MID_Y);
                }else{
                    autoSpring(MIN_Y);
                    calculatesizeMap(MAx_FLEX) 
              }
            }else{
                //dragging up
                if(gesture.dy >= -THRESHOLD){
                    lastRef.current === MIN_Y ? autoSpring(MIN_Y) : autoSpring(MID_Y);
                    lastRef.current === MIN_Y && lastRef.current <= MID_Y && lastRef.current != MAX_Y && calculatesizeMap(MIN_FLEX) //: calculatesizeMap(MIN_FLEX)
                }else {
                    lastRef.current === MIN_Y ? autoSpring(MID_Y) : autoSpring(MAX_Y);
                    calculatesizeMap(MIN_FLEX) 
              }
            }
          },
        }),
      ).current;

    const calculatesizeMap = (val) => {
        //const newSize = val >= MIN_Y ? 0.5 : 0.85; 
        //newSize > MIN_Y ? (newSize < MAX_Y ? 0.85 : 0.5) : 0.5;

        Animated.timing(animatedMapSize, {
            toValue: val,
            duration: 300,
            useNativeDriver: false,
        }).start();
        
        Animated.timing(animatedMapOpacity,{
            toValue: val === MAx_FLEX ? 0 : 1,
            duration:300,
            useNativeDriver: false
        }).start();
        
    }

    const autoSpring = value => {
        lastRef.current = value;
        Animated.spring(sheetRef, {
          toValue: lastRef.current,
          useNativeDriver: false,
        }).start();
    };

    const animatedStyles = {
      height: sheetRef.interpolate({
        inputRange: [MAX_Y, MIN_Y],
        outputRange: [sheetMaxHeight, sheetMinHeight],
        extrapolate: 'clamp',
      }),
    };

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
            if(zone.branches.length > 0){
                dataAccordion.push({
                    title: zone.name,
                    component: <StationList 
                        stations={getZones(zones, zone.name)} 
                        isLocation={true} 
                        changeRegion={(coords) => onChangeRegion(coords)}
                        openMaps={(coords, name) => onOpenMaps(coords, name)}
                    />
                })
            }
        })

        //return dataAccordion
        setDataAccordion(dataAccordion)

    }

    const onOpenMaps = (coords, locationName) => {
        const url = `https://www.google.com/maps/search/?api=1&q=${encodeURIComponent(locationName)}&query=${coords.lat},${coords.lng}`;
        Linking.openURL(url);
    }

    const onChangeRegion = useCallback((coords) => {
        //console.log('nueva region',coords)
        //setDisableChange(true)
        //let timeoutId;
        //if(!isMapReady) return;
        if(timeoutId.current){
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            handleSearch(coords);
        }, 300); 

        //setTimeout(() => {
            //    setDisableChange(false)
            //},1000)
    },[handleSearch, isMapReady])
        
    const handleSearch = useCallback((coords) => {
        if(region?.latitude !== coords?.lat && region?.longitude !== coords.lng){
            setNewRegion({
                ...region,
                latitude: coords.lat,
                longitude: coords.lng
            })
        }
            
    },[region, setNewRegion])

    const getZones = (branches, zone) => {
        let newZone = branches.filter(branch => zone === branch.name) 
        return newZone[0]?.branches || []
    }

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

    const showPermissionsAndroid = async() => {
        try {          
            //console.log('solicitando permisos')
            const permision = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    title: 'Megasur solicita permiso para ubicación',
                    message: 'Los datos proporcionados serán utilizados exclusivamente para validar la sucursal de canje y garantizar la seguridad en la generación de códigos en dicha sucursal.',
                    //buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Aceptar',
                });
                //console.log('permissions',permision)
             if(permision === PermissionsAndroid.RESULTS.GRANTED){
                const location = await getPermissionLocation()
                //console.log('location permision', location)
                if(location != null){
                    setIsPermission(true)
                    setRegion({
                        latitude: location?.coords?.latitude,
                        longitude: location?.coords?.longitude
                    })
                    setNewRegion({
                        latitude: location?.coords?.latitude,
                        longitude: location?.coords?.longitude
                    })
                }
             }
            //const location = await getPermissionLocation();
        } catch (e) {
            console.log('error permisions',e)
        }
    }

    const showPermissionsIos = async() => {
        const permisison = await Location.requestForegroundPermissionsAsync()
        if(permisison.status === 'denied') {
            setTimeout(() => {
                Alert.alert(
                    "Permisos denegados",
                    "Para permitir acceso a tu ubicación, abre configuración y acepta los permisos.",
                    [
                      { text: "Cancelar", style: "cancel" },
                      {
                        text: "Abrir configuración",
                        onPress: () => {
                          Linking.openURL("app-settings:");
                        }
                      }
                    ]
                  );
            }, 500)
        }else if(permisison.status === 'granted'){
            const location = await getPermissionLocation()
                setIsPermission(true)
                setRegion({
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude
                })
                setNewRegion({
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude
                })
        }
        //console.log('permisos ios', permisison)
    }

    const onMapReady = () => {
        setIsMapReady(true);
    }
    
    return(
        <HeaderLocation 
            isBack={route?.params?.fromCloseStations || false} 
            title="Ubicaciones" 
            noPadding={true}
            goBack={() => navigation.goBack() }>
                <Animated.View style={[{width: width, flex: animatedMapSize }]}>
                    {initialRegion != null &&
                     <MapView 
                        provider={PROVIDER_GOOGLE}
                        style={{flex:1,}}
                        onMapReady={() => console.log('mapa listo')}
                        region={{...region, longitudeDelta: isOpen ? region?.longitudeDelta ?? 0.009 : 0.9, latitudeDelta: region?.latitudeDelta ?? 0.04}}
                        initialRegion={{
                            longitude: initialRegion?.longitude,
                            latitude: initialRegion?.latitude,
                            longitudeDelta: 0.09,
                            latitudeDelta: 0.04
                        }}
                        onRegionChangeComplete={setNewRegion}
                        >
                        <Marker style={{zIndex:10}}coordinate={{
                            longitude: initialRegion?.longitude,
                            latitude: initialRegion?.latitude
                        }}>
                            <View style={{width:15, height:15, borderRadius:7.5, backgroundColor: Colors.blueGreen, borderWidth:1, borderColor: Colors.white}}/>
                        </Marker>
                        
                            {dataAccordion.length > 0 && <>
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
                            </>}
                        
                    </MapView>}
                    {isOpen && !modalActive && isPermissions && (
                        <TouchableOpacity
                            onPress={()=> setNewRegion({...region, latitude: initialRegion.latitude, longitude: initialRegion.longitude})}
                            style={styles.btnMyLocation}>
                            <MaterialIcons name="my-location" size={15} color={Colors.white} />
                        </TouchableOpacity>
                    )}
                </Animated.View>
                <Animated.View style={[animatedStyles,{flex:1, position:'absolute', bottom:0, width: width, backgroundColor: Colors.lightGray }]} >
                    <View {...panResponder.panHandlers} style={{borderBottomWidth:0.8, borderBottomColor: Colors.grayBorders,}}>
                        <View style={styles.dragBar}/>

                    </View>
                        {!loading ? 
                            dataAccordion.length > 0 ? (
                            <Animated.View style={{opacity: animatedMapOpacity}}>
                                <FlatList 
                                    data={dataAccordion}
                                    overScrollMode='always'
                                    keyExtractor={(item,i) => i.toString()}
                                    nestedScrollEnabled={true}
                                    //style={{backgroundColor:'red', }}
                                    contentContainerStyle={{ paddingBottom:30, flexGrow:1,}}
                                    renderItem={({item,index}) => (
                                        <AccordionItem 
                                            item={item} 
                                            index={index} 
                                            isLocation={true}
                                            onChangeRegion={(coords) => onChangeRegion(coords)}
                                            onOpenMaps={(coords, name) => onOpenMaps(coords, name)}
                                            disabled={disableChange}
                                        />
                                    )}
                                />
                            </Animated.View>

                        ):(
                            <View style={{ justifyContent:'center', alignItems:'center', height:200}}>
                                <Text>No se encontraron sucursales.</Text>
                            </View>
                        ):(
                            <View style={{ justifyContent:'center', alignItems:'center', height:200}}>
                                <Spinner size={'sm'} color={Colors.blueGreen} />

                            </View>
                        )}

                        {!loading && !isPermissions && (
                            <View style={{ justifyContent:'center', alignItems:'center', height:100}}>
                                <Text>No cuentas con los permisos de ubicación.</Text>
                                <TouchableOpacity 
                                    style={styles.btn} 
                                    onPress={() => Platform.OS === 'ios' ?  showPermissionsIos() : showPermissionsAndroid()}>
                                    <Text style={styles.lblBtn}>Solicitar permisos</Text>
                                </TouchableOpacity>

                            </View>
                        )}

                </Animated.View>

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
    },
    dragBar: {
        width: 160,
        height: 6,
        backgroundColor: Colors.gray,
        borderRadius: 12,
        alignSelf:'center', 
        marginVertical:15
    },
    btn:{
        width: width * 0.8,
        paddingVertical:14,
        backgroundColor: Colors.blueGreen,
        borderRadius:8,
        marginTop:15,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
    lblBtn:{
        color: Colors.white,
        fontSize: getFontSize(16),
        fontWeight:'400'
    },
})

export default LocationScreen;