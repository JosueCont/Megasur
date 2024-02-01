import { getCloseBranches, getListCategories, getListProducts, getOrders } from "../../utils/services/ApiApp";

const LOADING = 'loading_exchange'
const GET_CATEGORIES = 'get_categories'
const GET_PRODUCTS = 'get_products'
const GET_PRODUCTS_FAILED = 'get_products_failed'
const CHANGE_TYPE = 'change_type'
const CHANGE_COUNT_PRODUCT = 'change_count_product'
const RESET_COUNT = 'reset_count'
const ADD_CART_ITEM = 'add_cart_item'
const CHANGE_MODAL = 'change_modal_exchan'
const DELETE_CAR_ITEM = 'delete_car_item'
const GET_CLOSE_BRANCHES = 'close_branches'
const SET_ORDER_DATA = 'set_order_data'
const RESET_ORDER_DATA = 'reset_order_data'
const RESET_DELIVERED_DATA = 'reset_delivered_data'
const ORDERS_SUCCESS = 'get_orders_success'
const ORDERS_FAILED = 'get_orders_failed'

const initialState = {
    loading:false,
    categories:[],
    products:[],
    selectedType:0,
    countProduct:0,
    cart:[],
    modalShoppingCart:false,
    closeBranches:[],
    orderData:null,
    pendingList:[],
    receivedList:[],
    deliveredData:null
}

const exchangeDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case GET_CATEGORIES:
            return{ ...state, categories: action.payload}
        case GET_PRODUCTS:
            return{ ...state, products: action.payload, loading: false}
        case GET_PRODUCTS_FAILED:
            return{ ...state, loading: false}
        case CHANGE_TYPE:
            return{ ...state, selectedType: action.payload}
        case CHANGE_COUNT_PRODUCT:
            return{ ...state, [action.payload.prop]: action.payload.val}
        case RESET_COUNT:
            return{ ...state, countProduct:0}
        case ADD_CART_ITEM:
            return{ ...state, cart: [...state.cart, action.payload]}
        case DELETE_CAR_ITEM:
            return{ ...state, cart: state.cart.filter(item => item.id !== action.payload)}
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]: action.payload.val}
        case GET_CLOSE_BRANCHES:
            return{ ...state, closeBranches: action.payload}
        case SET_ORDER_DATA:
            return{ ...state, [action.payload.prop]: action.payload.data}
        case RESET_ORDER_DATA:
            return{ ...state, orderData:null}
        case RESET_DELIVERED_DATA:
            return{ ...state, deliveredData: null}
        case ORDERS_SUCCESS:
            return{ ...state, receivedList: action.payload.received, pendingList: action.payload.pending}
        default:
            return state;
    }
}

export const onActionCount = ({action,count}) => (dispatch) => {
    if(action == 'increment') dispatch({type: CHANGE_COUNT_PRODUCT, payload:{prop: 'countProduct', val: count+1}})
    else dispatch({type: CHANGE_COUNT_PRODUCT, payload: {prop:'countProduct', val:count -1}})
}

export const resetCount = () => {
    return{
        type: RESET_COUNT
    }
}

export const onChangeType = (type) => {
    return{
        type: CHANGE_TYPE,
        payload: type
    }
}

export const getProducts = (filters) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const response = await getListProducts(filters);
        console.log('productos',response?.data)
        dispatch({type: GET_PRODUCTS, payload: response?.data?.items})
    } catch (e) {
        dispatch({type: GET_PRODUCTS_FAILED})
        console.log('error prod',e)
    }
}

export const getCategories = () => async(dispatch) => {
    try {
        const response = await getListCategories();
        //const category = response?.data.reduce((acc, item) => {
        //    acc[item.name] = acc[item.name] || item;
        //    return acc;
        //  }, {});
        //  const categories = Object.values(category);

        console.log('categories',response?.data)
        dispatch({type: GET_CATEGORIES, payload: response?.data})
    } catch (e) {
       console.log('error cat',e) 
    }
}

export const addCartItem = (item) => {
    return{
        type: ADD_CART_ITEM,
        payload: item
    }
}

export const deleteCarItem = (id) => {
    return{
        type: DELETE_CAR_ITEM,
        payload: id
    }
}

export const changeModalEx = ({prop, val}) => {
    return{
        type: CHANGE_MODAL,
        payload: {prop,val}
    }
}

export const getListCloseBranches = (coords) => async(dispatch) => {
    try {
        let filter = `?lat=${coords.latitude}&long=${coords.longitude}`
        const response = await getCloseBranches(filter)
        let branches =[];
        if(response?.data){
            response?.data.near_branches.forEach(item => {
                if(item.exchange_center) branches.push({id: item.id, label: item.name})
            });
        }
        dispatch({type: GET_CLOSE_BRANCHES, payload: branches})
        //console.log('close branches', branches)
    } catch (e) {
        console.log('errror',e)
    }
}

export const setOrderData = ({prop,data}) => {
    return{
        type: SET_ORDER_DATA,
        payload: {prop, data}
    }
}

export const resetOrderData = () => {
    return{
        type: RESET_ORDER_DATA,
    }
}

export const resetDeliveredData = () => {
    return{
        type: RESET_DELIVERED_DATA
    }
}

export const getOrdersList = (filter) => async(dispatch) => {
    try {
        const response = await getOrders(filter)
        let received = []
        let pending = []
        if(response?.data?.items.length > 0){
            response?.data?.items.map((order,index) => {
                order?.detail.forEach(product => {
                    product.name = product.product_name
                    product.image = product.product_photo
                    product.price_in_points = product.product_price
                    delete product?.product_name
                    delete product.product_photo
                    delete product.product_price
                });
                    
                if(order?.status === 3) received.push(order)
                else pending.push(order)
            })
        }
        dispatch({
            type: ORDERS_SUCCESS, 
            payload:{ pending ,received }
        })
        console.log('pending', pending, 'received', received)
    } catch (e) {
        console.log('error orders',e)
        dispatch({type: ORDERS_FAILED})
    }
}
export default exchangeDuck;