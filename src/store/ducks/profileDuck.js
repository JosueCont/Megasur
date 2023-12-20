import { getDataUser } from "../../utils/services/ApiApp"

const CHANGE_INPUT = 'change_input'
const CHANGE_MODAL = 'change_modal'
const GET_DATA_PROFILE = 'get_data_profile'
const DATA_PROFILE__FAILED = 'data_profile_failed'

const initialState = {
    modalVerify:false,
    isEmailVerified: false
}

const profileDuck = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_INPUT:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case GET_DATA_PROFILE:
            return{ ...state, isEmailVerified: action.payload }
        default:
            return state
    }
}

export const onChangeInputProf = ({prop,value}) => {
    return{
        type: CHANGE_INPUT,
        payload: { prop,value }
    }
}

export const onChangeModalProf = ({prop,value}) => {
    return{
        type: CHANGE_MODAL,
        payload: { prop,value }
    }
}

export const getProfileData = (id) => async(dispatch) => {
    try {
        const response = await getDataUser(id)
        if(response?.data?.id){
            dispatch({type: GET_DATA_PROFILE, payload: response?.data?.is_verified})
        }
        console.log('dataUser', response?.data)
    } catch (e) {
        console.log('error datos user',e)
        
    }
}

export default profileDuck;