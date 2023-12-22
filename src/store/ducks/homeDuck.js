import { getSiteConfig } from "../../utils/services/ApiApp"

const CHANGE_MODAL = 'change_modal'
const CHANGE_INPUT = 'change_input'
const SETUP_DATA_CONFIG = 'setup_data_config'

const initialState = {
    modalQuizz: false,
    comment:'',
    setupData:null
}

const homeDuck = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]:action.payload.val}
        case CHANGE_INPUT:
            return{ ...state, [action.payload.prop]: action.payload.val}
        case SETUP_DATA_CONFIG:
            return{ ...state, setupData: action.payload }
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

export const getDataConfi = () => async(dispatch) => {
    try {
        const response = await getSiteConfig()
        if(response?.data?.id) dispatch({type: SETUP_DATA_CONFIG, payload: response?.data})
        console.log('response',response?.data)
    } catch (e) {
        console.log('error',e)
    }
}

export default homeDuck;