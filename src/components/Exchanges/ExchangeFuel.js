import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { Slider } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import moment from "moment";
import ExchangeList from "./ExchangesList";
import { FontAwesome } from '@expo/vector-icons';



const ExchangeFuel = ({availablePoints}) => {
    const types = ['Magna','Premium','Diesel']
    return(
        <View style={{marginTop:20}}>
            <View style={{flexDirection:'row', marginBottom:30}}>
                <Text style={styles.lblTitle}>Puntos a redimir:</Text>
                <View style={{flex:1}}>
                    <Slider defaultValue={70} size="lg"  colorScheme="yellow" w="95%" maxW="250">
                        <Slider.Track bg={Colors.grayBorders} size={12}>
                            <Slider.FilledTrack bg={Colors.yellow} size={12}/>
                        </Slider.Track>
                        <Slider.Thumb borderWidth="0" bg="transparent">
                            <View style={styles.pointer}/>
                            <View style={styles.contMarker}>
                                <Text style={styles.lblMarker}>100 pts</Text>
                                <FontAwesome name="caret-down" size={20} color={Colors.blueGreen} style={{ lineHeight:15,}}/>
                            </View>
                        </Slider.Thumb>
                    </Slider>
                    <View style={styles.contPoints}>
                        <Text style={styles.lbl}>0 pts</Text>
                        <Text style={styles.lbl}>1200pts</Text>
                    </View>

                </View>
            </View>
            <View style={styles.contChecks}>
                {types.map((type, index) => (
                    <View style={styles.contItem}>
                        <TouchableOpacity style={styles.check}>
                            
                        </TouchableOpacity>
                        <Text style={styles.lblType}>{type}</Text>
                    </View>
                ))}
            </View>

            <View style={{alignItems:'center', borderBottomWidth:1, borderBottomColor: Colors.grayBorders, paddingBottom:10, marginBottom:30}}>
                <Text style={styles.lblType}>Total en pesos: <Text style={{color: Colors.blueGreen, fontWeight:'700'}}>$800.00</Text></Text>
            </View>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.lblBtn}>Generar código para pagar con puntos</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    lblTitle:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(16), 
        fontWeight:'400', 
        width:70, 
        marginRight:10
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
        backgroundColor: Colors.blueGreen, 
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(15),
        fontWeight:'400'
    }
})

export default ExchangeFuel;