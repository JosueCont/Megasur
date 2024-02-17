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
              "locationAlwaysAndWhenInUsePermission": "Allow megasur to use your location."
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
