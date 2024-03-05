import { getStations } from "../../utils/services/ApiApp";

const LOADING = 'loading_loc'
const GET_STATIONS_SUCCESS = 'get_stations_success'
const GET_STATIONS_FAILED = 'get_stations_failed'
const CHANGE_MODAL = 'change_modal'

const SET_LOCATION_STATION = 'set_location_station'

const initialState = {
    loading: false,
    nearBranches: [],
    branchesZones: [],
    modalLocation:false,
    locationStation:null
}

const locationDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case GET_STATIONS_SUCCESS: 
            return{ ...state, loading: false, nearBranches: action.near_branches, branchesZones: action.branches_by_zone}
        case GET_STATIONS_FAILED:
            return{ ...state, ...initialState}
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]: action.payload.value}
        case SET_LOCATION_STATION:
            return{ ...state, locationStation: action.payload}
        default:
            return state;
    }
}

export const getCloseStations = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const response = await getStations(data?.latitude, data?.longitude)
        console.log('response stations0', response?.data)
        dispatch({
            type: GET_STATIONS_SUCCESS, 
            branches_by_zone: response?.data?.branches_by_zone, 
            near_branches: response?.data?.near_branches 
        })
    } catch (e) {
        console.log('error',e)
        dispatch({type: GET_STATIONS_FAILED})
    }
}

export const onChangeModalLoc = ({prop, value}) => {
    return{
        type: CHANGE_MODAL,
        payload: {prop, value}
    }
}

export const setLocationStation = (coords) => {
    return{
        type: SET_LOCATION_STATION,
        payload: coords
    }
}
export default locationDuck;