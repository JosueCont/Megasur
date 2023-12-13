import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const baseURL = 'https://api.megasur.hiumanlab.mx';

let config = {
    baseURL:baseURL,
    headers: {
        Accept: "application/json",
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
});

APIKit.interceptors.response.use((config)  => config)

export const axiosPost = async (url, data) => {
    return await APIKit.post(`${url}`, data)
}


export const axiosGet = async (url, params = '') => {
    return await APIKit.get(`${url}${params}`);
}
