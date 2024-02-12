import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize, getPermissionLocation } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import TypeExchange from "../../../components/Exchanges/TypeExchange";
import Filters from "../../../components/Exchanges/Filters";
import ExchangeList from "../../../components/Exchanges/ExchangesList";
import { changeModalEx, getCategories, getListCloseBranches, getOrdersList, getProducts, onChangeType, resetDeliveredData, resetOrderData, setOrderData } from "../../../store/ducks/exchangeDuck";
import Cart from "../../../components/Exchanges/Cart";
import ModalShoppingCart from "../../../components/modals/ShoppingCart";
import FilterExchanged from "../../../components/Exchanges/FilterExchanged";
import moment from "moment";
import PendingList from "../../../components/Exchanges/PendingList";
import OrderSelected from "../../../components/Exchanges/OrderSelected";
import DeliveredList from "../../../components/Exchanges/ReceivedList";
import DeliveredSelected from "../../../components/Exchanges/DeliveredSelected";
import EmptyList from "../../../components/Exchanges/EmptyList";
import ExchangeFuel from "../../../components/Exchanges/ExchangeFuel";

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    //const [selectedType, setSelected] = useState(0)
    const [selectedFilter, setFilter] = useState(null)
    const [exchangedFilter, setExchanged] = useState(true)
    const orderData = useSelector(state => state.exchangeDuck.orderData)
    const categories = useSelector(state => state.exchangeDuck.categories)
    const products = useSelector(state => state.exchangeDuck.products)
    const userId = useSelector(state => state.authDuck.dataUser)
    const selectedType = useSelector(state => state.exchangeDuck.selectedType)
    const shoppingCart = useSelector(state => state.exchangeDuck.cart)
    const modalshopping = useSelector(state => state.exchangeDuck.modalShoppingCart)
    const branches = useSelector(state => state.exchangeDuck.closeBranches)
    const pending = useSelector(state => state.exchangeDuck.pendingList)
    const delivered = useSelector(state => state.exchangeDuck.receivedList)
    const deliveredData = useSelector(state => state.exchangeDuck.deliveredData)


    useEffect(() => {
        (async() => {
            await dispatch(getCategories())  
            const coords = await getPermissionLocation()
            await dispatch(getListCloseBranches(coords?.coords))
            await dispatch(getOrdersList(getFiltersOrders()))
        })()
    },[])
    useEffect(() => {
        (async() => {
            const filters = await buildUrlPath(selectedFilter)
            await dispatch(getProducts(filters))
        })()
    },[selectedFilter])

    const getFiltersOrders = () => {
        let path = `?per_page=10&sort=desc`//&user_id=${userId?.id}`//user_id=userId agregar userId
        console.log('path',path)
        return path;        
    }

    const buildUrlPath = (filters) => {
        let path = ''
        if (filters !=null) {
            path += `?category_id=${encodeURIComponent(filters?.id)}`;
        }
        return path
    }

    return(
        <>
            <HeaderLogged 
                title="Centro de Canje" 
                isBack={true} 
                goBack={() => {
                    if(selectedType === 2 && orderData != null){
                        dispatch(resetOrderData())
                    }else if(selectedType === 2 && deliveredData != null){
                        dispatch(resetDeliveredData())
                    }else navigation.goBack()
                }}>
                <Text style={styles.title}>Tienes disponibles:<Text style={{fontWeight:'700'}}>1200 pts</Text></Text>
                <View style={styles.header}>
                    <TypeExchange selected={selectedType} setSelected={(val) => dispatch(onChangeType(val))}/>
                    {selectedType === 1 && (<Filters filters={categories} setSelected={(val) => setFilter(val)} selected={selectedFilter}/>)}
                    {selectedType === 2 && (
                        <FilterExchanged 
                            selected={exchangedFilter} 
                            setPending={() => setExchanged(true)}
                            setReceived={() => setExchanged(false)}
                        />

                    )}
                </View>
                <View style={styles.content}>
                    {selectedType === 0 ? (
                        <ExchangeFuel />
                    ) : selectedType === 1 ? (
                        <ExchangeList data={products}/>

                    ): (
                        exchangedFilter ? orderData != null ? (
                            <OrderSelected orderData={orderData} products={orderData?.detail}/>
                        ): pending.length > 0 ? (
                            <PendingList 
                                pendingList={pending} 
                                changeOrder={(data) => dispatch(setOrderData({prop:'orderData',data}))}
                            />

                        ) : (
                            <EmptyList message='No hay paquetes pendientes por mostrar'/>
                        ) : deliveredData != null ? (
                            <DeliveredSelected products={deliveredData.detail} delivered={deliveredData}/>
                        ):delivered.length > 0 ? (
                                <DeliveredList 
                                    deliveredList={delivered} 
                                    changeOrder={(data) => dispatch(setOrderData({prop:'deliveredData',data}))}
                                />
                        ): (
                            <EmptyList message='No has recibido paquetes'/>
                        )
                    )}
                </View>
                <ModalShoppingCart 
                    visible={modalshopping} 
                    branches={branches}
                    onSubmit={() => navigation.navigate('Confirm')}
                    points={600}
                    setVisible={() => dispatch(changeModalEx({prop:'modalShoppingCart', val:false}))}
                />
            </HeaderLogged>
            {selectedType ===1 && 
                <Cart 
                    products={shoppingCart.length} 
                    pressed={() => dispatch(changeModalEx({prop:'modalShoppingCart', val:true}))}
                />
            }
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