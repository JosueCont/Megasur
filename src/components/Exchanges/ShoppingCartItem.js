import React,{ useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { deleteCarItem, updateProductQuantity } from "../../store/ducks/exchangeDuck";
import { Entypo } from '@expo/vector-icons';


const ShoppingItem = ({item, index,onDeleteItem, points}) => {
    const dispatch = useDispatch();
    const shoppingCart = useSelector(state => state.exchangeDuck.cart)
    const products = useSelector(state => state.exchangeDuck.products)

    const getValidation = (id,action) => {
        const productToAdd = products.find(product => product.id === id);
        const totalPoints = shoppingCart.reduce((total, item) => total + (item.price_in_points * item.quantity), 0);
        const newTotalPoints = totalPoints + (productToAdd.price_in_points * 1);
        
        return newTotalPoints
    }

    return(
        <View style={{flexDirection:'row', marginBottom:12, }}>
            <View style={{width: 75, height: 75, borderRadius: 13, borderWidth: 0.5, borderColor: Colors.grayStrong, marginRight:10}}>
                <Image source={{uri: item?.image}} style={{flex:1, borderRadius:13, resizeMode:'contain'}}/>
            </View>
            <View style={{justifyContent:'space-evenly'}}>
                <Text style={{color: Colors.blueGreen, fontSize: getFontSize(16), fontWeight:'400'}}>{item?.name}</Text>
                <View style={styles.contCounter}>
                    <TouchableOpacity 
                        disabled={item?.quantity != 1 ? false : true}
                        onPress={() => dispatch(updateProductQuantity(item?.id, (item?.quantity || 1) - 1))}>
                        <Entypo name="minus" size={18} color={Colors.blueGreen} />
                    </TouchableOpacity>
                    <Text style={styles.lblCount}>{item?.quantity || 1}</Text>
                    <TouchableOpacity 
                        onPress={() => {
                            const totalPoints = getValidation(item?.id, (item?.quantity || 1) + 1)
                            totalPoints <= points ?  dispatch(updateProductQuantity(item?.id, (item?.quantity || 1) + 1))
                            : console.log('No se puede actualizar, por puntos')
                        }}
                    >
                        <Entypo name="plus" size={18} color={Colors.blueGreen} />
                    </TouchableOpacity>

                </View>
            </View>
            <TouchableOpacity style={{alignSelf:'center', marginLeft:40}} onPress={() => dispatch(deleteCarItem(item?.id))}>

                <FontAwesome name="trash-o" size={24} color={Colors.pink} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contCounter:{
        width: 120, 
        height:30,
        flexDirection:'row',
        borderWidth:1,
        borderColor: Colors.green,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:5
    },
    lblCount:{
        color: Colors.blueGreen,
        fontSize: getFontSize(13),
        fontWeight:'400'
    },
    lbl:{
        color: Colors.blueGreen, 
        fontWeight:'700'
    },
})

export default ShoppingItem;