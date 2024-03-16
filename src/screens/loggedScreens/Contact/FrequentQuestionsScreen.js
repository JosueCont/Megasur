import React, {useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "native-base";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getQuestions } from "../../../store/ducks/contactDuck";
import AccordionQuestionList from "../../../components/Contact/AccordionQuestionList";

const {height, width} = Dimensions.get('window');

const FrecuentQuestionsScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const questions = useSelector(state => state.contactDuck.questions)

    useEffect(() => {
        (async() => {
            await dispatch(getQuestions())
        })()
    },[])

    return(
        <HeaderLogged
            title="Preguntas frecuentes"
            isBack={true}
            goBack={() => navigation.goBack()}
        >
            <View style={styles.container}>
                <AccordionQuestionList data={questions}/>
            </View>
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:15, 
        borderRadius:10,
        padding:10,
        //elevation:1,
        //shadowColor: '#000', // Color de la sombra
        //shadowOffset: {
        //  width: 0,  
        //  height: 2,
        //},
        //shadowOpacity: 0.25, 
        //shadowRadius: 4, 
        borderWidth:0.5,
        borderColor: Colors.borders
    }
})

export default FrecuentQuestionsScreen;