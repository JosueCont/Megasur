import { getCards, getCardsExchange, getSiteConfig, getSurveys, getSurveysTotal, getTotalPoints, postSurveys, postValidateOTP } from "../../utils/services/ApiApp"
import { createDigest, createRandomBytes } from "@otplib/plugin-crypto-js"
import { keyDecoder, keyEncoder } from "@otplib/plugin-base32-enc-dec"
import { totpToken, totpOptions, KeyEncodings } from "@otplib/core" 
import base32Encode from 'base32-encode'

const CHANGE_MODAL = 'change_modal'
const CHANGE_INPUT = 'change_input'
const SETUP_DATA_CONFIG = 'setup_data_config'
const LOADING = 'loading_home'

const SET_CODE = 'set_code'
const SET_TIME = 'set_time'
const UPDATE_AUTO_RUNNING = 'update_auto_running'

const SAVE_LOCAL_STORAGE = 'save_localStorage'
const SET_SURVEYS = 'set_serveys'
const SET_TOTAL_SURVEYS = 'set_total_serveys'
const ERROR_SURVEYS = 'error_serveys'
const ADD_RESPONSES = 'add_responses'

const SET_CURRENT_QUESTION_INDEX = 'set_index_question'
const ADD_NEW_SCREEN = 'add_new_screen'
const CLEAN_SURVEY = 'clean_survey'
const ANSWER_SURVEY_SUCCESS = 'answer_survey_success'
const ANSWER_SURVEY_FAILED = 'answer_survey_failed'
const CLEAN_AFTER_NAVIGATION = 'clean_after_navigation'
const SET_POINTS = 'set_points'


const initialState = {
    modalQuizz: false,
    comment:'',
    setupData:null,
    isRunning: false, 
    code:'',
    minutes:0,
    seconds:0,
    loading:false,
    cardsStorage:[],
    userStorage:null,
    surveys:[],
    totalSurveys:0,
    responses:[],
    currentQuestionIndex:1,
    isFinish:false,
    answerSuccess:false,
    modalFailed:false,
    message:'',
    points:0,
    modalScreenShot: false
}

const homeDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]:action.payload.val}
        case CHANGE_INPUT:
            return{ ...state, [action.payload.prop]: action.payload.val}
        case SETUP_DATA_CONFIG:
            return{ ...state, setupData: action.payload }
        case SET_CODE:
            return{ ...state, code: action.payload, loading: false, isRunning: true}
        case SET_TIME:
            return{ ...state, minutes: action.minutes, seconds: action.seconds}
        case UPDATE_AUTO_RUNNING:
            return{ ...state, isRunning: false}
        case SAVE_LOCAL_STORAGE:
            return{ ...state, cardsStorage: action.payload.cards}
        case SET_TOTAL_SURVEYS:
            return{ ...state, totalSurveys: action.payload}
        case SET_SURVEYS: 
            return{ ...state, surveys: action.payload, loading: false} //Quitar [] cuando regrese array
        case ERROR_SURVEYS:
            return{ ...state, loading: false}
        case ADD_RESPONSES:
            return{ ...state, responses:[...state.responses, action.payload]}
        case SET_CURRENT_QUESTION_INDEX:
            return{ ...state, currentQuestionIndex: action.payload,}
        case ADD_NEW_SCREEN:
            return{ ...state, isFinish: true}
        case CLEAN_SURVEY:
            return{ ...state, currentQuestionIndex:1, isFinish: false, responses:[] }
        case CLEAN_AFTER_NAVIGATION:
            return{ ...state,  answerSuccess: false}
        case ANSWER_SURVEY_SUCCESS:
            return{ ...state, answerSuccess: true, loading: false, modalQuizz:false,}
        case ANSWER_SURVEY_FAILED:
            return{ ...state, answerSuccess: false, loading: false, isFinish: false, modalQuizz: false, modalFailed: true, message: action.payload }
        case SET_POINTS:
            return{ ...state, points: action.payload}
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
        //console.log('response',response?.data)
    } catch (e) {
        console.log('error',e)
    }
}

