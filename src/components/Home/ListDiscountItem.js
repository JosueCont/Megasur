import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import 'moment/locale/es';


const {height, width} = Dimensions.get('window');


const ListDiscountItem = ({item,index}) => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity 
            style={styles.card}
            onPress={()=>navigation.navigate('AnnouncementDetail', { itemId: item.id })}
        >
            <View style={{width: width/2.8,}}>
                {/* <Text style={styles.discount}>{item.discount.toString()}%</Text> */}
                <Text style={styles.discount} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.desc}>{item.short_description}</Text>
                {/* <Text style={styles.vigency}>Vigencia del {moment(item.valityStart,'DD/MM/YYYY').format('DD MMMM YYYY')} al {moment(item.valityEnd,'DD/MM/YYYY').format('DD MMMM YYYY')}</Text> */}
            </View>
            {item.partner && <Image source={{uri:item.partner.image}} style={styles.img}/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width: width/1.35,
        justifyContent:'space-between',
        height:130, 
        backgroundColor: Colors.white, 
        borderRadius:8, 
        marginRight:10, 
        marginTop:8,
        flexDirection:'row',
        //alignItems:'center',
        padding:10,
        marginBottom:5,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 2,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    discount:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(24), 
        fontWeight:'700',
        //lineHeight: 25,
    },
    desc:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(14), 
        fontWeight:'400', 
        marginBottom:8
    },
    vigency:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(10), 
        fontWeight:'400'
    },
    img:{
        width:110, 
        height:110, 
        resizeMode:'contain',
        alignSelf:'center',
        borderRadius: 55
    }
})

export default ListDiscountItem;