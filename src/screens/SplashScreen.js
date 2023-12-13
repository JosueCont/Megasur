import React,{useState} from "react";
import { StyleSheet } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { hideAsync } from "expo-splash-screen";


const SplashScreen = ({onComplete}) => {
    const [lastStatus, setStatus] = useState(false);

    const onStatusUpdate = (status) => {
        if(status.isLoaded){
            if(lastStatus !== status.isLoaded) hideAsync()

            if(status?.didJustFinish) onComplete(false)
        }
    }

    return(
        <Video 
            source={require('../../assets/splashMegasur.mp4')}
            style={StyleSheet.absoluteFill}
            resizeMode={ResizeMode.COVER}
            onPlaybackStatusUpdate={onStatusUpdate}
            isLooping={false}
            shouldPlay

        />
    )
}

export default SplashScreen;