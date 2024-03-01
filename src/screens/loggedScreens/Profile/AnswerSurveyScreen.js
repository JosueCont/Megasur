import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from "native-base";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfoForm from "../../../components/profile/PersonalInfo";
import { getAllAnsweredSurveys, onChangeModalProf, refreshAction, requestDeleteAccount } from "../../../store/ducks/profileDuck";
import AnsweredSurveyList from "../../../components/profile/AnsweredSurveyList";

const {height, width} = Dimensions.get('window');

const AnsweredSurveyScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const userId = useSelector(state => state.authDuck.dataUser?.id)
    const loader = useSelector(state => state.profileDuck.loading)
    const surveys = useSelector(state => state.profileDuck.answeredSurveys)
    const refresh = useSelector(state => state.profileDuck.refresh)


    useEffect(() => {
        (async() => {
            await dispatch(getAllAnsweredSurveys(userId))
        })()
    },[])

    const onRefresh = async() => {
        dispatch(refreshAction())
        setTimeout(() => {
            dispatch(getAllAnsweredSurveys(userId))
        },500)
    }

    return(
        <HeaderLogged
            title="Encuestas contestadas"
            isBack={true}
            goBack={() => navigation.goBack()}
            onRefresh={() => onRefresh()}
            refresh={refresh}>
                <View style={{marginHorizontal:10}}>
                    {loader ? (
                        Array.from({length:3}).map((_,index) => (
                            <Skeleton key={index} lines={1} borderRadius={20} height={height/6} mb={2} backgroundColor={'gray.200'}/>
                        ))
                    ):(

                        <AnsweredSurveyList surveys={surveys}/>
                    )}
                </View>
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({

})

export default AnsweredSurveyScreen;