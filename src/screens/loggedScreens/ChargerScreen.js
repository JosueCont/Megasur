import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useToast, Alert, VStack, HStack,  } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import HeaderLogged from "../../components/Headers/HeaderLogged";
import { Feather } from '@expo/vector-icons';
import Filters from "../../components/Charges/Filters";
import Help from "../../components/profile/Help";
import moment from "moment";
import ChargesList from "../../components/Charges/ListCharges";
import { updateInfoCharge, changeModalCharges, onRateCharge, refreshAction, onResetRate } from "../../store/ducks/chargesDuck";
import { useDispatch, useSelector } from "react-redux";
import ModalRateCharge from "../../components/modals/ModalRateCharge";
import { getCharges } from "../../store/ducks/chargesDuck";
import ModalAlertFailed from "../../components/modals/ModalAlertFail";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import ModalAlertSuccess from "../../components/modals/AlertModalSucces";

const ChargerScreen = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const modalRate = useSelector(state => state.chargesDuck.modalActive)
    const charges = useSelector(state => state.chargesDuck.fuelCharges)
    const typeFuel = useSelector(state => state.chargesDuck.typeFuel)
    const branchName = useSelector(state => state.chargesDuck.branchName)
    const branchesOptions = useSelector(state => state.chargesDuck.branches)
    const comment = useSelector(state => state.chargesDuck.comment)
    const isRate = useSelector(state => state.chargesDuck.isRate)
    const toasUpdate = useSelector(state => state.chargesDuck.modalSuccess)
    const message = useSelector(state => state.chargesDuck.message)
    const refresh = useSelector(state => state.chargesDuck.refresh)
    const modalFailed = useSelector(state => state.chargesDuck.modalFailed)
    const infoCharge = useSelector(state => state.chargesDuck.infoCharge)
    const userId = useSelector(state => state.authDuck.dataUser?.id)
    const isInvoincing = useSelector(state => state.chargesDuck.isInvoincing)

    const toast = useToast();

    useEffect(() => {
        (async() => {
            dispatch(await getCharges(`?page=1&per_page=100&user_id=${userId}`,[], true))
        })();
        if(isRate){
            navigation.navigate('ConfirmRate',{points:infoCharge?.score_points})
        }
    },[isRate, isFocused,])

    const onFilter = async() => {
        const filters = buildUrlPath(typeFuel,branchName)
        //console.log('filters',filters)
        await dispatch(getCharges(filters, branchesOptions, false))
    }

    const buildUrlPath = (type, branchName) => {
        //console.log('type',type)
        let filter = `?page=1&per_page=100&user_id=${userId}`
        if (type) {
            filter += `&product_code=${encodeURIComponent(type)}`;
        }
        if (branchName) {
            filter += `&branch_id=${encodeURIComponent(branchName)}`
        }
        return filter
    }

    const onSendRate = async(charge, stars) => {
        //console.log('comment',comment)
        await dispatch(onRateCharge({charge,stars, comment, isRate}))
    }

    const onRefresh = async() => {
        dispatch(refreshAction())
        setTimeout(() => {
            dispatch(getCharges(`?page=1&per_page=100&user_id=${userId}`, branchesOptions, false))

        },1000)
    }

    return(
        <>
            <HeaderLogged 
                onRefresh={() => onRefresh()}
                refresh={refresh}
                title="Cargas de combustible">
                <View style={{marginHorizontal:10}}>
                    <Filters onFilter={() => onFilter()}/>
                    <ChargesList 
                        charges={charges}
                        setVisible={(val) => {
                            dispatch(updateInfoCharge(val))
                            dispatch(changeModalCharges({prop:'modalActive', value: true}))
                        }}/>
                </View>

                <ModalRateCharge 
                    visible={modalRate}
                    setVisible={() => dispatch(changeModalCharges({prop:'modalActive', value: false}))}
                    onRate={(charge, stars) => {
                        console.log('calificando', charge )
                        dispatch(changeModalCharges({prop:'modalActive', value:false}))
                        setTimeout(() => {
                            onSendRate(charge,stars)

                        },500)
                    }}
                />
                <ModalAlertFailed 
                    visible={modalFailed}
                    setVisible={() => dispatch(changeModalCharges({prop:'modalFailed', value: false}))}
                    message={message}
                    titleBtn="Aceptar"
                />
                <ModalAlertSuccess 
                    visible={toasUpdate}
                    message={message}
                    setVisible={() => dispatch(changeModalCharges({prop:'modalSuccess', value: false}))}
                />
            </HeaderLogged>
            <Help pressed={() => navigation.navigate('Profile',{screen:'Contact', params: {route:'Charges'}})}/>

        </>
    )
}

export default ChargerScreen;