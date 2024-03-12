import { deleteNotifications, getBadgeNotifications, getNotifications, postReadNotification } from "../../utils/services/ApiApp"

const LOADING = 'loading'
const SET_NOTIFICATIONS = 'set_notifications'
const GET_BADGE = 'get_badge'
const GET_NOTIFICATIONS = 'get_notifications'
const READ_NOTIFICATION = 'read_notification'
const DELETE_NOTIFICATION = 'delete_notification'

const REFRESH = 'refresh_notification'

const initialState = {
    loading: false,
    notifications:[],
    badge:0,
    refresh:false
}

const notificationsDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case GET_BADGE:
            return{ ...state, badge: action.payload}
        case GET_NOTIFICATIONS:
            return{ ...state, notifications: action.payload, refresh: false}
        case DELETE_NOTIFICATION:
            return{ ...state, notifications: state.notifications.filter(item => item.id !== action.payload)}
        case READ_NOTIFICATION:
            return{ ...state,
                notifications: state.notifications.map(item => {
                    if (item.id === action.payload) {
                      return { ...item, read: true };
                    }
                    return item;
                })
            }
        case REFRESH:
            return{ ...state, refresh: true}
        default:
            return state;
    }
}

export const getUserNotifications = (data) => async(dispatch) => {
    try {
        const response = await getNotifications(data)
        //console.log('notificaciones',response?.data)
        dispatch({type: GET_NOTIFICATIONS, payload: response?.data?.notifications})
    } catch (e) {
        console.log('error notif',e)
    }
}

export const getCountNotifications = () => async(dispatch) => {
    try {
        const response = await getBadgeNotifications();
        //console.log('badge', response?.data)
        dispatch({type: GET_BADGE, payload: response?.data?.count})
    } catch (e) {
        console.log('error bad',e)
    }
}

export const onDeleteNotification = (id) => async(dispatch) => {
    try {
        await dispatch({type: DELETE_NOTIFICATION, payload: id})
        const response = await deleteNotifications(id)
        //console.log('delete noti', response?.data)
    } catch (e) {
        console.log('error al eliminar noti',e)
    }
}

export const deleteNotification = (notificationId) => {
    return {
      type: DELETE_NOTIFICATION,
      payload: notificationId
      
    };
};

export const onNotificationAsRead = (notificationId) => async(dispatch) => {
    try {
        const response = await postReadNotification(notificationId)
        await dispatch({type: READ_NOTIFICATION, payload: notificationId})
    } catch (error) {
        console.log('error read',error)
    }
};

export const refreshNotificationScreen = () => {
    return{
        type: REFRESH,
    }
}

export default notificationsDuck;