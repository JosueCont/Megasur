import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postRefreshToken } from './ApiApp';
import { logoutAction } from '../../store/ducks/authDuck';
import { getExpoToken } from '../functions';

export const baseURL = 'https://api.megasur.hiumanlab.mx';

let config = {
    baseURL:baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
};
const timeOut = 120000;

let APIKit = axios.create(config);

let store

export const injectStore = _store => {
  store = _store
}

APIKit.defaults.timeout = timeOut;


APIKit.interceptors.request.use(async(config) => {
    try {
        let token = await AsyncStorage.getItem('accessToken');
        if (token) config.headers.Authorization =`Bearer ${JSON.parse(token)}`;
    } catch (e) {
        console.log('APIKit.interceptors.request error =>',e.toString())

    }
    return config;
},async (error) => {
    console.log('reject',error)
    return Promise.reject(error)
});

APIKit.interceptors.response.use((config)  => config,
    async(error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                let oldToken = await AsyncStorage.getItem('user');
                let user = JSON.parse(oldToken)
                const newToken = await postRefreshToken({refresh_token: user?.refresh_token});
                console.log('newToken', newToken)
                if (newToken?.status === 200){
                    await AsyncStorage.setItem('user',JSON.stringify(newToken?.data));
                    await AsyncStorage.setItem('accessToken',JSON.stringify(newToken?.data?.access_token))
                    APIKit.defaults.headers.Authorization = `Bearer ${newToken?.data?.access_token}`;
                    //originalRequest._retry = false

                    return APIKit(originalRequest);
                }
            } catch (e) {
                console.log('error newToken',e)

                //const expotoken = getExpoToken();
                store.dispatch(logoutAction(null))
                //if(e?.response && e?.response.data) {
                    //return Promise.reject(e?.response.data);
                //}
                //return Promise.reject(e);
            }
            
        }
        return Promise.reject(error);

        
    }
)

export const axiosPost = async (url, data) => {
    return await APIKit.post(`${url}`, data)
}


export const axiosGet = async (url, params = '') => {
    return await APIKit.get(`${url}${params}`);
}

export const axiosPut = async(url, data, config={}) => {
    return await APIKit.put(`${url}`, data, config)
}

export const axiosDelete = async(url, data, config={}) => {
    return await APIKit.delete(url)
} 