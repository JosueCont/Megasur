import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Modal, Alert} from "react-native";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import { Feather, Ionicons, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons'; 
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'
import Constants from 'expo-constants';


const CameraComponent = ({visible, onSavePhoto, onClose, typePhoto}) => {
    const [cameraPermissions, setCameraPermissions] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const cameraRef = useRef(null)

    useEffect(() => {
        (async() => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setCameraPermissions(cameraStatus.status === 'granted')
        })();
    },[])

    if(cameraPermissions === false) return <Text>No tienes permiso para la camará</Text>

    const takePicture = async () => {
        if (cameraRef) {
          try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
            setImage(data.uri);
          } catch (error) {
            console.log(error);
          }
        }
    };

    const savePicture = async () => {
        if (image) {
          try {
            const asset = await MediaLibrary.createAssetAsync(image);
            Alert.alert(
                'Aviso',
                '¡Imagen guardada en Galería!',
                [
                    {text:'Continuar', onPress: () => console.log('onPress')}
                ]
            );
            onSavePhoto(image, typePhoto)
            setImage(null);
            //console.log('saved successfully');
          } catch (error) {
            console.log(error);
          }
        }
    };

    return(
        <Modal visible={visible} transparent animationType='slide'>
            <View style={styles.container}>
                {!image ? (
                    <Camera 
                        style={styles.camera}
                        type={type}
                        ref={cameraRef}
                        flashMode={flash}>
                            <View style={styles.contBtnCamera}>
                                <TouchableOpacity onPress={onClose}>
                                    <AntDesign name="close" size={24} color={Colors.white} />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setFlash( 
                                            flash === Camera.Constants.FlashMode.off
                                            ? Camera.Constants.FlashMode.on
                                            : Camera.Constants.FlashMode.off
                                        )}
                                    }>
                                    <Entypo name="flash" size={24} color={flash === Camera.Constants.FlashMode.off ? Colors.white : Colors.orange} />
                                </TouchableOpacity>
                            </View>
                    </Camera>

                ):(
                    <Image source={{ uri: image }} style={styles.camera} />
                )}
                <View style={styles.controls}>
                    {!image ? (
                        <>
                            <TouchableOpacity style={styles.btnTakePhoto} onPress={() => takePicture()}>
                                <Feather name="camera" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => {
                                    setType(
                                      type === CameraType.back ? CameraType.front : CameraType.back
                                    );
                                }}
                                style={{position:'absolute', right:10}}>
                                <Ionicons name="md-sync-circle" size={35} color={Colors.white} />
                            </TouchableOpacity>
                        
                        </>
                    ):(
                        <>
                            <TouchableOpacity style={[styles.btnTakePhoto,{backgroundColor: Colors.blueGreen}]} onPress={() => savePicture()}>
                                <Feather name="save" size={30} color={Colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{position:'absolute', right:10}} onPress={() => setImage(null)}>
                                <MaterialIcons name="cancel" size={35} color={Colors.white} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>


        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000',
        padding: 8,
    },
    controls:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        flex:1
    },
    camera:{
        flex:5, 
        borderRadius:20
    },
    btnTakePhoto:{
        backgroundColor: Colors.gray, 
        borderRadius:35, 
        width:70, 
        height:70, 
        justifyContent:'center', 
        alignItems:'center'
    },
    contBtnCamera:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems:'flex-end',
        paddingHorizontal: 30,
        paddingTop:10
    
    }
})

export default CameraComponent;