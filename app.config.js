const commonConfig = {
    "name": "megasur",
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
    "assetBundlePatterns": [
      "**/*"
    ],
    "web": {
        "favicon": "./assets/icon.png"
    },
    "plugins": [
        [
          "expo-av",
          {
            "microphonePermission": "Allow megasur to access your microphone."
          }
        ]
      ]
}

const android = {
    "adaptiveIcon": {
        //"foregroundImage": "./assets/icon.png",
        "backgroundColor": "#ffffff"
    }
}

const ios = {
    "supportsTablet": false,
    "usesAppleSignIn": true,
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
