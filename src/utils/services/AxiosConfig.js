import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postRefreshToken } from './ApiApp';

export const baseURL = 'https://f735-2806-10a6-15-1192-5c2f-4a30-4998-e845.ngrok-free.app'//'https://api.megasur.hiumanlab.mx';

let config = {
    baseURL:baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
};
const timeOut = 120000;

let APIKit = axios.create(config);


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
        //const originalRequest = error.config;
        //if (error.response.status === 401 && !originalRequest._retry){
        //    const dataUser = await AsyncStorage.getItem('user');
        //    let user = JSON.parse(dataUser)
        //    if(user){
        //        const newToken = await postRefreshToken({});
        //        console.log('newToken',newToken)
        //        if (newToken?.data && !originalRequest._retry){
        //            originalRequest._retry = true;
        //            await AsyncStorage.setItem('user',JSON.stringify(newToken?.data));
        //            return APIKit(originalRequest);
        //        }
        //    }else{
        //        return Promise.reject(error)
        //    }
        //}
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