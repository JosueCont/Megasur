import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Pressable, Platform} from "react-native";
import { Select, Spinner, useToast, Alert, VStack, HStack } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Input from "../CustomInput";
import { Feather } from '@expo/vector-icons'; 
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'
import CameraComponent from "../Camera";
import { onChangeImage, onChangeInputProf, onChangeModalProf, onUpdateDataUser } from "../../store/ducks/profileDuck";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from "moment";
import * as ImagePicker from 'expo-image-picker';
import LottieView from 'lottie-react-native'

const {height, width} = Dimensions.get('window');

const PersonalInfoForm = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [modalCamera, setModaCamera] = useState(false)
    const [typePhoto, setTypePhoto] = useState(null)
    const imageBack = useSelector(state => state.profileDuck.imgBack)
    const imageFront = useSelector(state => state.profileDuck.imgFront)
    const first_name = useSelector(state => state.profileDuck.name)
    const last_name = useSelector(state => state.profileDuck.lastName)
    const phone = useSelector(state => state.profileDuck.phone)
    const email = useSelector(state => state.profileDuck.email)
    const gender = useSelector(state => state.profileDuck.gender)
    const birthDay = useSelector(state => state.profileDuck.birthDay)
    const loader = useSelector(state => state.profileDuck.loading)
    const profile_picture = useSelector(state => state.profileDuck.userImage)
    const [image64, setImage ] = useState('')
    const isValid = useSelector(state => state.profileDuck.isEmailValid)
    const isComplete = useSelector(state => state.profileDuck.isCompleteRegis)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(null);
    const animation = useRef(null);
    const maximumDate = new Date(); // Fecha actual
    maximumDate.setFullYear(maximumDate.getFullYear() - 18)

    const mimes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png'
    }

    useEffect(() => {
        if(birthDay && birthDay != undefined && birthDay != '') {
            setDate(new Date(birthDay))
        }else{
            setDate(new Date())
        }
    },[birthDay])

    useEffect(() => {
        if(isComplete){
            setTimeout(() => {
                dispatch(onChangeModalProf({prop:'isCompleteRegis', value: false}))
            },9000)
        }
    },[isComplete])

    useEffect(() => {
        if(gender != undefined && gender !='') dispatch(onChangeInputProf({prop:'gender', value: gender.toString()}))
        //console.log('genderrr', gender)
    },[gender])

    const onShowDatepicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleDateChange = ({type}, selectedDate) => {
        console.log('event',type)
        setShowDatePicker(false)
        if(type === 'set'){
            const currentDate = selectedDate || date;
            setDate(currentDate);
            if(Platform.OS === 'android'){
                dispatch(onChangeInputProf({prop:'birthDay',value: moment(currentDate).format('YYYY-MM-DD')}))
                //setBirthdayDate(moment(currentDate.toDateString()).format('DD/MM/YYYY'))
                //setShowDatePicker(false)
            }
            //setShowDatePicker(false);

        }else{
            onShowDatepicker()
            console.log('entro aqui')
        }
    };
    
    const confirmIOSDate = () => {
        dispatch(onChangeInputProf({prop:'birthDay',value: moment(date.toDateString()).add(1,'day').format('YYYY-MM-DD')}))
        //setBirthdayDate(moment(date.toDateString()).format('DD/MM/YYYY'))
        onShowDatepicker()
    }

    const onPickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });
        
        if(!result.canceled && result.assets[0].type != 'video' && !result.assets[0].fileName.includes('.GIF')) {
            const selectedAsset = result.assets[0];
            const { uri, width, height, base64 } = selectedAsset;
            let extension = uri.split('.').pop();
            let mime = mimes[extension]
            let imageBinary = `data:${mime};base64,`
            console.log('img a mandar', imageBinary+base64, uri.split('/').reverse()[0])
            setImage({
                name: uri.split('/').reverse()[0],
                type: mimes[extension],
                uri: uri
            })
            dispatch(onChangeInputProf({prop:'userImage', value: result.assets[0].uri}))
        }else{
            toast.show({
                placement:'top',
                render:({id}) =>(
                    <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status='error' variant='solid' backgroundColor={Colors.red} zIndex={1} mt={12}>
                        <VStack space={1} flexShrink={1} w="99%" >
                            <HStack flexShrink={1} alignItems="center" justifyContent="space-between" >
                                <HStack space={2} flexShrink={1} alignItems="center">
                                    <Alert.Icon/>
                                    <Text style={{color: Colors.white, fontSize: getFontSize(15)}}>No es posible seleccionar video o gif, selecciona el formato correcto.</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                )
            })
        }
        
        console.log(result);
    }

    const onUpdate = async() => {
        let dataSend = {
            first_name, last_name, email, phone,
            gender, imageBack, imageFront, //birthday: moment(birthDay).format('YYYY-MM-DD')
        }
        if (birthDay !='' && birthDay != null)
            dataSend.birthday = moment(birthDay, 'YYYY-MM-DD').format('YYYY-MM-DD')
        if(image64 != '') dataSend.profile_picture = image64
        dispatch(onUpdateDataUser(dataSend))
    }
    

    return(
        <View style={styles.container}>
            {isComplete ? (
                <View style={{alignItems:'center'}}>
                    <View style={{width: width, height: height/3,}}>
                        <LottieView
                            autoPlay
                            loop
                            resizeMode="cover"
                            ref={animation}
                            style={{
                                flex:1,
                                //position:'absolute',
                                //top:-40,
                                backgroundColor: 'white',
                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('./../../../assets/Coins.json')}
                        />
                    </View>
                    <Text style={styles.title}>¡Felicidades!</Text>
                    <Text style={styles.subtitle}>¡Has completado los datos de tu perfil!</Text>
                </View>
            ):(
                <>
                <TouchableOpacity style={styles.btnImgProf} onPress={onPickImage}>
                    {profile_picture != null && profile_picture != '' && 
                        profile_picture?.split('/').pop() !== 'None' ? (
                        <Image source={{uri: profile_picture}} style={styles.imgProfile}/>
                    ):(
                        <Image source={require('../../../assets/profile.png')}style={styles.imgProfile}/>
                            
                    )}
                </TouchableOpacity>
                <Text style={styles.lbl}>Nombre(s)</Text>
                <Input 
                    isLogged={true} 
                    value={first_name} 
                    maxLength={80}
                    //minLength={2}
                    setValue={(value) => {
                        if (value === "" || /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/u.test(value)) {
                            dispatch(onChangeInputProf({prop:'name', value }))
                        }
                    }}
                />
                {first_name?.length < 3 && <Text style={styles.lblWarning}>Ingresa al menos 3 letras</Text>}
                <Text style={styles.lbl}>Apellido(s)</Text>
                <Input 
                    isLogged={true} 
                    value={last_name}
                    maxLength={80}
                    setValue={(value) => {
                        if (value === "" || /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/u.test(value)) {
                            dispatch(onChangeInputProf({prop:'lastName', value}))
                            
                        }
                    }}
                />
                {last_name?.length < 3 && <Text style={styles.lblWarning}>Ingresa al menos 3 letras</Text>}

                <Text style={styles.lbl}>Correo electrónico</Text>
                <Input 
                    //autoComplete={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoComplete="off"
                    //editable={false}
                    isLogged={true} 
                    value={email} 
                    setValue={(value) => dispatch(onChangeInputProf({prop:'email',value}))}
                />
                {email != '' && !isValid && <Text style={styles.lblWarning}>Correo inválido</Text> }
                <Text style={styles.lbl}>Número celular (10 dígitos)</Text>
                <Input 
                    editable={false}
                    isLogged={true} 
                    value={phone} 
                    setValue={(value) => dispatch(onChangeInputProf({prop:'phone', value}))}
                />
                <Text style={styles.lbl}>Fecha de nacimiento</Text>
                {showDatePicker && (
                    <DateTimePicker
                        locale="es-ES"
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={handleDateChange}
                        maximumDate={maximumDate}
                        timeZoneOffsetInMinutes={new Date().getTimezoneOffset()}
                    />
                )}
                {showDatePicker && Platform.OS === 'ios' && (
                    <View style={{flexDirection:'row',justifyContent:'space-between', width: width/2}}>
                        <TouchableOpacity onPress={onShowDatepicker} style={{padding:7, backgroundColor:Colors.red, borderRadius:7}}>
                            <Text style={{color:Colors.white}}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={confirmIOSDate} style={{padding:7, backgroundColor:Colors.orange, borderRadius:7}}>
                            <Text style={{color:Colors.white}}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!showDatePicker && (
                    <Pressable onPress={onShowDatepicker}>
                        <Input 
                            placeholder='DD/MM/YYYY' 
                            editable={false} 
                            isLogged={true}
                            onPressIn={onShowDatepicker}
                            //style={{width:150, height:44, backgroundColor:'white', justifyContent:'center',alignItems:'center', paddingLeft:30}}
                            value={birthDay}
                            //onChange={(val) => se}    
                        />
    
                    </Pressable>)}
                {!showDatePicker && (
                    <>
                    <Text style={styles.lbl}>Género</Text>
                    <View style={styles.input}>
                        <Select
                            selectedValue={gender}
                            onValueChange={(value) => dispatch(onChangeInputProf({prop:'gender', value}))}
                            borderWidth={0}
                            placeholder="Escoge tu genero"
                            style={{}}>
                                <Select.Item value="MALE" label="Masculino"/>
                                <Select.Item value="FEMALE" label="Femenino"/>
                                <Select.Item value="OTHER" label="Otro"/>
                            </Select>
    
                    </View>
                    <Text style={styles.lbl}>Identificación oficial</Text>
                    <View style={styles.contBt}>
                        {!isComplete && <TouchableOpacity 
                            style={[styles.btn,{marginRight:8}]} 
                            onPress={() => {
                                setTypePhoto('imgFront')
                                setTimeout(() => {
                                    setModaCamera(true)
                                },300)
                            }}>
                                {imageFront != '' ? (
                                    <Image source={{ uri: imageFront }} style={styles.img}/>
                                ):(
                                    <>
                                        <Feather name="camera" size={40} color={Colors.gray} />
                                        <Text style={styles.lblBtn}>Frente</Text>
                                    </>
                                )}
                        </TouchableOpacity>}
                        {!isComplete && <TouchableOpacity 
                            style={styles.btn}
                            onPress={() => {
                                setTypePhoto('imgBack')
                                setTimeout(() => {
                                    setModaCamera(true)
                                },300)
                            }}>
                                {imageBack != '' ? (
                                    <Image source={{ uri: imageBack }} style={styles.img}/>
                                ):(
                                    <>
                                        <Feather name="camera" size={40} color={Colors.gray} />
                                        <Text style={styles.lblBtn}>Reverso</Text>
                                    
                                    </>
                                )}
                        </TouchableOpacity>}
                    </View>
                    <TouchableOpacity 
                        onPress={() => onUpdate()}
                        disabled={!(email !='' && phone != '' && gender != '' && birthDay != '' && first_name.length > 3 && last_name.length > 3)}
                        style={[styles.btnSave,{backgroundColor: !(email != '' && phone != ''&& gender != '' && birthDay != '' && first_name.length > 3 && last_name.length > 3) ? Colors.gray :Colors.blueGreen, zIndex:10}]}>
                        {loader ? <Spinner size={'sm'} color={'white'} /> :<Text style={styles.lblBtnSave}>Guardar</Text> }
                    </TouchableOpacity>
                
                </>
            )}
                </>
            )}
            <CameraComponent 
                visible={modalCamera} 
                typePhoto={typePhoto}
                onClose={() => setModaCamera(false)}
                onSavePhoto={(image, type) => {
                    dispatch(onChangeImage({prop: type, image}))
                    setTimeout(() => {
                        setModaCamera(false)
                    },200)
                }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        marginHorizontal:20
    },
    lbl:{
        fontSize:getFontSize(14), 
        color: Colors.grayStrong, 
        fontWeight:'400', 
        marginBottom:4,
        alignSelf:'flex-start',
        //marginLeft:5,
        marginTop:8,
    },
    contBt:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginBottom:20,
    },
    btn:{
        flex:1, 
        backgroundColor: Colors.white, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8, 
        paddingVertical:10,
    },
    lblBtn:{
        color: Colors.gray, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    },
    btnSave:{
        width: width/1.7, 
        paddingVertical:12, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8
    },
    lblBtnSave:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    },
    input:{
        backgroundColor: Colors.white,
        width:width * .9, 
        height: 44,  
        borderRadius:8, 
        //padding:7,
        borderColor:Colors.gray,
        borderWidth:1,
        justifyContent:'center'
    },
    img:{
        width: 120, 
        height: 60, 
        //aspectRatio:2,
        resizeMode:'cover'
    },
    imgProfile:{
        width:140, 
        height:140, 
        borderRadius:70, 
        resizeMode:'cover',
    },
    btnImgProf:{
        marginVertical:20,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    title:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(56), 
        fontWeight:'700', 
        marginBottom:16
    },
    subtitle:{
        textAlign:'center', 
        width: width/1.8,
        color: Colors.darkGray,
        fontSize: getFontSize(18),
        fontWeight:'400', 
        marginBottom:28
    },
    lblWarning:{
        color: Colors.red, 
        alignSelf:'flex-start', 
        marginLeft:4, 
        marginTop:4
    }
})

export default PersonalInfoForm;