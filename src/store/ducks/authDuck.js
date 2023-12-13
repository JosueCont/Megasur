import AsyncStorage from "@react-native-async-storage/async-storage";

const CHANGE_INPUT = 'change_input';
const UPDATE_VERIFICATION_CODE = 'update_verification_code';
const CHANGE_MODAL = 'change_modal'

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
    modalFailed: false
}

const authDuck = (state = initialState, action) => {
    switch(action.type){
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
export default authDuck;