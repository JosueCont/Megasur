import React,{useEffect,useState, useRef, useCallback} from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Spinner } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { AntDesign } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import Animated,{withSpring, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import RateStars from "../RateStars";
import { addResponsesData, changeInputHome, changeModalHome, cleanSurvey, saveResponsesSurvey, setCurrentQuestionIndex } from "../../store/ducks/homeDuck";
import KeyboardAvoidingCustom from "../KeyboardAvoidingCustom";
import SurveyContent from "../Surveys/SurveyContent";
import OpenQuestion from "../Surveys/OpenQuestion";
import StarQuestion from "../Surveys/StarQuestion";
import MultipleQuestion from "../Surveys/MultipleQuestion";
import SelectQuestion from "../Surveys/SelectQuestion";

const {height, width} = Dimensions.get('window');

const ModalQuizz = ({visible, setVisible, quizz,}) => {
    const dispatch = useDispatch();
    const [starRating, setStarRating] = useState(null);
    const [isComment, setComment] = useState(false)
    const [startSurvey, setStartSurvey] = useState(false)
    const [componentType, setComponentType] = useState(1)
    //const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [checks, setCheck] = useState([])
    const [radio, setRadio] = useState(null)
    const [disableBottom, setDisable] = useState(false)
    //const [responses, setResponses] = useState([])

    const comment = useSelector(state => state.homeDuck.comment)
    const responses = useSelector(state => state.homeDuck.responses)
    const currentQuestionIndex = useSelector(state => state.homeDuck.currentQuestionIndex)
    const isFinish = useSelector(state => state.homeDuck.isFinish)
    const answerSuccess = useSelector(state => state.homeDuck.answerSuccess)
    const loading = useSelector(state => state.homeDuck.loading)
    const scrollViewRef = useRef();



    useEffect(() => {
        setStarRating(null)
        setComment(false)
        setStartSurvey(false)
        //setCurrentQuestionIndex(0)
        dispatch(cleanSurvey())
    },[visible])

    useEffect(() => {
        setCheck([])
        setRadio(null)
        setStarRating(null)
        dispatch(changeModalHome({prop:'comment', val:''}))
    },[quizz?.questions[currentQuestionIndex-1].id, currentQuestionIndex])


   

    useEffect(() => {
        const conditions = {
            1: comment !== '',
            2: starRating !== null,
            3: radio !== null,
            4: checks.length > 0 
        };
        
        setDisable(!conditions[quizz?.questions[currentQuestionIndex-1]?.type]);
    },[currentQuestionIndex, checks, starRating, radio, comment])

    const heightStyle = useAnimatedStyle(() => {
        return{
            height: withSpring(startSurvey ? 330 : 200)
        }
    })

    const handleCheckboxChange = (item) => {
        const isSelected = checks.includes(item.response);
        // Si está seleccionado, lo removemos; si no, lo agregamos
        setCheck((prevSelected) => {
          if (isSelected) {
            return prevSelected.filter((resp) => resp !== item.response);
          } else {
            return [...prevSelected, item?.response];
          }
        });
      };

    const renderComponent = (question) => {
        let typeQustion = {
            1: <OpenQuestion question={question}/>,
            2: <StarQuestion question={question} starRating={starRating} setStar={(val) => setStarRating(val)}/>,
            3: <MultipleQuestion question={question} value={radio} setValue={(val) => setRadio(val)}/>,
            4: <SelectQuestion question={question} value={checks} setGroupValues={(item) => handleCheckboxChange(item)}/>
        }

        return typeQustion[question?.type];

    }

    const onChangeComponent = async() => {
         let selectedResponse;
         if (checks.length > 0) {
             setCheck([]);
             selectedResponse = checks;
         }else if (radio !== null) {
             setRadio(null);
             selectedResponse = radio;
         }else if(starRating !==null){
             setStarRating(null)
             selectedResponse = starRating
         }else{
             dispatch(changeModalHome({prop:'comment', val:''}))
             selectedResponse = comment
         }
        
        dispatch(setCurrentQuestionIndex(
            currentQuestionIndex,quizz?.questions.length,{ 
            question_id: quizz.questions[currentQuestionIndex-1].id, 
            response: {response: selectedResponse}, 
        }))

    }

    const onSendResponse = async() => {
        await dispatch(saveResponsesSurvey(quizz?.id, responses))
    }

    return(
        <Modal
            visible={visible} animationType='slide' transparent>
                <StatusBar
                    animated={true}
                    backgroundColor="rgba(0,0,0,0.5)"
                    color={Colors.white}
                    style='light'
                    hidden={false}
                />
                <View style={styles.container}>
                <KeyboardAvoidingCustom isModal={true} bottomModal={true}>
                    <Animated.View style={[styles.card, heightStyle]}>
                        <TouchableOpacity style={styles.contClose} onPress={setVisible}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                        {!startSurvey ? (
                            <View style={{flex:1}}>
                                <View style={styles.contDesc}>
                                    <Text style={styles.lbl}>Contesta esta encuesta y gana <Text style={{fontWeight:'700'}}>{quizz?.bonus_points || 0} puntos.</Text></Text>
                                    <Text style={styles.lblDescription}>{quizz?.description}</Text>
                                </View>
                                <TouchableOpacity style={styles.btnStart} onPress={() => setStartSurvey(true)}>
                                    <Text style={styles.lblBtn}>Comenzar</Text>
                                </TouchableOpacity>
                            </View>
                        ):(
                            <SurveyContent scrollViewRef={scrollViewRef}>
                                {!isFinish ? (
                                    renderComponent(quizz?.questions[currentQuestionIndex-1])

                                ): !answerSuccess && (
                                    <View style={styles.contSuccess}>
                                        <Text style={styles.lblFinish}>¡Has finalizado la encuesta!</Text>
                                        <Text style={styles.lblBanner}>No olvides enviar tus respuestas para obtener tu recompensa.</Text>
                                    </View>
                                ) }
                            </SurveyContent>
                        )}

                        {startSurvey && (
                            <TouchableOpacity 
                                disabled={isFinish ? false : disableBottom}
                                style={[styles.btnStart, {marginBottom:20, backgroundColor: isFinish ? Colors.blueGreen : disableBottom ? Colors.gray : Colors.blueGreen}]} 
                                onPress={() =>  isFinish ? onSendResponse() :onChangeComponent()}>
                                {loading ? <Spinner size={'sm'} color={'white'} /> : <Text style={styles.lblBtn}>{!isFinish ? 'Siguiente'  :'Enviar respuestas'}</Text>}
                            </TouchableOpacity>
                        )}
                                
                    </Animated.View>
                </KeyboardAvoidingCustom>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        flex:1, 
        justifyContent:'flex-end',
        alignItems:'center'
    },
    card:{
        backgroundColor: Colors.white,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        //height: 200,
        width: width
    },
    contClose:{
        alignSelf:'flex-end', 
        backgroundColor: Colors.grayBorders, 
        borderTopEndRadius:15,  
        padding:4, marginBottom:5
    },
    contDesc:{
        justifyContent:'center',
        alignItems:'center', 
        marginBottom:10,
        marginHorizontal:10
    },
    lbl:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(14), 
        fontWeight:'400', 
        marginBottom:10
    },
    question:{
        width: width/1.7, 
        textAlign:'center', 
        fontSize: getFontSize(18), 
        color: Colors.blueGreen
    },
    contSectionPoints:{
        alignItems:'center', 
        marginTop:15
    },
    lblPoints:{
        fontSize: getFontSize(18), 
        color: Colors.blueGreen, 
        fontWeight:'800', 
        marginBottom:8
    },
    lblDesc:{
        color: Colors.grayStrong, 
        fontWeight:'400',
    },
    contBtn:{
        flexDirection:'row', 
        marginTop:20
    },
    btn:{
        width: width/2.5, 
        height:40, 
        backgroundColor: Colors.blueGreen, 
        borderRadius:8,
        justifyContent:'center', 
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(13), 
        fontWeight:'500'
    },
    btnSend:{
        width: width/1.1, 
        height:50, 
        backgroundColor: Colors.blueGreen,
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center', 
        alignSelf:'center'
    },
    lblSend:{
        color: Colors.white, 
        fontSize: getFontSize(15), 
        fontWeight:'400'
    },
    lblComment:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(14), 
        fontWeight:'400', 
        marginLeft:15
    },

    lblDescription:{
        //width: width/1.7,
        fontSize: getFontSize(16),
        fontWeight:'400',
        color: Colors.grayStrong,
    },
    btnStart:{
        marginHorizontal:20, 
        marginTop:15, 
        paddingVertical:15, 
        backgroundColor: Colors.blueGreen, 
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center',
    },
    contSuccess:{
        flex:1, 
        height:200, 
        justifyContent:'center', 
        alignItems:'center',
    },
    lblFinish:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(30), 
        fontWeight:'700', 
        textAlign:'center'
    },
    lblBanner:{
        color: Colors.darkGray, 
        fontSize: getFontSize(16), 
        fontWeight:'400', 
        marginHorizontal:20, 
        textAlign:'center'
    }
})

export default ModalQuizz;