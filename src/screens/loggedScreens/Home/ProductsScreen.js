import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import TypeExchange from "../../../components/Exchanges/TypeExchange";
import Filters from "../../../components/Exchanges/Filters";
import ExchangeList from "../../../components/Exchanges/ExchangesList";
import { changeModalEx, getCategories, getProducts, onChangeType } from "../../../store/ducks/exchangeDuck";
import Cart from "../../../components/Exchanges/Cart";
import ModalShoppingCart from "../../../components/modals/ShoppingCart";

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    //const [selectedType, setSelected] = useState(0)
    const [selectedFilter, setFilter] = useState(null)
    const categories = useSelector(state => state.exchangeDuck.categories)
    const products = useSelector(state => state.exchangeDuck.products)
    const userId = useSelector(state => state.authDuck.dataUser)
    const selectedType = useSelector(state => state.exchangeDuck.selectedType)
    const shoppingCart = useSelector(state => state.exchangeDuck.cart)
    const modalshopping = useSelector(state => state.exchangeDuck.modalShoppingCart)

    useEffect(() => {
        (async() => {
            await dispatch(getCategories())              
        })()
    },[])
    useEffect(() => {
        (async() => {
            const filters = await buildUrlPath(selectedFilter)
            await dispatch(getProducts(filters))
        })()
    },[selectedFilter])

    const buildUrlPath = (filters) => {
        let path = ''
        if (filters !=null) {
            path += `?category_id=${encodeURIComponent(filters?.id)}`;
        }
        return path
    }

    const filters = [
        {id:'1', title:'Gasolina'},
        {id:'2', title:'Especiales'},
        {id:'3', title:'Audio'},
        {id:'4', title:'Accesorios'},
        {id:'5', title:'Bebidas'},
        {id:'6', title:'Extras'},
    ]

    /*const products = [
        {
            name:'Gorra de los Leones de Yucatán',
            points:180, 
            isNewProduct:true,
            image: require('../../../../assets/cap.png'),
            isAvailable:true
        },
        {
            name:'Audífonos inalámbricos',
            points:560, 
            isNewProduct:false,
            image: require('../../../../assets/earPhones.png'),
            isAvailable:true
        },
        {
            name:'Memoria USB 32GB',
            points:120, 
            isNewProduct:true,
            image: require('../../../../assets/cap.png'),
            isAvailable: false
        },
        {
            name:'Ventilador de torre',
            points:2700, 
            isNewProduct:false,
            image: require('../../../../assets/earPhones.png'),
            isAvailable: true
        },
    ]*/

    return(
        <>
            <HeaderLogged title="Centro de Canje" isBack={true} goBack={() => navigation.goBack()}>
                <Text style={styles.title}>Tienes disponibles:<Text style={{fontWeight:'700'}}>1200 pts</Text></Text>
                <View style={styles.header}>
                    <TypeExchange selected={selectedType} setSelected={(val) => dispatch(onChangeType(val))}/>
                    {selectedType === 1 && <Filters filters={categories} setSelected={(val) => setFilter(val)} selected={selectedFilter}/>}
                </View>
                <View style={styles.content}>
                    {selectedType === 0 ? (
                        <Text>Canjear conbustible</Text>
                    ) : selectedType === 1 ? (
                        <ExchangeList data={products}/>

                    ): (
                        <Text>Articulos canjeados</Text>
                    )}
                </View>
                <ModalShoppingCart 
                    visible={modalshopping} 
                    setVisible={() => dispatch(changeModalEx({prop:'modalShoppingCart', val:false}))}
                />
            </HeaderLogged>
            {selectedType ===1 && <Cart products={shoppingCart.length} pressed={() => dispatch(changeModalEx({prop:'modalShoppingCart', val:true}))}/>}
        </>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize: getFontSize(26), 
        fontWeight:'500', 
        color: Colors.darkGray, 
        textAlign:'center',
        marginBottom:24
    },
    header:{
        alignItems:'center', 
        marginBottom:20
    },
    content:{
        marginHorizontal:20
    }
})

export default ProductsScreen;