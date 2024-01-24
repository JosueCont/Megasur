import AsyncStorage from "@react-native-async-storage/async-storage";
import { postValidateCode, postVerifyPhone, postRegisterUser } from "../../utils/services/ApiApp";
import { saveTokens } from "../../utils/functions";

const CHANGE_INPUT = 'change_input';
const UPDATE_VERIFICATION_CODE = 'update_verification_code';
const CHANGE_MODAL = 'change_modal';
const LOADING = 'loading';
const CANCEL_LOADING = 'cancel_loading'

const NO_PHONE_NUMBER = 'no_phone_number'
const VERIFY_PHONE_SUCCESS = 'verify_phone_sucess'
const VERIFY_PHONE_FAILED = 'verify_phone_failed'
const VALIDATE_CODE_SUCCESS_ONBOARDING = 'validate_code_succes_onboarding'
const VALIDATE_CODE_FAILED = 'validate_code_failed'
const VALIDATE_CODE_SUCCESS_LOGIN = 'validate_code_succes_login'

const REGISTER_SUCCESS = 'register_success'
const REGISTER_FAILED = 'register_failed'

const LOGIN_SUCCESS = 'login_success'
const LOGIN_FAILED = 'login_failed'
const LOGOUT = 'logout'
const RESET_VALIDATE = 'reset_validate_code'

const initialState = {
    phone:'',
    verificationCode:'',
    email:'',
    name:'',
    lastName:'',
    birthday:'',
    gender:'',
    isEmailValid:false,
    modalSucces:false,
    modalFailed: false,
    loading:false,
    isValidPhoneNumber:false,
    message:'',
    isLogged:false,
    dataUser:null,
    isRegistered: false,
}

const authDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true};
        case CANCEL_LOADING:
            return{ ...state, loading:false}
        case CHANGE_INPUT:
            if(action.payload.prop === 'email'){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isValid = emailRegex.test(action.payload.value);
                return{ ...state, email: action.payload.value, isEmailValid: isValid}
            }else return{ ...state, [action.payload.prop]:action.payload.value, }
        case UPDATE_VERIFICATION_CODE:
            const { index, value } = action.payload;
            const newCode = [...state.verificationCode];
            newCode[index] = value;
            const updatedCode = newCode.join('');
            return { ...state,verificationCode: updatedCode };
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]:action.payload.val}
        case NO_PHONE_NUMBER:
            return{ ...state, modalFailed: true, message: action.payload, phone:''}
        case VERIFY_PHONE_SUCCESS:
            return{ ...state, isValidPhoneNumber: true, loading: false}
        case VERIFY_PHONE_FAILED:
            return{ ...state, modalFailed: true, message: action.payload, loading:false, phone:''}
        case VALIDATE_CODE_SUCCESS_ONBOARDING:
            return{ ...state, loading:false, modalSucces: true, message: action.message }
        case VALIDATE_CODE_FAILED:
            return{ ...state, loading: false, modalFailed: true, message: action.message}
        case VALIDATE_CODE_SUCCESS_LOGIN:
            return{ ...state, isLogged: true, loading: false, dataUser: action.payload }
        case REGISTER_SUCCESS:
            return{ ...state, dataUser: action.payload, loading: false, isRegistered: true}
        case REGISTER_FAILED:
            return{ ...state, loading: false, message: action.message, modalFailed: true}
        case LOGIN_SUCCESS:
            return{ ...state, ...initialState, isLogged: true, dataUser: action.payload}
        case LOGIN_FAILED:
            return{ ...state, loading: false, isLogged: false, modalFailed: true, message: action.message}
        case LOGOUT:
            return{ ...state, isLogged: false, dataUser: null}
        case RESET_VALIDATE:
            return{ ...state, isValidPhoneNumber: false}
        default:
            return state;
    }
}


export const changeInput = ({prop,value}) => {
    return{
        type: CHANGE_INPUT,
        payload: {prop, value}
    }
}

