import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
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

const ProfileScreen = () => {
    const dispatch = useDispatch();
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


    useEffect(() => {
        //if(userId && userId != undefined) 
        getDataUser()
    },[isValid,isUpdateAccount])

    const getDataUser = async() => {
         dispatch(await getProfileData())
    }
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
                <View style={{marginHorizontal:10,}}>
                    <VerifyEmail />
                    <SwitchNotification />
                    <AccordionList />
                </View>
                <ModalCloseSession 
                    visible={modalSession}
                    setVisible={() => dispatch(onChangeModalProf({prop:'modalActive', value: false}))}
                    onSubmit={() => {
                        dispatch(onChangeModalProf({prop:'modalActive', value: false}))
                        setTimeout(() => {
                            dispatch(logoutAction())
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
            <Help />
        
        </>
    )
}

export default ProfileScreen;