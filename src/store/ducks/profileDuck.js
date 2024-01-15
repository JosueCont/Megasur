import { getDataUser, postDeleteAccount, postVerifyCodeMail, postverifyEmail, putUserData } from "../../utils/services/ApiApp"

const CHANGE_INPUT = 'change_input'
const CHANGE_MODAL = 'change_modal'
const GET_DATA_PROFILE = 'get_data_profile'
const DATA_PROFILE__FAILED = 'data_profile_failed'
const CHANGE_IMAGE = 'change_image'
const VALIDATE_EMAIL_CODE_SUCCESS = 'validate_email_code_success'
const VALIDATE_EMAIL_CODE_FAILED = 'validate_email_code_failed'
const LOADING = 'loading_prof'
const UPDATE_VERIFICATION_CODE = 'update_verification'
const UPDATE_DATA_USER_SUCCESS = 'update_data_user_success'
const UPDATE_DATA_USER_FAILED = 'update_data_user_failed'
const DELETE_ACCOUNT_SUCCESS = 'delete_account_success'
const DELETE_ACCOUNT_FAILED = 'delete_account_failed'
const REFRESH = 'refresh'

const initialState = {
    loading:false,
    modalVerify:false,
    isEmailVerified: false,
    imgFront:'',
    imgBack:'',
    modalActive:false,
    modalSuccess: false,
    modalFailed: false,
    modalDelete:false,
    gender:'',
    name:'',
    lastName:'',
    birthDay:'',
    phone:'',
    email:'',
    code:'',
    message:'',
    isAccountUpdate:false,
    dataUser: null,
    refresh: false,
    modalTerms:false
}

const profileDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading:true}
        case REFRESH:
            return{ ...state, refresh: true}
        case CHANGE_INPUT:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case GET_DATA_PROFILE:
            return{
                ...state, isEmailVerified: action.payload.is_verified, 
                name: action.payload.first_name,
                first_name: action.payload.first_name, 
                lastName: action.payload.last_name, 
                email: action.payload.email, 
                birthDay: action.payload.birthday,
                gender: action.payload.gender, 
                phone: action.payload.phone,
                dataUser: action.payload,
                loading:false,
                refresh:false }
        case CHANGE_IMAGE:
            return{ ...state, [action.payload.prop]: action.payload.image}
        case VALIDATE_EMAIL_CODE_SUCCESS:
            return{ ...state, loading: false, code:'', modalVerify: false, isEmailVerified: true, modalSuccess:true, message: action.payload }
        case VALIDATE_EMAIL_CODE_FAILED:
            return{ ...state, loading: false, modalVerify: false, modalFailed:true, message:action.payload}
        case UPDATE_VERIFICATION_CODE:
            const { index, value } = action.payload;
            const newCode = [...state.code];
            newCode[index] = value;
            const updatedCode = newCode.join('');
            return { ...state,code: updatedCode };
        case UPDATE_DATA_USER_SUCCESS:
            return{ ...state, loading: false, isAccountUpdate: true, modalSuccess: true, message: action.message}
        case UPDATE_DATA_USER_FAILED:
            return{ ...state, loading: false, isAccountUpdate: false, modalFailed: true, message: action.message}
        case DELETE_ACCOUNT_SUCCESS:
            return{ ...state, modalSuccess: true, message: action.message}
        case DELETE_ACCOUNT_FAILED:
            return{ ...state, modalFailed: true, message: action.message}
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

export const onChangeImage = ({prop, image}) => {
    console.log('resivi', prop, image)
    return{
        type: CHANGE_IMAGE,
        payload: {prop, image}
    }
}

export const getProfileData = () => async(dispatch) => {
    try {
        //dispatch({type: REFRESH})
        const response = await getDataUser()
        if(response?.data?.id){
            dispatch({type: GET_DATA_PROFILE, payload: response?.data})
        }
        console.log('dataUser', response?.data)
    } catch (e) {
        console.log('error datos user',e)
        dispatch({type: DATA_PROFILE__FAILED})
        
    }
}

export const onVerifyEmail = (id) => async(dispatch) => {
    try {
        const response = await postverifyEmail(id);
        console.log('response email', response?.data)
    } catch (e) {
        console.log('error verificación email',e)
    }
}

export const verifyCodeEmail = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const response = await postVerifyCodeMail(data.userId, data.code)
        console.log('response verify mail', response.data)
        dispatch({type: VALIDATE_EMAIL_CODE_SUCCESS, payload:'Se ha verificado el email'})
    } catch (e) {
        console.log('error verificar código',e)
        dispatch({type: VALIDATE_EMAIL_CODE_FAILED, payload:'Ocurrio un problema al verificar email'})
    }
}

export const updateCodeEmail = (index, value) => {
    return {
      type: UPDATE_VERIFICATION_CODE,
      payload: { index, value }
    };
};

export const onUpdateDataUser = (data) => async(dispatch) => {
    try {
        let formData = new FormData();

        dispatch({type: LOADING})
        let dataSend = {...data}
        for (let key in dataSend) {
            formData.append(key, data[key]);
          }
        console.log('dataSend',formData)
        const response = await putUserData(formData)
        console.log('response actualizar',response?.data)
        dispatch({type: UPDATE_DATA_USER_SUCCESS, message:'Se ha actualizado la información del usuario'})
    } catch (e) {
        console.log('error actualizar',e)
        dispatch({type: UPDATE_DATA_USER_FAILED, message:'Ocurrio un error al actualizar los datos'})
    }
}

export const requestDeleteAccount = (id) => async(dispatch) => {
    try {
        const response = await postDeleteAccount(id)
        console.log('response delete',response?.data)
        if(response?.data?.id) dispatch({type: DELETE_ACCOUNT_SUCCESS, message: 'La solicitud para eliminar la cuenta fue correcta'})
        else   dispatch({type: DELETE_ACCOUNT_FAILED, message: 'Ocurrio un error al intentar eliminar la cuenta'})

    } catch (e) {
        console.log('error dele',e)
        dispatch({type: DELETE_ACCOUNT_FAILED, message: 'Ocurrio un error al intentar eliminar la cuenta'})
    }
}

export const refreshAction = () => {
    return{
        type: REFRESH,
    }
}

export default profileDuck;