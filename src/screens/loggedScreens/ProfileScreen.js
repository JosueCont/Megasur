import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import HeaderLogged from "../../components/Headers/HeaderLogged";
import VerifyEmail from "../../components/profile/VerifyEmail";
import SwitchNotification from "../../components/profile/SwitchNotification";
import AccordionList from "../../components/profile/AccordionList";
import Help from "../../components/profile/Help";
import { getProfileData, onChangeModalProf, refreshAction, requestDeleteAccount } from "../../store/ducks/profileDuck";
import ModalCloseSession from "../../components/modals/CloseSession";
import { logoutAction } from "../../store/ducks/authDuck";
import ModalAlertSuccess from "../../components/modals/AlertModalSucces";
import ModalAlertFailed from "../../components/modals/ModalAlertFail";
import ModalDeleteAccount from "../../components/modals/DeleteAccount";
import ModalTerms from "../../components/modals/ModalTerms";
import PersonalInfoForm from "../../components/profile/PersonalInfo";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getExpoToken } from "../../utils/functions";
import ListActionsProfile from "../../components/profile/ListActions";

const {height, width} = Dimensions.get('window');

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const userId = useSelector(state => state.authDuck.dataUser?.id)
    const modalSession = useSelector(state => state.profileDuck.modalActive)
    const modalSuccess = useSelector(state => state.profileDuck.modalSuccess)
    const modalFailed = useSelector(state => state.profileDuck.modalFailed)
    const message = useSelector(state => state.profileDuck.message)
    const isValid = useSelector(state => state.profileDuck.isEmailVerified)
    const modalDeleteAccout = useSelector(state => state.profileDuck.modalDelete)
    const isUpdateAccount = useSelector(state => state.profileDuck.isAccountUpdate)
    const refresh = useSelector(state => state.profileDuck.refresh)
    const modalTerms = useSelector(state => state.profileDuck.modalTerms)

    const [expoToken, setExpoToken] = useState(null)


    useEffect(() => {
        //if(userId && userId != undefined) 
        getDataUser()
        applicationExpoToken()
    },[isValid,isUpdateAccount, isFocused])

    const getDataUser = async() => {
         dispatch(await getProfileData())
    }

    const applicationExpoToken = async ()=>{
        const resultToken = await getExpoToken()
        if (resultToken){
            setExpoToken(resultToken)
        }

    }


    const data = [
        {id:'1', title:'Información personal', component: <PersonalInfoForm />},
        {id:'2', title:'Datos de tu vehículo', component:''},
        {id:'3', title:'Facturación', component:''},
        {id:'4', title:'Encuestas contestadas', component:''},
        {id:'5', title:'Terminos de uso', component:''},
        {id:'6', title:'Privacidad de datos', component:''},
        {id:'7', title:'Vincular tarjeta física', component:''},
        {id:'8', title:'Borrar cuenta', component:''},
        {id:'9', title:'Acerca de', component:''},
        {id:'10', title:'Cerrar sesión', component:''}

    ]
    return(
        <>
            <HeaderLogged 
                title="Perfil" 
                onRefresh={() => { 
                    dispatch(refreshAction()); 
                    setTimeout(() => {
                        getDataUser();
                    },500)
                }} 
                refresh={refresh}>
                    <Image source={require('../../../assets/waves.png')} style={{width: width, height: 100, resizeMode:'stretch', position:'relative', top:-20 }}/>
                <View style={{marginHorizontal:10,}}>
                    <VerifyEmail />
                    <ListActionsProfile />
                    {/*<SwitchNotification />*/}
                    {/*<AccordionList data={data}/>*/}
                </View>
                <ModalCloseSession 
                    visible={modalSession}
                    setVisible={() => dispatch(onChangeModalProf({prop:'modalActive', value: false}))}
                    onSubmit={() => {
                        dispatch(onChangeModalProf({prop:'modalActive', value: false}))
                        setTimeout(() => {
                            dispatch(logoutAction(expoToken))
                        },500)
                    }}
                />
                <ModalAlertSuccess 
                    visible={modalSuccess}
                    setVisible={() => dispatch(onChangeModalProf({prop: 'modalSuccess', value: false}))}
                    message={message}
                />
                <ModalAlertFailed 
                    titleBtn='Cerrar'
                    visible={modalFailed}
                    setVisible={() => dispatch(onChangeModalProf({prop:'modalFailed',value: false}))}
                    message={message}
                />
                <ModalDeleteAccount 
                    visible={modalDeleteAccout}
                    setVisible={() => dispatch(onChangeModalProf({prop:'modalDelete', value: false}))}
                    onSubmit={() => {
                        dispatch(onChangeModalProf({prop:'modalDelete', value: false}))
                        setTimeout(() => {
                            dispatch(requestDeleteAccount({user_id: userId}))
                        },500)
                    }}
                />
                <ModalTerms 
                    visible={modalTerms}
                    setVisible={() => dispatch(onChangeModalProf({prop:'modalTerms', value:false}))}
                />
            </HeaderLogged>
            <Help pressed={() => navigation.navigate('Contact',{route:'Profile'})}/>
        
        </>
    )
}

export default ProfileScreen;