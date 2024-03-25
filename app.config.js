const commonConfig = {
    "name": "megasur",
    "owner": "hiuman",
    "slug": "megasur",
    "scheme":'megasur',
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "url": "https://u.expo.dev/aa1051a6-740e-4053-9c7a-e75f66a09e17"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "web": {
        "favicon": "./assets/icon.png"
    },
    "runtimeVersion": {
        "policy": "sdkVersion"
    },
    "plugins": [
        [
          "expo-av",
          {
            "microphonePermission": "Allow megasur to access your microphone."
          }
        ],
        [
          "expo-location",
          {
            "locationAlwaysAndWhenInUsePermission": "Allow megasur to use your location.",
            "NSLocationAlwaysUsageDescription" : 'Los datos proporcionados serán utilizados exclusivamente para validar la sucursal de canje y garantizar la seguridad en la generación de códigos en dicha sucursal.'
          }
        ],
        [
          "expo-image-picker",
          {
            "photosPermission": "La aplicación accede a tu galeria."
          }
        ],
        [
          "expo-media-library",
          {
            "photosPermission": "Permitir a Megasur acceder a tus fotos.",
            "savePhotosPermission": "Permitir a Megasur guardar fotos.",
            "isAccessMediaLocationEnabled": true
          }
        ]
    ],
    
    "extra": {
      "eas": {
        "projectId": "aa1051a6-740e-4053-9c7a-e75f66a09e17"
      }
    }
  
}

const android = {
  "adaptiveIcon": {
      //"foregroundImage": "./assets/icon.png",
      "backgroundColor": "#ffffff"
  },
  "permissions": [
    "'android.permission.ACCESS_FINE_LOCATION"
  ],
  "softwareKeyboardLayoutMode":'pan'
}

const ios = {
    "supportsTablet": false,
    "usesAppleSignIn": true,
    "infoPlist": {
      "NSLocationAlwaysUsageDescription" : 'Los datos proporcionados serán utilizados exclusivamente para validar la sucursal de canje y garantizar la seguridad en la generación de códigos en dicha sucursal.'
    }
}

const version = "1.0.0"
const versionBuildApp = 1;
const versionAndroidApp = 1;

module.exports = () => {
    if(process.env.APP_ENV === "ios") {
        return {
            ...commonConfig,
            "version": version,
            ios: {...ios,'buildNumber':versionBuildApp.toString()},
        };
    }else if(process.env.APP_ENV === "android") {
        return {
            ...commonConfig,
            "version": version,
            android: {...android, 'versionCode': versionAndroidApp}
        };
    }else if(process.env.APP_ENV === 'expo'){
        return{
            ...commonConfig,
            "version": version,
            android : {...android, 'versionCode': versionAndroidApp},
            ios: {...ios,'buildNumber':versionBuildApp.toString()}
        }
    }
}
