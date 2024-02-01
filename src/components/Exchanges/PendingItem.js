import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import moment from "moment";
import Progress from "../CustomProgress";

const {height, width} = Dimensions.get('window');

const PendingItem = ({item, index, pressed, isDisable=false}) => {
    const getNameProgress = (status) => {
        let prototypes = {
            0: 'Pendiente',
            1: 'En camino',
            2: 'En sucursal',
            3: 'Entregado'
        }
        return prototypes[status]
    }

    return(
        <TouchableOpacity style={styles.card} onPress={() => pressed(item)} disabled={isDisable}>
            <Image source={require('../../../assets/box.png')} style={styles.img}/>
            <View style={styles.contDesc}>
                <View style={styles.headerCont}>
                    <Text style={styles.lblOrder}>Número de pedido: {item?.id}</Text>
                    {/*<TouchableOpacity style={{}}>
                        <MaterialIcons name="keyboard-arrow-right" size={35} color={Colors.blueGreen} />
    </TouchableOpacity>*/}
                </View>
                <Text style={[styles.lblDate,{marginBottom:10, width: width/2.5}]}>Fecha estimada de entrega: <Text style={{fontWeight:'700'}}>{moment(item?.timestamp,).format('DD MMM YYYY')}</Text></Text>
                <View style={styles.contFooter}>
                    <Text style={styles.lblWay}>{getNameProgress(item?.status)}</Text>
                    <Progress numSteps={3} currentStep={item?.status+1}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        flex:1,
        padding:12,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: Colors.white,
        borderRadius:13,
        borderColor: Colors.gray,
        borderWidth: 0.6,
        marginBottom:24,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    img:{
        flex:1, 
        width:90, 
        height:90, 
        resizeMode:'contain' 
    },
    contDesc:{
        flex:2, 
        justifyContent:'center', 
        alignItems:'flex-start',
    },
    headerCont:{
        flexDirection:'row', 
        flex:1
    },
    lblOrder:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(14), 
        fontWeight:'700', 
        marginBottom:10, 
        width: width/2.5
    },
    contFooter:{
        flexDirection:'row',  
        alignItems:'center',
    },
    lblWay:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    },
})

export default PendingItem;