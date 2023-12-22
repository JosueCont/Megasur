import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Pressable, Platform} from "react-native";
import { Select, Spinner } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Input from "../CustomInput";
import { Feather } from '@expo/vector-icons'; 
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'
import CameraComponent from "../Camera";
import { onChangeImage, onChangeInputProf, onUpdateDataUser } from "../../store/ducks/profileDuck";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from "moment";


const {height, width} = Dimensions.get('window');

const PersonalInfoForm = () => {
    const dispatch = useDispatch();
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

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(null);


    useEffect(() => {
        if(birthDay != undefined && birthDay != '') setDate(new Date(birthDay))
    },[birthDay])

    useEffect(() => {
        if(gender != undefined && gender !='') dispatch(onChangeInputProf({prop:'gender', value: gender.toString()}))
        //console.log('genderrr', gender)
    },[gender])

    const onShowDatepicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleDateChange = ({type}, selectedDate) => {
        console.log('event',type)
        if(type === 'set'){
            const currentDate = selectedDate || date;
            setDate(currentDate);
            if(Platform.OS === 'android'){
                dispatch(onChangeInputProf({prop:'birthday',value: moment(currentDate.toDateString()).format('DD/MM/YYYY')}))
                //setBirthdayDate(moment(currentDate.toDateString()).format('DD/MM/YYYY'))
                setShowDatePicker(false)
            }
            //setShowDatePicker(false);

        }else{
            console.log('entro aqui')
        }
    };
    
    const confirmIOSDate = () => {
        dispatch(onChangeInputProf({prop:'birthday',value: moment(date.toDateString()).format('DD/MM/YYYY')}))
        //setBirthdayDate(moment(date.toDateString()).format('DD/MM/YYYY'))
        onShowDatepicker()
    }
    return(
        <View style={styles.container}>
            <Text style={styles.lbl}>Nombre(s)</Text>
            <Input 
                isLogged={true} 
                value={first_name} 
                setValue={(value) => dispatch(onChangeInputProf({prop:'name', value }))}
            />
            <Text style={styles.lbl}>Apellidos(s)</Text>
            <Input 
                isLogged={true} 
                value={last_name} 
                setValue={(value) => dispatch(onChangeInputProf({prop:'lastName', value}))}
            />
            <Text style={styles.lbl}>Correo electrónico</Text>
            <Input 
                //autoComplete={false}
                autoCorrect={false}
                //editable={false}
                isLogged={true} 
                value={email} 
                setValue={(value) => dispatch(onChangeInputProf({prop:'email',value}))}
            />
            <Text style={styles.lbl}>Número celular (10 digitos)</Text>
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
                        value={gender}
                        onValueChange={(value) => dispatch(onChangeInputProf({prop:'gender', value}))}
                        borderWidth={0}
                        placeholder="Escoge tu genero"
                        style={{}}>
                            <Select.Item value="MALE" label="Masculino"/>
                            <Select.Item value="FEMALE" label="Femenino"/>
                        </Select>

                </View>
                <Text style={styles.lbl}>Identificación oficial</Text>
                <View style={styles.contBt}>
                    <TouchableOpacity 
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
                    </TouchableOpacity>
                    <TouchableOpacity 
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
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    onPress={() => { dispatch(onUpdateDataUser({
                        first_name, last_name, email, phone, 
                        birthDay, gender, imageBack, imageFront
                    }))}}
                    disabled={!(email !='' && phone != '')}
                    style={[styles.btnSave,{backgroundColor: !(email != '' && phone != '') ? Colors.gray :Colors.blueGreen}]}>
                    {loader ? <Spinner size={'sm'} color={'white'} /> :<Text style={styles.lblBtnSave}>Guardar</Text> }
                </TouchableOpacity>
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
        alignItems:'center'
    },
    lbl:{
        fontSize:getFontSize(14), 
        color: Colors.grayStrong, 
        fontWeight:'400', 
        marginBottom:4,
        alignSelf:'flex-start',
        marginLeft:2,
        marginTop:8,
    },
    contBt:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginBottom:20
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
        width:width/1.05, 
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
    }
})

export default PersonalInfoForm;