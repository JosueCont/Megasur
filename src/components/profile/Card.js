import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const CardItem = ({item,index, cardSelected, showPts=false, disable=false}) => {
    const card = useSelector(state => state.redeemDuck.cardSelected)

    const separateText = (texto, longitudBloque) => {
        let bloques = [];

        for (let i = 0; i < texto.length; i += longitudBloque) {
            let bloque = texto.slice(i, i + longitudBloque);
            bloques.push(bloque);
        }

        let textoConEspacios = bloques.join(' ');

        return textoConEspacios;
    }
    
    return(
        <TouchableOpacity 
            disabled={disable}
            onPress={() => cardSelected(item)}
            style={styles.btn} key={index+1}>
            <ImageBackground 
                source={require('../../../assets/megacardClub.png')} 
                resizeMode='contain'
                style={styles.img}>
                    <View style={styles.container}>
                        {showPts && <Text style={styles.lblPts}>200 pts</Text>}
                        {!showPts && <AntDesign name="checkcircle" size={24} color={card?.card_id === item?.card_id ? Colors.green : Colors.gray} style={{alignSelf:'flex-end', marginRight:20}}/>}
                        <View style={styles.contNumber}>
                            <Text style={styles.lblTitle}>Número de tarjeta</Text>
                            <View style={styles.contCode}>
                                <Text style={styles.lblCode}>{separateText(item?.code,4)}</Text>
                            </View>

                        </View>
                    </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img:{
        flex:1,
        paddingHorizontal:20, 
        paddingVertical:30
    },
    btn:{
        marginHorizontal:10, 
        height:250,
    },
    container:{
        //justifyContent:'flex-end', 
        flex:1
    },
    lblTitle:{
        color: Colors.white, 
        fontSize: getFontSize(14), 
        fontWeight:'400'
    },
    contCode:{
        backgroundColor: Colors.white, 
        width: width*.5, 
        padding:10, 
        borderRadius:8, 
        marginTop:4
    },
    lblCode:{
        color: Colors.darkGray, 
        fontSize: getFontSize(14), 
        fontWeight:'700'
    },
    lblPts:{
        color: Colors.white, 
        fontSize: getFontSize(24), 
        fontWeight:'700'
    },
    contNumber:{
        flex:1,
        justifyContent:'flex-end'
    }
})

export default CardItem