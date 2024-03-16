import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { useToast, Alert, VStack, HStack } from "native-base";
import { getFontSize, getPermissionLocation } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import TypeExchange from "../../../components/Exchanges/TypeExchange";
import Filters from "../../../components/Exchanges/Filters";
import ExchangeList from "../../../components/Exchanges/ExchangesList";
import { 
    addCartItem,
    changeModalEx, getCategories, getListCloseBranches, getOrdersList, 
    getProducts, onChangeType, onExchangeProducts, refreshAction, resetDeliveredData, 
    resetExchangeOrder, 
    resetOrderData, setOrderData, updateProductQuantity 
} from "../../../store/ducks/exchangeDuck";
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
import ModalAlertFailed from "../../../components/modals/ModalAlertFail";
import { getPointsCard } from "../../../store/ducks/homeDuck";

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const toast = useToast();
    const isfocused = useIsFocused()
    const route = useRoute();
    //const [selectedType, setSelected] = useState(0)
    const [selectedFilter, setFilter] = useState({
        "id": 0,
        "is_active": true,
        "name": "Todos",
        "num_products": 0,
      
    })
    const [exchangedFilter, setExchanged] = useState(true)
    const [modalAlert, setModalAlert] = useState(false)
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
    const alertFailed = useSelector(state => state.exchangeDuck.alertFailed)
    const exchangeDone = useSelector(state => state.exchangeDuck.exchangeDone)
    const refresh = useSelector(state => state.exchangeDuck.refresh)
    const points = useSelector(state => state.homeDuck.points)
    const userCard = useSelector(state => state.homeDuck.cardsStorage)



    useEffect(() => {
        if(isfocused){
            (async() => {
                await dispatch(getCategories())  
                const coords = await getPermissionLocation()
                await dispatch(getListCloseBranches(coords?.coords))
                await dispatch(getOrdersList(getFiltersOrders()))
            })()
        }
    },[isfocused])


    useEffect(() => {
        (async() => {
            const filters = await buildUrlPath(selectedFilter)
            await dispatch(getProducts(filters))
        })()
    },[selectedFilter])

    useEffect(() => {
        if(alertFailed){
            toast.show({
                placement:'top',
                render:({id}) =>(
                    <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status='error' variant='solid' backgroundColor={Colors.pink} zIndex={1}>
                        <VStack space={1} flexShrink={1} w="99%" >
                            <HStack flexShrink={1} alignItems="center" justifyContent="space-between" >
                                <HStack space={2} flexShrink={1} alignItems="center">
                                    <Alert.Icon/>
                                    <Text style={{color: Colors.white, fontSize: getFontSize(15)}}>Ocurrio un error al crear la orden, inténtalo otra vez</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                )
            })
            setTimeout(() => {
                dispatch(resetExchangeOrder())
            },1000)
        }
    },[alertFailed])

    useEffect(() => {
        if(exchangeDone){
            dispatch(getPointsCard(userCard[0]?.user_card_id))
            navigation.navigate('Confirm')
            setTimeout(() => {
                console.log('reseteado')
                dispatch(resetExchangeOrder())
            },500)
        }
    },[exchangeDone])

    const getFiltersOrders = () => {
        let path = `?per_page=10&sort=desc&user_id=${userId?.id}`//&user_id=${userId?.id}`//user_id=userId agregar userId
        return path;        
    }

    const buildUrlPath = (filters) => {
        let path = ''
        if (filters !=null ) {
            path += filters.id != 0 ? `?category_id=${ encodeURIComponent(filters?.id)}` : '';
        }
        return path
    }

    const validateAddCar = (id) => {
        const productToAdd = products.find(product => product.id === id);
        const totalPoints = shoppingCart.reduce((total, item) => total + (item.price_in_points * item.quantity), 0);
        const newTotalPoints = totalPoints + (productToAdd.price_in_points * 1);

        return newTotalPoints;
    }

    const getTotalPRoducts = () => {
        return shoppingCart.reduce((quantity, item) => {
            return quantity + item.quantity;
        }, 0);
    }

    const onRefresh = () => {
        dispatch(refreshAction())
        setTimeout(() => {
             dispatch(getCategories())      
            dispatch(getOrdersList(getFiltersOrders()))
            dispatch(getProducts(''))
        },1000)
    }

    return(
        <>
            <HeaderLogged 
                title="Centro de Canje" 
                bgColor={Colors.lightGray}
                isBack={route?.params?.allowBack ? true : false} 
                goBack={() => {
                    if(selectedType === 2 && orderData != null){
                        dispatch(resetOrderData())
                    }else if(selectedType === 2 && deliveredData != null){
                        dispatch(resetDeliveredData())
                    }else navigation.goBack()
                }}
                refresh={refresh}
                onRefresh={() => onRefresh()}>
                <Text style={styles.title}>Tienes disponibles:<Text style={{fontWeight:'700'}}>{points.toString()} pts</Text></Text>
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
                        <ExchangeFuel availablePoints={points}/>
                    ) : selectedType === 1 ? (
                        <ExchangeList 
                            data={products}
                            onMinus={(id, action) => dispatch(updateProductQuantity(id, action))}
                            onPlus={(id, action) => {
                                const newTotalPoints = validateAddCar(id)
                                newTotalPoints <= points ? dispatch(updateProductQuantity(id,action))
                                : setModalAlert(true)
                            }}
                            onAddCar={(item, action) => {
                                const totalPoints = validateAddCar(item?.id)
                                totalPoints <= points ?  dispatch(addCartItem(item))
                                : setModalAlert(true)
                                
                            }}
                        />

                    ): (
                        exchangedFilter ? orderData != null ? (
                            <>
                                {!route?.params?.allowBack && (
                                    <TouchableOpacity onPress={() => dispatch(resetOrderData())}>
                                        <Text style={styles.lbl}>Ver pendientes</Text>
                                    </TouchableOpacity>
                                )}
                                <OrderSelected orderData={orderData} products={orderData?.detail}/>
                            
                            </>
                        ):(
                            <PendingList 
                                pendingList={pending} 
                                changeOrder={(data) => dispatch(setOrderData({prop:'orderData',data}))}
                            />

                        ) : deliveredData != null ? (
                            <>
                                {!route?.params?.allowBack && (
                                    <TouchableOpacity onPress={() => dispatch(resetDeliveredData())}>
                                        <Text style={styles.lbl}>Ver recibidos</Text>
                                    </TouchableOpacity>
                                )}
                            <DeliveredSelected products={deliveredData.detail} delivered={deliveredData}/>
                            </>
                        ):(
                            <DeliveredList 
                                deliveredList={delivered} 
                                changeOrder={(data) => dispatch(setOrderData({prop:'deliveredData',data}))}
                            />
                        )
                    )}
                </View>
                <ModalShoppingCart 
                    visible={modalshopping} 
                    branches={branches}
                    onSubmit={(car, branchId) => {
                        dispatch(onExchangeProducts(car, branchId, userId, moment().format('YYYY-MM-DD')))
                        //navigation.navigate('Confirm')
                    }}
                    points={points}
                    setVisible={() => dispatch(changeModalEx({prop:'modalShoppingCart', val:false}))}
                />

                <ModalAlertFailed 
                    visible={modalAlert}
                    setVisible={() => setModalAlert(false)}
                    message='No se ha podido agregar el articulo, tienes puntos insuficientes'
                    titleBtn="Entendido"
                />
            </HeaderLogged>
            {selectedType ===1 && 
                <Cart 
                    products={getTotalPRoducts()} 
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
    },
    lbl:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(13), 
        fontWeight:'500', 
        marginBottom:10
    }
})

export default ProductsScreen;