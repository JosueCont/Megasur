const LOADING = 'loading_redeem'
const SET_CARD = 'set_selected_card'
const CHANGE_VALUE = 'change_value_redeem'

const initialState = {
    loading: false,
    cardSelected: null,
    cardNumber:'',
    modalAddCard:false
}

const redeemDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case SET_CARD:
            return{ ...state, cardSelected: action.payload}
        case CHANGE_VALUE:
            return{ ...state, [action.payload.prop]: action.payload.value}
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

export default redeemDuck;

