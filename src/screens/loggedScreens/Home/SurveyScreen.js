import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, } from "react-native";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import SurveyList from "../../../components/Surveys/SurveyList";
import { getListSurveys, changeModalHome, getAllSurveys, cleanAfterNavigation, addResponsesData } from "../../../store/ducks/homeDuck";
import ModalQuizz from "../../../components/modals/ModalQuizz";
import { Skeleton } from "native-base";
import ModalAlertFailed from "../../../components/modals/ModalAlertFail";

const {height, width} = Dimensions.get('window');

const SurveysScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const surveys = useSelector(state => state.homeDuck.surveys)
    const modalQuizz = useSelector(state => state.homeDuck.modalQuizz)
    const answerSuccess = useSelector(state => state.homeDuck.answerSuccess)
    const loader = useSelector(state => state.homeDuck.loading)
    const totalSurveys = useSelector(state => state.homeDuck.totalSurveys)
    const modalFailed = useSelector(state => state.homeDuck.modalFailed)
    const message = useSelector(state => state.homeDuck.message)

    const [selectedSurver, setSelectedSurvey] = useState(null)

    useEffect(() => {
        (async() => {
            dispatch(await getAllSurveys())
        })();
    },[answerSuccess])

    useEffect(() => {
        if(answerSuccess){
            navigation.navigate('SurveyDone',{points: selectedSurver?.bonus_points || 0})
            setTimeout(() => {
                dispatch(cleanAfterNavigation())
            },500)
        }
    },[answerSuccess])

    const setQuizz = (item) => {
        setSelectedSurvey(item)
        //setTimeout(() => {
            dispatch(changeModalHome({prop:'modalQuizz',val:true}))
        //},200)
    }

    return(
        <HeaderLogged 
            title="Encuestas"
            isBack={true} 
            goBack={() => navigation.goBack()}>
                <View style={{marginHorizontal:10}}>
                    {loader ? (
                        Array.from({length:3}).map((_,index) => (
                            <Skeleton key={index} lines={1} borderRadius={20} height={height/6} mb={2} backgroundColor={'gray.100'}/>
                        ))
                    ):(
                        <SurveyList surveys={surveys} onSelectedSurvey={(item) => setQuizz(item)}/>
                    )}
                </View>
                <ModalQuizz 
                    visible={modalQuizz}
                    quizz={selectedSurver}
                    setVisible={() => {
                        dispatch(changeModalHome({prop:'modalQuizz',val:false}))
                        if(totalSurveys < 1){
                            setTimeout(() => {
                                navigation.goBack();
                            },500)
                        }
                    }}
                />
                <ModalAlertFailed 
                    visible={modalFailed}
                    setVisible={() => dispatch(changeModalHome({prop:'modalFailed', val:false}))}
                    message={message}
                    titleBtn="Entendido"
                />
        </HeaderLogged>
    )
}

export default SurveysScreen