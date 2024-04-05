import { deleteRfc, getCfdiUse, getTaxRegimen, getUserRfc, postCreateRfc, putAutoInvoicing, putRfc } from "../../utils/services/ApiApp";

const LOADING = 'loading_invoicing'
const LOADING_UPDATE= 'loading_update_invoicing'
const SET_REGIMEN = 'set_regimen'
const SET_CFDI_USE = 'set_cfdi_use'
const CHANGE_VALUE = 'change_value_invoicing'
const SET_RFC_USER = 'set_rfc_user'
const SAVE_SUCCESS = 'save_rfc_success'
const SAVE_FAILED = 'save_rfc_fail'
const UPDATE_RFC = 'update_rfc'
const CLEAN_VALUES = 'clean_values_invoicing'
const DELETE_SUCCESS = 'delete_success_rfc'
const DELETE_FAILED = 'delete_failed_rfc'
const DISABLED = 'disabled'
const UPDATE_INVOICING_SUCCESS = 'update_auto_invoi_success'
const UPDATE_INVOICING_FAIL = 'update_auto_invoi_fail'

const initialState = {
    loading: false,
    loadingUpdate:false,
    regimens:[],
    listCfdi:[],
    listRfc:[],
    rfc:'',
    cp:'',
    name:'',
    use:'',
    tax_regime: null,
    modalSucces: false,
    modalFailed: false,
    message:'',
    modalDelete:false,
    isFinishAction: false,
    autoInvoicing:false,
    auto_invoicing: false,
    disableAutoInvoicing: false
}

const invoicingDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case LOADING_UPDATE:
            return{ ...state, loadingUpdate: true}
        case SET_REGIMEN:
            return{ ...state, regimens: action.payload }
        case SET_CFDI_USE:
            return{ ...state, listCfdi: action.payload}
        case CHANGE_VALUE:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case SET_RFC_USER:
            return{ ...state, listRfc: action.payload, loading: false, auto_invoicing: action.auto, disableAutoInvoicing: action.disableInvoicing }
        case SAVE_SUCCESS:
            return{ ...state, loadingUpdate: false, modalSucces: true, message: action.payload}
        case SAVE_FAILED:
            return{ ...state, loading: false, modalFailed: true, message: action.payload}
        case UPDATE_RFC:
            return{ ...state, 
                tax_regime: action.payload.tax_regime, 
                rfc: action.payload.rfc, 
                name: action.payload.name, 
                cp: action.payload.cp,
                use: action.payload.use
            }
        case CLEAN_VALUES:
            return{ ...state, ...initialState}
        case DELETE_SUCCESS:
            return{ ...state, loading: false, modalDelete: false, isFinishAction: true}
        case DELETE_FAILED:
            return{ ...state, loading: false, modalDelete: false, modalFailed: true, message: action.payload}
        case DISABLED:
            return{ ...state, disableAutoInvoicing: true}
        case UPDATE_INVOICING_SUCCESS:
            return{ ...state, auto_invoicing: action.payload, disableAutoInvoicing: false}
        case UPDATE_INVOICING_FAIL:
            return{ ...state, auto_invoicing: action.payload, disableAutoInvoicing: false}
        default:
            return state;
    }
}

export const changeVariable = ({prop, value}) => {
    return{
        type: CHANGE_VALUE,
        payload: { prop,value }
    }
}

export const getDataInvoicing = () => async(dispatch) => {
    try {
        Promise.all([
            dispatch(getRegimen()),
            dispatch(getCfdi())
        ])
    } catch (e) {
        
    }
}

const getRegimen = () => async(dispatch) => {
    try {
        const response = await getTaxRegimen();
        //console.log('regimen', response?.data)
        dispatch({type: SET_REGIMEN, payload: response?.data})
    } catch (e) {
        console.log('error reg',e)
    }
}

const getCfdi = () => async(dispatch) => {
    try {
        const response = await getCfdiUse();
        //console.log('cfdi', response?.data)
        dispatch({type: SET_CFDI_USE, payload: response?.data})
    } catch (e) {
        console.log('error ',e)
    }
}

export const getListUserRfc = (autoInvocing) => async(dispatch) => {
    try {
        let invocing = false
        dispatch({type: LOADING})
        const response = await getUserRfc()
        if(response?.data.length > 0){
            const isBlocked = response?.data.filter(item => item.is_default)
            invocing = isBlocked.length > 0 ? false : true
        }
        dispatch({
            type: SET_RFC_USER, 
            payload: response?.data,
            auto: autoInvocing, 
            disableInvoicing: invocing
        })
    } catch (e) {
        console.log('error r',e)
    }
}

export const onSaveRFC = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING_UPDATE})
        //console.log('dtaSend',data)
        const response = await postCreateRfc(data)
        dispatch({type: SAVE_SUCCESS, payload: `Se ha agregado correctamente el rfc ${response?.data?.rfc}` })
        //console.log('response',response?.data)
    } catch (e) {
        console.log('error',e)
        dispatch({type: SAVE_FAILED, payload:'Ha ocurrido un error al registrar ell rfc, inténtalo otra vez'})
    }
}

export const updateAction = (data) => {
    return{
        type: UPDATE_RFC,
        payload:data
    }
}

export const cleanValues = () => {
    return{
        type: CLEAN_VALUES
    }
}

export const updataRfc = (id,data) => async(dispatch) => {
    try {
        dispatch({type: LOADING_UPDATE})
        const response = await putRfc(data, id)
        dispatch({type: SAVE_SUCCESS, payload: `Se ha actualizado correctamente el rfc` })

    } catch (e) {
        console.log('error',e)
        dispatch({type: SAVE_FAILED, payload: e?.response?.data?.detail || 'Ha ocurrido un error al actualizar el rfc, inténtalo otra vez'})

    }
}

export const onDeleteRfc = (id) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const response = await deleteRfc(id)
        dispatch({type: DELETE_SUCCESS})
    } catch (e) {
        console.log('error',e)
        dispatch({type: DELETE_FAILED, payload: 'Ha ocurrido un problema al eliminar, inténtalo de nuevo'})
    }
}

export const updateAutoInvoicing = (autoInvoice) => async(dispatch) => {
    try {
        dispatch({type: DISABLED})
        const response = await putAutoInvoicing()
        dispatch({type: UPDATE_INVOICING_SUCCESS, payload: autoInvoice})
        //console.log('autoinvi¿oicing',response?.data)
    } catch (e) {
        dispatch({type: UPDATE_INVOICING_FAIL, payload: !autoInvoice})
        console.log('error autoI', e)
    }
}

export default invoicingDuck;