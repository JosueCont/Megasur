
const CHANGE_MODAL = 'change_modal'
const CHANGE_INPUT = 'change_input'

const initialState = {
    modalQuizz: false,
    comment:''
}

const homeDuck = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]:action.payload.val}
        case CHANGE_INPUT:
            return{ ...state, [action.payload.prop]: action.payload.val}
        default:
            return state;
    }
}

export const changeModalHome = ({prop,val}) => {
    return{
        type: CHANGE_MODAL,
        payload: {prop,val}
    }
}

export const changeInputHome = ({prop,val}) => {
    return{
        type: CHANGE_INPUT,
        payload:{ prop, val }
    }
}

export default homeDuck;