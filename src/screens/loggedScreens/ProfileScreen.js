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
import { getProfileData } from "../../store/ducks/profileDuck";

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authDuck.dataUser?.id)

    useEffect(() => {
        //if(userId && userId != undefined) 
        getDataUser()
    },[])

    const getDataUser = async() => {
        await dispatch(getProfileData())
    }
    return(
        <>
            <HeaderLogged title="Perfil">
                <View style={{marginHorizontal:10,}}>
                    <VerifyEmail />
                    <SwitchNotification />
                    <AccordionList />
                </View>
            </HeaderLogged>
            <Help />
        
        </>
    )
}

export default ProfileScreen;