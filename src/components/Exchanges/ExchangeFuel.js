import React,{useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
//import { Slider } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import moment from "moment";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { changeModalEx } from "../../store/ducks/exchangeDuck";
import ModalExchangeFuel from "../modals/ModalQrExchange";
import { useNavigation } from "@react-navigation/native";
import * as ScreenCapture from 'expo-screen-capture'
import * as MediaLibrary from 'expo-media-library';
import { changeModalHome } from "../../store/ducks/homeDuck";
import ModalScreenShot from "../modals/ModalScreenShot";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView, GestureDetector, Gesture} from 'react-native-gesture-handler'

const {height, width} = Dimensions.get('window');

const ExchangeFuel = ({availablePoints=0}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const showModal = useSelector(state => state.exchangeDuck.modalFuel)
    const [valueSlider, setSlider] = useState(0)
    const [marks, setMArks] = useState(0)
    const [typeFuel, setType] = useState(null)
    const types = ['Magna','Premium','Diesel']
    const modalScreenShot = useSelector(state => state.homeDuck.modalScreenShot)

    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(availablePoints);


    useEffect(() => {
        if(showModal){
            if(hasPermissions()){
                const subscription = ScreenCapture.addScreenshotListener(() => {
                    onChangeModal('modalFuel', false)
                    setTimeout(() => {
                        dispatch(changeModalHome({prop:'modalScreenShot', val: true}))
                    },500)
                    //setModal(true)
                });
                return () => subscription.remove();
    
            }
        }
    },[showModal])

    const hasPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === 'granted';
    };


    const onChangeModal = (prop, val) => {
        dispatch(changeModalEx({prop, val}))
    }


    const setSteps = () => {
        const pointsTable = {
            '0-200': 2,
            '201-1000': 10,
            '1001-infinito': 50
        };
    
        let range;
        if (availablePoints <= 200) {
            range = '0-200';
        } else if (availablePoints <= 1000) {
            range = '201-1000';
        } else {
            range = '1001-infinito';
        }
    
        return pointsTable[range];
    }
    return(
        <View style={{marginTop:10}}>
            <View style={{ marginBottom:30, marginHorizontal:10}}>
                <Text style={styles.lblTitle}>Puntos a redimir:</Text>
                {availablePoints != 0 ? (
                    <View style={{flex:1}}>
                        <GestureHandlerRootView>
                            <Slider
                                theme={{
                                    //disableMinTrackTintColor: 'red',
                                    maximumTrackTintColor: '#fff',
                                    minimumTrackTintColor: Colors.yellow,
                                    //cacheTrackTintColor: '#333',
                                    //bubbleBackgroundColor: 'red',
                                    //heartbeatColor: 'red',
                                }}
                                style={styles.slider}
                                containerStyle={{height:10, borderRadius:20,}}
                                markStyle={{backgroundColor: Colors.blueGreen}}
                                progress={progress}
                                minimumValue={min}
                                maximumValue={max}
                                renderBubble={() => (
                                    <View style={{ alignItems:'center'}}>
                                        <Text style={{color: Colors.blueGreen, fontWeight:'700', lineHeight:15}}>{valueSlider} pts.</Text>
                                        <View style={{height:15, width:20}}>
                                            <MaterialIcons name="arrow-drop-down" size={24} color={Colors.blueGreen} />

                                        </View>
                                    </View>
                                )}
                                thumbWidth={20}
                                renderThumb={() => (
                                    <View style={{backgroundColor: Colors.blueGreen, width: 20, height:20, borderRadius:10}}/>
                                )}
                                onValueChange={(val) => setSlider(Math.round(val))}
                                //onSlidingComplete={(val) => setSlider(Math.round(val))}
                            />

                        </GestureHandlerRootView>
                        {/*<Slider 
                            defaultValue={0} 
                            size="lg"  
                            colorScheme='yellow' 
                            w="100%"
                            maxW={width * .9}
                            maxValue={availablePoints}
                            step={setSteps()}
                            onChange={(val) => setSlider(val)}>
                            <Slider.Track bg={Colors.grayBorders} size={12}>
                                <Slider.FilledTrack bg={Colors.yellow} size={12}/>
                            </Slider.Track>
                            <Slider.Thumb borderWidth="0" bg="transparent" >
                                <View style={styles.pointer}/>
                                <View style={styles.contMarker}>
                                    <Text style={styles.lblMarker}>{valueSlider} pts</Text>
                                    <FontAwesome name="caret-down" size={20} color={Colors.blueGreen} style={{ lineHeight:15,}}/>
                                </View>
                            </Slider.Thumb>
                </Slider>*/}
                        <View style={styles.contPoints}>
                            <Text style={styles.lbl}>0 pts</Text>
                            <Text style={styles.lbl}>{availablePoints}pts</Text>
                        </View>

                    </View>
                    ):(
                        <Text style={styles.lblTitle}>No hay puntos para canjear</Text>
                    )}
            </View>
            <View style={styles.contChecks}>
                {types.map((type, index) => (
                    <View style={styles.contItem}>
                        <TouchableOpacity 
                            style={{flexDirection:'row'}}
                            onPress={() => setType(index)}>
                            <View style={[styles.check, {
                                backgroundColor: index === typeFuel ? Colors.blueGreen : Colors.lightGray
                            }]}/>
                            <Text style={styles.lblType}>{type}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.contTotal}>
                <Text style={styles.lblType}>Total en pesos: <Text style={styles.lblTotal}>${valueSlider.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2,})}</Text></Text>
            </View>

            <TouchableOpacity 
                style={[styles.btn, {backgroundColor: valueSlider != 0 && typeFuel != null ?  Colors.blueGreen : Colors.grayStrong }]} 
                disabled={valueSlider != 0 && typeFuel != null ? false : true}
                onPress={() => onChangeModal('modalFuel', true)}>
                <Text style={styles.lblBtn}>Generar código para pagar con puntos</Text>
            </TouchableOpacity>
            <ModalExchangeFuel 
                visible={showModal}
                typeFuel={typeFuel}
                totalFuel={valueSlider}
                setVisible={() => onChangeModal('modalFuel', false)}
                onConfirm={() => {
                    onChangeModal('modalFuel', false)
                    setTimeout(() => {
                        navigation.navigate('ConfirmFuel')
                    })
                }}
            />
            <ModalScreenShot 
                visible={modalScreenShot}
                setVisible={() =>  dispatch(changeModalHome({prop:'modalScreenShot', val: false}))}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    lblTitle:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(16), 
        fontWeight:'400', 
        textAlign:'center',
        marginBottom:33
        //width:70, 
        //marginRight:10
    },
    lbl:{
        color: Colors.grayStrong,
        fontSize: getFontSize(12), 
        fontWeight:'400'
    },
    pointer:{
        width:25, 
        height:25, 
        borderRadius:12.5,
        borderWidth:2,
        borderColor: Colors.white, 
        backgroundColor:Colors.blueGreen
    },
    contMarker:{
        position:'absolute', 
        top:-30,
        justifyContent:'center', 
        alignItems:'center', 
        width:100
    },
    lblMarker:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(13), 
        fontWeight:'700'
    },
    contPoints:{
        flexDirection:'row', justifyContent:'space-between'
    },
    contChecks:{
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'center',
        marginBottom:40
    },
    contItem:{
        flexDirection:'row', 
        alignItems:'center'
    },
    check:{
        width:25, 
        height:25, 
        borderRadius:12.5, 
        borderWidth:1, 
        borderColor: Colors.grayStrong, 
        marginRight:5
    },
    lblType:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(16), 
        fontWeight:'400', 
        marginRight:15
    },
    btn:{
        flex:1, 
        paddingVertical:12, 
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(15),
        fontWeight:'400'
    },
    contTotal:{
        alignItems:'center', 
        borderBottomWidth:1, 
        borderBottomColor: Colors.grayBorders, 
        paddingBottom:10, 
        marginBottom:30
    },
    lblTotal:{
        color: Colors.blueGreen, 
        fontWeight:'700', 
        fontSize: getFontSize(18)
    },
    slider:{
        marginBottom:15,
    }
})

export default ExchangeFuel;