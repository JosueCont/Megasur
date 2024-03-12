import { getCardsExchange, postAddPhysicCard } from "../../utils/services/ApiApp"

const LOADING = 'loading_redeem'
const SET_CARD = 'set_selected_card'
const CHANGE_VALUE = 'change_value_redeem'

const EXCHANGE_CARDS = 'exchange_cards'
const EXCHANGE_CARD_SUCCESS = 'exchange_card_success'
const EXCHANGE_CARD_FAILED = 'exchange_card_failed'
const CLEAN = 'clean_redeem'

const initialState = {
    loading: false,
    cardSelected: null,
    cardNumber:'',
    modalAddCard:false,
    exchangeCards:[],
    exchanged:false,
    modalFailed: false, 
    modalSuccess: false,
    message:''
}

const redeemDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case SET_CARD:
            return{ ...state, cardSelected: action.payload}
        case CHANGE_VALUE:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case EXCHANGE_CARDS:
            return{ ...state, exchangeCards: action.payload, loading: false, }
        case EXCHANGE_CARD_SUCCESS:
            return{ ...state, loading: false, exchanged: true, modalAddCard: false, modalSuccess: true, message: action.payload, cardNumber:''}
        case EXCHANGE_CARD_FAILED: 
            return{ ...state, loading: false, modalAddCard: false, modalFailed:true, message: action.payload, cardNumber:''}
        case CLEAN:
            return{ ...state, exchanged: false, message:''}
        default:
            return state;
    }
} 

export const onChangeValueRedeem = ({prop, value}) => {
    return{
        type: CHANGE_VALUE,
        payload: {prop, value}
    }
}

export const setCardSelected = (card) => {
    return{
        type: SET_CARD,
        payload: card
    }
}

export const getPhysicCardsExchange = (cardId) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const response = await getCardsExchange(cardId)
        dispatch({type: EXCHANGE_CARDS, payload: response?.data || []})
        console.log('cards', response?.data)
    } catch (e) {
        console.log('error',e)
    }
}

export const exchangeCard = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        let dataSend = {
            "user_card_id": data.userCardId,
            "card_number": data.cardNumber.replace(/\s+/g,'')
        }
        console.log('dataSend',dataSend)
        const response = await postAddPhysicCard(dataSend)
        console.log('response',response?.data)
        dispatch({type: EXCHANGE_CARD_SUCCESS, payload: `Se han agregado ${response?.data?.points} pts a tu tarjeta dígital`})

    } catch (e) {
        console.log('error ',e)
        dispatch({type: EXCHANGE_CARD_FAILED, payload: 'Ha ocurrido un error al agregar tarjeta, intentalo de nuevo'})
    }
}

export const cleanRedeems = () => {
    return{
        type: CLEAN
    }
}

export default redeemDuck;

