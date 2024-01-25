import { getListCategories, getListProducts } from "../../utils/services/ApiApp";

const LOADING = 'loading_exchange'
const GET_CATEGORIES = 'get_categories'
const GET_PRODUCTS = 'get_products'
const CHANGE_TYPE = 'change_type'
const CHANGE_COUNT_PRODUCT = 'change_count_product'
const RESET_COUNT = 'reset_count'
const ADD_CART_ITEM = 'add_cart_item'
const CHANGE_MODAL = 'change_modal_exchan'
const DELETE_CAR_ITEM = 'delete_car_item'

const initialState = {
    loading:false,
    categories:[],
    products:[],
    selectedType:0,
    countProduct:0,
    cart:[],
    modalShoppingCart:false
}

const exchangeDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case GET_CATEGORIES:
            return{ ...state, categories: action.payload}
        case GET_PRODUCTS:
            return{ ...state, products: action.payload, loading: false}
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

export default exchangeDuck;