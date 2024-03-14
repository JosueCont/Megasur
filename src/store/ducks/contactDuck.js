import { getFrecuentQuestion, postSendEmail } from "../../utils/services/ApiApp"

const LOADING = 'loading'
const GET_QUESTIONS = 'get_frequent_questions'
const CHANGE_VALUE = 'change_value_contact'
const SEND_MAIL_SUCCESS = 'send_mail_success'
const SEND_MAIL_FAILED = 'send_mail_failed'
const CLEAN = 'clean_contact'

const initialState = {
    loading: false,
    refresh: false,
    questions:[],
    question:'',
    comment:'',
    isSentMail: false,
    modalFailed: false,
    message:''
}

const contactDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case GET_QUESTIONS:
            return{ ...state, loading:false, questions: action.payload}
        case CHANGE_VALUE:
            return{ ...state, [action.payload.prop] : action.payload.value}
        case SEND_MAIL_SUCCESS:
            return{ ...state, loading: false, question:'', comment:'', isSentMail: true, message: action.payload}
        case SEND_MAIL_FAILED:
            return{ ...state, loading: false, modalFailed: true, message: action.payload, comment:'', question:''}
        case CLEAN:
            return{ ...state, isSentMail: false, message:''}
        default:
            return state
    }
}

export const changeValueContact = ({prop, value}) => {
    return{
        type: CHANGE_VALUE,
        payload: { prop,value }
    }
}

export const getQuestions = () => async(dispatch) => {
    try {
        const response = await getFrecuentQuestion()
        dispatch({type: GET_QUESTIONS, payload: response?.data || []})
    } catch (e) {
        console.log('error ques',e)
    }
}

export const onSendMail = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        let dataSend ={
            title: data.question,
            description: data.comment
        }
        const response = await postSendEmail(dataSend)
        dispatch({type: SEND_MAIL_SUCCESS, payload: 'Hemos recibido tu mensaje, en breve nos pondremos en contacto contigo vía correo electrónico o llamada telefónica.'})
    } catch (e) {
        console.log('error mail',e)
        dispatch({type: SEND_MAIL_FAILED, payload:'Ha ocurrido un error, vuelve a intentarlo'})
    }
}

export const cleanContact = () => {
    return{
        type: CLEAN
    }
}
export default contactDuck;