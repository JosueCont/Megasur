import { getCardsExchange } from "../../utils/services/ApiApp"

const LOADING = 'loading_redeem'
const SET_CARD = 'set_selected_card'
const CHANGE_VALUE = 'change_value_redeem'

const EXCHANGE_CARDS = 'exchange_cards'

const initialState = {
    loading: false,
    cardSelected: null,
    cardNumber:'',
    modalAddCard:false,
    exchangeCards:[]
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
            return{ ...state, exchangeCards: action.payload}
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
        console.log('cards', response?.data)
    } catch (e) {
        console.log('error',e)
    }
}

export default redeemDuck;

