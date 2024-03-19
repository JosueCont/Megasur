import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, StyleSheet,  } from "react-native";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfoForm from "../../../components/profile/PersonalInfo";
import { onChangeModalProf, requestDeleteAccount } from "../../../store/ducks/profileDuck";
import ModalDeleteAccount from "../../../components/modals/DeleteAccount";
import ModalAlertSuccess from "../../../components/modals/AlertModalSucces";
import ModalAlertFailed from "../../../components/modals/ModalAlertFail";

const UserProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const modalDeleteAccout = useSelector(state => state.profileDuck.modalDelete)
    const userId = useSelector(state => state.authDuck.dataUser?.id)
    const modalSuccess = useSelector(state => state.profileDuck.modalSuccess)
    const modalFailed = useSelector(state => state.profileDuck.modalFailed)
    const message = useSelector(state => state.profileDuck.message)

    return(
        <HeaderLogged title="Datos usuario" isBack={true} goBack={() => navigation.goBack()}>
            <PersonalInfoForm />
            <TouchableOpacity 
                onPress={() => dispatch(onChangeModalProf({prop:'modalDelete',value:true}))}
                style={styles.btnDelete}>
                <Text style={styles.lblDelete}>Eliminar cuenta</Text>
            </TouchableOpacity>

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
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    btnDelete:{
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:25,
        marginBottom:15
    },
    lblDelete:{
        color: Colors.red, 
        fontSize: getFontSize(18), 
        textDecorationLine:'underline', 
        fontWeight:'400'
    }
})

export default UserProfileScreen;