import moment from "moment"
import { getBranches, getInfoBranch, getTransactions, putInvoicingTransaction, putRateCharge } from "../../utils/services/ApiApp"

const LOADING = 'loading_char'
const LOADING_MODAL = 'loading_modal'
const CHANGE_INPUT = 'change_input_char'
const CHANGE_MODAL = 'change_modal_char'
const UPDATE_INFO_CHARGE = 'update_info_charge'
const GET_CHARGES_FUEL = 'get_charges_fuel'
const REFRESH_FILTERS = 'refresh_filters_charges'
const RATE_CHARGE_SUCCESS = 'rate_charge_success'
const RATE_CHARGE_FAILED = 'rate_charge_failed'
const RESET_RATE = 'reset_israte'
const INVOICING_CHARGE_SUCCESS = 'invoicing_charge_success'
const INVOICING_CHARGE_FAILED = 'invoiving_charge_fail'

const REFRESH = 'refresh_charge'

const initialState = {
    loading: false,
    loadingModal: false,
    comment:'',
    infoCharge:null,
    modalActive: false,
    modalSuccess:false,
    modalFailed:false,
    fuelCharges:[],
    branches:[],
    typeFuel:'',
    branchName:'',
    message:'',
    isRate:false,
    refresh: false,
    isInvoincing:false
}

const chargesDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case LOADING_MODAL:
            return{ ...state, loadingModal:true}
        case REFRESH:
            return{ ...state, refresh: true}
        case CHANGE_INPUT:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case UPDATE_INFO_CHARGE:
            return{ ...state, infoCharge: action.payload}
        case GET_CHARGES_FUEL:
            return{ ...state, fuelCharges: action.payload.chargesMonth, branches: action.payload.branches, loading: false, refresh: false}
        case REFRESH_FILTERS:
            return{ ...state, typeFuel:'', branchName:''}
        case RATE_CHARGE_SUCCESS:
            return{ ...state, isRate: action.payload,}
        case RATE_CHARGE_FAILED:
            return{ ...state, modalFailed: true, message: action.payload}
        case RESET_RATE:
            return{ ...state, isRate: false, modalSuccess: false, }
        case INVOICING_CHARGE_SUCCESS:
            return{ ...state, modalSuccess: true, message: action.payload}
        case INVOICING_CHARGE_FAILED:
            return{ ...state, modalFailed:true, message: action.payload}
        default:
            return state;
    }
}


export const changeInputCharges = ({prop, value}) => {
    return{
        type: CHANGE_INPUT,
        payload: {prop, value}
    }
}

export const changeModalCharges = ({prop, value}) => {
    return{
        type: CHANGE_MODAL,
        payload: {prop, value}
    }
}

export const updateInfoCharge = (data) => {
    return{
        type: UPDATE_INFO_CHARGE,
        payload: data
    }
}

export const getCharges = (filters='', options, isInitial=false) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const response = await getTransactions(filters);
        let chargesMonth = []
        let branches = !isInitial ? options: []
        const uniqueBranches = new Set();
        if(response?.data?.items.length > 0 ){
            response?.data?.items.forEach((charge,index) => {
                let dateFuel = moment(charge.fuel_datetime).format('MMMM YYYY') 
                const existMonth = chargesMonth.find((month) => month.title === dateFuel)
                //charge.name = `Sucursal Itzáes ${index+1}`//getName(charge.branch_id)
                if(!existMonth){
                    chargesMonth.push({
                        title: dateFuel,
                        charges: [charge]
                    })
                }else{
                    existMonth?.charges?.push(charge)
                }

                if(isInitial){
                    if (!uniqueBranches.has(charge.branch_id)) {
                        uniqueBranches.add(charge.branch_id);
                        branches.push({ value: charge.branch_id, label: charge.branch?.name });
                    }
                }
            })

            chargesMonth.sort((a,b) => {
                const dateA = moment(a.title, 'MMMM YYYY');
                const dateB = moment(b.title, 'MMMM YYYY');
                return dateB - dateA; 
            })
        }else{
            if(isInitial){
                const response = await getBranches('?page=1&per_page=10')
                if(response?.data?.items?.length > 0){
                    response?.data?.items.forEach((charge) => {
                        if (!uniqueBranches.has(charge.id)) {
                            uniqueBranches.add(charge.name);
                            branches.push({ value: charge.id, label: charge.name });
                        }
                    })
                }
            }
        }
        //console.log('cargas',chargesMonth)
        dispatch({type: GET_CHARGES_FUEL, payload: {chargesMonth, branches}})
    } catch (e) {
        console.log('error cargas',e)
    }
}

const getName = async(id) => {
    try {
        const response = await getInfoBranch(id)
    } catch (e) {
        console.log('error nombre',e)
    }
}

export const refreshFilters = () => {
    return{
        type: REFRESH_FILTERS
    }
}

export const onRateCharge = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING_MODAL})
        let dataSend = {
            "score": data?.stars,
            "score_comment": data?.comment
        }
        const response = await putRateCharge(dataSend, data?.charge?.id)
        if(response?.data?.id) dispatch({type: RATE_CHARGE_SUCCESS, payload: !data?.isRate})
    } catch (e) {
        dispatch({type: RATE_CHARGE_FAILED, payload:'Error al calificar la carga'})
        console.log('error',e)
    }
}

export const refreshAction = () => {
    return{
        type: REFRESH
    }
}

export const onResetRate = () => {
    return{
        type: RESET_RATE,
    }
}

export const invoicingFuelTransaction = (id) => async(dispatch) => {
    try {
        const response = await putInvoicingTransaction(id)
        dispatch({
            type: INVOICING_CHARGE_SUCCESS,
            payload:'Factura generada correctamente'
        })
    } catch (e) {
        dispatch({
            type: INVOICING_CHARGE_FAILED, 
            payload: e?.response?.data?.detail
        })
        console.log('error',e)
    }
}
export default chargesDuck