export const getQrCode = ({isRunning, user, cards, timer}) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        let counter = 30//timer * 60;
        let card_code = cards[0]?.code
        if(!isRunning){
            const secret = convertBase32(`${user.id.toString()}${user.user_code}${card_code}`);
            const totp = totpToken(
                keyDecoder(secret, KeyEncodings.UTF8),
                totpOptions({
                  createDigest,
                  encoding: KeyEncodings.ASCII
                })
            );
            let dataSend = {
                user_card: cards[0]?.user_card_id,
                otp: totp
            }
            //const response = await postValidateOTP(dataSend)
            console.log('response otp validtion', totp)
            dispatch({type: SET_CODE, payload: JSON.stringify(dataSend)})
            if(totp != ''){
                dispatch(getCounter(counter))
            }

        }
    } catch (e) {
        console.log('eror al crear codigo qr',e)
    }
}

const convertBase32 = (hexString) => {
    const hexBytes = Buffer.from(hexString, 'ascii');
    const base32String = base32Encode(hexBytes, 'RFC4648');

    return base32String;
}

const getCounter = (counter) => dispatch => {
    const countdownInterval = setInterval(() => {
        if (counter >= 0) {
          const minutes = Math.floor(counter / 60); // Obtener minutos
          const seconds = counter % 60; // Obtener segundos
          dispatch({type: SET_TIME, minutes:  minutes, seconds: seconds})
          //console.log(`${minutes} minutos ${seconds} segundos`); // Mostrar tiempo
      
          counter--; // Decrementar el contador en segundos
        } else {
          clearInterval(countdownInterval); // Detener el contador cuando llegue a cero
          console.log('Tiempo terminado');
          setTimeout(() => {
              dispatch({type: UPDATE_AUTO_RUNNING })
          },500)
        }
    }, 1000);
}

export const autoGenerateQr = () => {
    return{
        type: UPDATE_AUTO_RUNNING
    }
}

export const getAllCards = (userId) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        //console.log('enviado',userId)
        const response = await getCards(userId)
        //console.log('cards',response?.data)
    } catch (e) {
        console.log('error obtener cardId',e)
    }
}

export const saveDataLocalStorage = (cards) => async(dispatch) => {
    try {
        dispatch({
            type: SAVE_LOCAL_STORAGE, 
            payload: cards
        })
    } catch (e) {
        
    }
}

export const getAllSurveys = () => async(dispatch) => {
    try {
        Promise.all([
            dispatch(getTotalSurveys()),
            dispatch(getListSurveys())
        ])
    } catch (e) {
        console.log('error surve',e)
    }
}

export const getTotalSurveys = () => async(dispatch) => {
    try {
        const response = await getSurveysTotal();
        //console.log('response stotalurveys',response?.data)
        dispatch({type: SET_TOTAL_SURVEYS, payload: response?.data})

    } catch (e) {
        console.log('error surve',e)
        dispatch({type: ERROR_SURVEYS})


    }
}

export const getListSurveys = () => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const response = await getSurveys();
        dispatch({type: SET_SURVEYS, payload: response?.data})
    } catch (e) {
        console.log('err',e)
        dispatch({type: ERROR_SURVEYS})
    }
}

export const addResponsesData = (data, currentIndex, totalQuestions, quiz_id, isFinish) => dispatch => {
    dispatch(setCurrentQuestionIndex(currentIndex, totalQuestions, data, quiz_id, isFinish))
    //console.log('response',data)
    //return{
    //    type: ADD_RESPONSES,
    //    payload: data
    //}
}

export const saveResponsesSurvey = (quizz_id, responses) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        let dataSend = {
            poll_id: quizz_id,
            responses: responses
        }
        const response = await postSurveys(dataSend)
        dispatch({type: ANSWER_SURVEY_SUCCESS})
    } catch (e) {
        dispatch({type: ANSWER_SURVEY_FAILED, payload: 'Ocurrio un error al enviar respuestas, vuelve a intentarlo'})
        console.log('error',e)
    }
}

export const setCurrentQuestionIndex = (currentIndex, totalQuestions, responses,) => dispatch => {
    dispatch({type: ADD_RESPONSES, payload: responses})
    if (currentIndex < totalQuestions) {
        dispatch({ type: SET_CURRENT_QUESTION_INDEX, payload: currentIndex + 1 });
    } else {
        dispatch({type: ADD_NEW_SCREEN})
    }
};

export const cleanSurvey = () => {
    return{
        type: CLEAN_SURVEY
    }
}

export const cleanAfterNavigation = () => {
    return{
        type: CLEAN_AFTER_NAVIGATION
    }
}

export const getPointsCard = (cardId) => async(dispatch) => {
    try {
        const response = await getTotalPoints(cardId)
        
        dispatch({type: SET_POINTS, payload: response?.data?.total })
    } catch (e) {
        console.log('error points',e)
    }
}

export default homeDuck;