import AsyncStorage from "@react-native-async-storage/async-storage";
import { postValidateCode, postVerifyPhone } from "../../utils/services/ApiApp";

const CHANGE_INPUT = 'change_input';
const UPDATE_VERIFICATION_CODE = 'update_verification_code';
const CHANGE_MODAL = 'change_modal';
const LOADING = 'loading';
const CANCEL_LOADING = 'cancel_loading'

const VERIFY_PHONE_SUCCESS = 'verify_phone_sucess'
const VERIFY_PHONE_FAILED = 'verify_phone_failed'
const VALIDATE_CODE_SUCCESS = 'validate_code_succes'
const VALIDATE_CODE_FAILED = 'validate_code_failed'

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
    message:''
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
            return{ ...state, [action.payload.prop]:action.payload.value}
        case VERIFY_PHONE_SUCCESS:
            return{ ...state, isValidPhoneNumber: true, loading: false}
        case VALIDATE_CODE_SUCCESS:
            return{ ...state, loading:false, modalSucces: true, message: action.message }
        case VALIDATE_CODE_FAILED:
            return{ ...state, loading: false, modalFailed: true, message: action.message}
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
        dispatch({type: LOADING})
        let dataSend = {
            phone: +data
        }
        console.log('dataSend',dataSend)
        const response = await postVerifyPhone(dataSend)
        console.log('response', response?.data)
        if(response?.data.sent_to === dataSend.phone) dispatch({type: VERIFY_PHONE_SUCCESS, })
    } catch (e) {
        console.log('error verificar numero',e)
        dispatch({type: CANCEL_LOADING})
    }
}

export const validateCode = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        let dataSend = {
            phone: +data.phone,
            code: data.verificationCode
        }
        const response = await postValidateCode(dataSend)
        if(response?.data?.status === 'incorrect') dispatch({type: VALIDATE_CODE_FAILED, message:'Código incorrecto'})
        else dispatch({type: VALIDATE_CODE_SUCCESS, message:'Verificación exitosa'})
        console.log('dataSend',response?.data)
    } catch (e) {
        console.log('error al validar codigo',e)
    }
}
export default authDuck;