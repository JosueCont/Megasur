import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addCartItem } from "../../store/ducks/exchangeDuck";
import { Entypo } from '@expo/vector-icons';


const {height, width} = Dimensions.get('window');


const ExchangeItem = ({item, index, showActions=true}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const shoppingCart = useSelector(state => state.exchangeDuck.cart)

    const findShoppingCart = (item) => {
        return shoppingCart.find(product => product?.id == item?.id )
    }

    return(
        <View style={[styles.card, {height: showActions ? 260 : 180,}]}>
            <TouchableOpacity 
                disabled={!showActions} 
                style={[styles.btnImage,{borderBottomColor: showActions ? Colors.grayStrong : Colors.white}]} 
                onPress={() => navigation.navigate('DetailProduct',{product:item})}>
                <Image source={{uri: item.image}} style={styles.img}/>
            </TouchableOpacity>
            <View style={[styles.content, {justifyContent: showActions ?'flex-start' : 'flex-end'}]}>
                <TouchableOpacity 
                    disabled={!showActions} 
                    style={[styles.btnName,{height: showActions ? 40 : 20,}]} 
                    onPress={() => navigation.navigate('DetailProduct',{product:item})}>
                    <Text style={[styles.lbl,{fontSize: getFontSize(15)}]}>{item?.name}</Text>
                </TouchableOpacity>
               {showActions && (
                    <View style={[styles.contNew,{backgroundColor: item?.isNewProduct ? Colors.yellowStrong : Colors.white}]}>
                        {item?.isNewProduct && <Text style={[styles.lbl,{fontSize: getFontSize(10),}]}>Nuevo</Text>}
                    </View>
                )}
                <Text style={[styles.lbl, {fontSize: getFontSize(16), marginBottom:13}]}>{item?.price_in_points?.toString()}pts</Text>
                {showActions ? (
                    item?.is_active ? findShoppingCart(item) ? (
                        <View style={styles.contCounter}>
                            <TouchableOpacity style={{ justifyContent:'center', alignItems:'flex-start', flex:1}}>
                                <Entypo name="minus" size={18} color={Colors.blueGreen} />
                            </TouchableOpacity>
                            <Text style={styles.lblCount}>0</Text>
                            <TouchableOpacity style={{ flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                <Entypo name="plus" size={18} color={Colors.blueGreen} />
                            </TouchableOpacity>
    
                        </View>
                    ) : (
                        <TouchableOpacity 
                            onPress={() => dispatch(addCartItem(item))}
                            style={[styles.contFooter,{borderColor: Colors.green,}]}>
                            <Text style={styles.lblAdd}>Agregar al carrito</Text>
                        </TouchableOpacity>
                    ): (
                        <View style={[styles.contFooter,{borderColor: Colors.gray,}]}>
                            <Text style={styles.lblNoProduc}>Agotado</Text>
                        </View>
                    )

                ):null }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width: width/2.36, 
        backgroundColor: Colors.white, 
        marginBottom:15, 
        borderRadius:13,
        paddingBottom:5,
        borderColor: Colors.grayBorders,
        borderWidth:1
    },
    btnImage:{
        flex:1,  
        borderBottomWidth:0.5
    },
    content:{
        flex:1, 
        paddingHorizontal:10,
    },
    btnName:{
        marginTop:10, 
        width:140, 
        marginBottom:4
    },
    lbl:{
        color: Colors.blueGreen, 
        fontWeight:'700'
    },
    contNew:{
        alignSelf:'flex-start', 
        //borderWidth:0.8, 
        //borderColor: Colors.yellowStrong,  
        paddingHorizontal:7, 
        paddingVertical:3, 
        borderRadius:5, 
        marginBottom:5
    },
    img:{
        resizeMode:'contain',
        flex:1,
        borderTopLeftRadius:13,
        borderTopRightRadius:13
    },
    contFooter:{
        flex:1,
        borderWidth:1,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    lblAdd:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    },
    lblNoProduc:{
        color: Colors.gray, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    },
    contCounter:{
        flex:1,
        flexDirection:'row',
        borderWidth:1,
        borderColor: Colors.green,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:5,
    },
    lblCount:{
        color: Colors.blueGreen,
        fontSize: getFontSize(13),
        fontWeight:'400',
        flex:2,
        textAlign:'center'
    }
})

export default ExchangeItem;