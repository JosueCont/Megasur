import moment from "moment"
import { getAnsweredSurveys, getDataUser, postDeleteAccount, postVerifyCodeMail, postverifyEmail, putUserData, getDataVehicle, updateDataVehicle } from "../../utils/services/ApiApp"

const CHANGE_INPUT = 'change_input_profile'
const CHANGE_MODAL = 'change_modal_profile'
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

const SET_ANSWERED_SURVEYS = 'answered_surveys'

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
    userImage:'',
    code:'',
    message:'',
    isAccountUpdate:false,
    dataUser: null,
    refresh: false,
    modalTerms:false,
    answeredSurveys:[],
    receiveNotifications:false,
    isCompleteRegis:false,
    isEmailValid: false
}

const profileDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading:true}
        case REFRESH:
            return{ ...state, refresh: true}
        case CHANGE_INPUT:
            if(action.payload.prop === 'email'){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isValid = emailRegex.test(action.payload.value);
                return{ ...state, email: action.payload.value, isEmailValid: isValid}
            }else return{ ...state, [action.payload.prop]: action.payload.value}
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case GET_DATA_PROFILE:
            return{
                ...state, isEmailVerified: action.payload.is_verified, 
                name: action.payload.first_name,
                first_name: action.payload.first_name, 
                lastName: action.payload.last_name, 
                email: action.payload.email, 
                birthDay: action.payload.birthday != null ? action.payload.birthday : '',
                gender: action.payload.gender, 
                phone: action.payload.phone,
                dataUser: action.payload,
                userImage: action.payload.profile_picture,
                receiveNotifications: action.payload.receive_notifications,
                loading:false,
                refresh:false,
                isCompleteRegis:false,
                isEmailValid: action.payload.email != '' && action.payload.email != null ? true : false
                //isAccountUpdate: false
            }
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
            return{ ...state, loading: false, isAccountUpdate: true, modalSuccess: true, message: action.message, receiveNotifications: action.notify, isCompleteRegis: action.isComplete}
        case UPDATE_DATA_USER_FAILED:
            return{ ...state, loading: false, isAccountUpdate: false, modalFailed: true, message: action.message}
        case DELETE_ACCOUNT_SUCCESS:
            return{ ...state, modalSuccess: true, message: action.message}
        case DELETE_ACCOUNT_FAILED:
            return{ ...state, modalFailed: true, message: action.message}
        case SET_ANSWERED_SURVEYS:
            return{ ...state, loading:false, answeredSurveys: action.payload, refresh: false}
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
        dispatch({type: LOADING})
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
        for (let key in data) {
            formData.append(key, data[key]);
          }
        console.log('dataSend',formData)
        const response = await putUserData(formData)
        console.log('actualizado',response?.data)
        dispatch({
            type: UPDATE_DATA_USER_SUCCESS, 
            message:'Información personal actualizada.',
            notify: response?.data?.receive_notifications,
            isComplete: response?.data?.complete_registration
        })
    } catch (e) {
        console.log('error actualizar',e)
        dispatch({type: UPDATE_DATA_USER_FAILED, message:'Ocurrió un error al actualizar los datos.'})
    }
}

export const requestDeleteAccount = (id) => async(dispatch) => {
    try {
        const response = await postDeleteAccount(id)
        console.log('response delete',response?.data)
        if(response?.data?.id) dispatch({type: DELETE_ACCOUNT_SUCCESS, message: 'La solicitud para eliminar tu cuenta fue enviada'})
        else   dispatch({type: DELETE_ACCOUNT_FAILED, message: 'Ocurrio un error al intentar eliminar la cuenta'})

    } catch (e) {
        console.log('error dele',e)
        dispatch({type: DELETE_ACCOUNT_FAILED, message:e?.response?.status === 404 ? 'Ya existe una solicitud de eliminación de tu cuenta.' : 'Ocurrio un error al intentar eliminar la cuenta'})
    }
}

export const refreshAction = () => {
    return{
        type: REFRESH,
    }
}

export const getAllAnsweredSurveys = (userId) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const response = await getAnsweredSurveys(userId)
        let sortSurveys = [];
        if(response?.data?.items.length > 0){
            response?.data?.items.forEach(survey => {
                let dateSurvey = moment(survey?.answer_date).format('MMMM YYYY')
                const existMonth = sortSurveys.find((month) => month.title === dateSurvey)
                if(!existMonth){
                    sortSurveys.push({
                        title: dateSurvey,
                        surveys: [survey]
                    })
                }else{
                    existMonth?.surveys?.push(survey)
                }
            });

        }
        dispatch({type: SET_ANSWERED_SURVEYS, payload: sortSurveys});
        console.log('answered surveys',sortSurveys)
    } catch (e) {
        console.log('error answ sur',e)
    }
}

export const getVehicleData = async (userId) => {
    try {
        let response = {
            success: false,
            data: {}
        }
        // alert(JSON.stringify(userId))
        const responses = await getDataVehicle(userId)
        
        if(responses?.data){
            // alert(JSON.stringify(responses.data))
            return {
                success: true,
                data: responses?.data
            }
             
        }
        console.log('dataUser', response?.data)
    } catch (e) {
        console.log('error datos user',e)
        // dispatch({type: DATA_PROFILE__FAILED})
        return response
    }
}

export const updateVehicleData = async (userId, data) => {
    let response = {
        success: false,
        data: {}
    }
    try {
         
        const responses = await updateDataVehicle(userId, data) 
        if(responses?.data){ 
            return {
                success: true,
                data: responses?.data
            }
             
        }
        console.log('dataUser', response?.data)
    } catch (e) {
        console.log('error datos user',e)
        // dispatch({type: DATA_PROFILE__FAILED})
        return response
    }
}

export default profileDuck;