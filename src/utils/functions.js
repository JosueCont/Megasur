import { PixelRatio } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Location from "expo-location";

const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size/fontScale;

export const getExpoToken = async() => {
    try {
        let token;
        if (Device.isDevice) {
            const {existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync({'projectId': Constants.expoConfig.extra.eas.projectId,})).data;
            //console.log(token);
        } else {
            console.log('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token || null;
    } catch (e) {
        console.log("registerForPushNotificationsAsync error =>", e.toString())
    }
}

export const getRandomPassword = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
                
    for (let i = 0; i < 16; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indice);
    }
    return resultado;
}

export const saveTokens = async(access, user) => {
    try {
        await AsyncStorage.setItem('accessToken', JSON.stringify(access));
        //await AsyncStorage.setItem('refreshToken', JSON.stringify(refresh));
        await AsyncStorage.setItem('user', JSON.stringify(user));


    } catch (e) {
        console.log('Error al almacenar los tokens',e)   
    }
}

export const getPermissionLocation = async() => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        //setLocationError("Location permission denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      return location
    } catch (e) {
        console.error("Error requesting location permission:", error);
    }
}

export const setFormatNumber =(number) =>  {
    const parts = number.toString().split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';
    
    // Insertar comas cada tres dígitos en la parte entera
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return integerPart + decimalPart;
  }