export const updateVerificationCode = (index, value) => {
    return {
      type: UPDATE_VERIFICATION_CODE,
      payload: { index, value }
    };
};

export const changeModal = ({prop,val}) => {
    return{
        type: CHANGE_MODAL,
        payload: {prop,val}
    }
}

export const verifyPhoneNumber = (data) => async(dispatch) => {
    try {
        if(data.length <10){
            dispatch({type: NO_PHONE_NUMBER, payload:'No es un número de teléfono'})
        }else{

            dispatch({type: LOADING})
            let dataSend = {
                phone: +data
            }
            console.log('dataSend',dataSend)
            const response = await postVerifyPhone(dataSend)
            console.log('response', response?.data)
            if(response?.data.sent_to === dataSend.phone) dispatch({type: VERIFY_PHONE_SUCCESS, })
        }
    } catch (e) {
        console.log('error verificar numero',e)
        dispatch({type: VERIFY_PHONE_FAILED, payload:'Ocurrio un problema al mandar sms, intetalo de nuevo'})
    }
}

export const validateCode = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        let dataSend = {
            phone: +data.phone,
            code: data.verificationCode
        }
        console.log('dataSend', dataSend)
        const response = await postValidateCode(dataSend)
        if(response?.data?.id){
            //usuario encontrado, debe iniciar sesión
            await saveTokens(response?.data?.access_token, response?.data)
            dispatch({type: LOGIN_SUCCESS, payload: response?.data})
        }
        //if(response?.data?.status === 'incorrect') dispatch({type: VALIDATE_CODE_FAILED, message:'Código incorrecto'})
        //else dispatch({type: VALIDATE_CODE_SUCCESS, message:'Verificación exitosa'})
        console.log('response validate',response)
    } catch (e) {
        if(e?.response?.status === 404){
            dispatch({type: VALIDATE_CODE_SUCCESS_ONBOARDING, message:'Verificación exitosa'})
        }else{
            dispatch({type: VALIDATE_CODE_FAILED, message:'Ocurrio un error, intenta más tarde'})

        }
        console.log('error al validar codigo',e)
    }
}

export const onRegisterUser = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        let dataSend = {
            ...data,
            device: {
                "token": data.expoToken,
                "os": data.os
            },
            username: data.phone,
            profile_picture: null,
            is_staff: false,
            is_active: true,
            is_superuser: false,
            group_id:null,
            branches:[]
        }
        delete dataSend.expoToken
        delete dataSend.os
        console.log('dataSend',dataSend)
        const response = await postRegisterUser(dataSend)
        if(response?.data?.id) dispatch({type: REGISTER_SUCCESS, payload: response?.data})
            else dispatch({type: REGISTER_FAILED, message: 'Ocurrio un error al registrar usuario'})
        console.log('dataRegister', response?.data)
    } catch (e) {
        console.log('error registrr usuario',e)
        dispatch({type: REGISTER_FAILED, message: 'Ocurrio un error al registrar usuario'})
    }
}

export const loginAction = (data) => async(dispatch) => {
    dispatch({type: LOADING})
    if(data?.id){
        await saveTokens(data?.access_token, data)
        dispatch({type: LOGIN_SUCCESS, payload: data})
    }else{
       dispatch({type: LOGIN_FAILED, message: 'Error al iniciar sesión'})
    }
}

export const createSession = () => async(dispatch) => {
    try {
        const user = await AsyncStorage.getItem('user');
        if(JSON.parse(user)){
            dispatch({type: LOGIN_SUCCESS, payload: JSON.parse(user)})
        }
    } catch (error) {
        console.log('error al obtner sesión',e)
    }
}

export const logoutAction = () => async(dispatch) => {
    try {
        await AsyncStorage.removeItem('accessToken')
        //await AsyncStorage.removeItem('refreshToken')
        await AsyncStorage.removeItem('user')

        dispatch({type: LOGOUT})

    } catch (e) {
        console.log('error al cerrar session', e);
    }
}

export const resetValidateCode = () => {
    return{
        type: RESET_VALIDATE
    }
}

export default authDuck;