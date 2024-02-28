import React,{useEffect,useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, ImageBackground } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { getFontSize, getPermissionLocation } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Animated, { useSharedValue, withTiming, } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import HeaderLogged from "../../components/Headers/HeaderLogged";
import FlipCard from "../../components/Home/FlipCard";
import ProvitionalPoints from "../../components/Home/AditionalPoints";
import Question from "../../components/Home/Question";
import ExchangeCenter from "../../components/Home/ExchangeCenter";
import ListPromotions from "../../components/Home/ListPromotions";
import ListDiscount from "../../components/Home/ListDiscount";
import CloseStations from "../../components/Home/CloseStations";
import ModalQuizz from "../../components/modals/ModalQuizz";
import { changeModalHome, getDataConfi, getAllCards, saveDataLocalStorage, getAllSurveys, getTotalSurveys } from "../../store/ducks/homeDuck";
import { getCloseStations } from "../../store/ducks/locationsDuck";
import { getProfileData } from "../../store/ducks/profileDuck";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ModalAlertFailed from "../../components/modals/ModalAlertFail";

const {height, width} = Dimensions.get('window');


const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const modalQuizz = useSelector(state => state.homeDuck.modalQuizz)
    const stations = useSelector(state => state.locationDuck.nearBranches)
    const userId = useSelector(state => state.authDuck.dataUser?.id)
    const userCard = useSelector(state => state.homeDuck.cardsStorage)
    const totalSurveys = useSelector(state => state.homeDuck.totalSurveys)
    const surveys = useSelector(state => state.homeDuck.surveys)
    const modalFailed = useSelector(state => state.homeDuck.modalFailed)
    const message = useSelector(state => state.homeDuck.message)
    const [selectedSurver, setSelectedSurvey] = useState(null)



    useEffect(() => {
        (async() => {
            const cards = await AsyncStorage.getItem('cards')
            await dispatch(saveDataLocalStorage(JSON.parse(cards)))
            await dispatch(getDataConfi())
            if(userId && userId != undefined){
                const location = await getPermissionLocation()
                await dispatch(getCloseStations(location?.coords))
                //await dispatch(getAllCards(userId))
                await dispatch(getProfileData())
                await dispatch(getAllSurveys())

            }
                
        })()
    },[userId])
    const dataDisconunt = [
        {id:'1', discount:20, valityStart:'06/07/2023', valityEnd:'01/05/2024', image: require('../../../assets/promotion.png')},
        {id:'2', discount:15, valityStart:'06/07/2023', valityEnd:'01/05/2024', image: require('../../../assets/promotion.png')},
        {id:'3', discount:10, valityStart:'06/07/2023', valityEnd:'01/05/2024', image: require('../../../assets/promotion.png')}

    ];

    const dataPromotion = [
        {id:'1', title:'Tus puntos valen el doble', description:'Valido todos los Martes de 11:00am a 4:00pm', image: require('../../../assets/Art.png')},
        {id:'2', title:'Te llevamos al concierto', description:'Conoce como participar', image: require('../../../assets/Art.png')},
        {id:'3', title:'Encuentra lo mejor para tu vehiculo', description:'Encuentra en nuestras gasolineras una amplia variedad de accesorios', image: require('../../../assets/Art.png')}

    ]

    //const stations = [
    //    {id:'1',name:'Sucursal Itzáes', location:'Adolfo Prieto #802 Colonia Del Valle, CDMX', schedule:'Horario: L-V 07:00 a 22:00 I S-D: 08:00 a 22:00',isOpen:true, meters:300 },
    //    {id:'2',name:'Sucursal Itzáes', location:'Adolfo Prieto #802 Colonia Del Valle, CDMX', schedule:'Horario: L-V 07:00 a 22:00 I S-D: 08:00 a 22:00', isOpen:false, meters:1500}
//
    //]
    return(
        <HeaderLogged onRefresh={() => console.log('refreshPAge')}>
            <FlipCard cards={userCard}/>
            <Question />
            <ProvitionalPoints 
                showSurvey={() => {
                    if(totalSurveys === 1){
                        setSelectedSurvey(surveys[0])
                        dispatch(changeModalHome({prop:'modalQuizz',val:true}))
                    }else navigation.navigate('Surveys')
                }}
                totalSurveys={totalSurveys}
            />
            <ExchangeCenter />
            <ListPromotions dataPromotion={dataPromotion}/>
            <ListDiscount dataDisconunt={dataDisconunt}/>
            <CloseStations stations={stations}/>
            
            {/**Modals */}
            <ModalQuizz 
                visible={modalQuizz}
                quizz={selectedSurver}
                setVisible={() => dispatch(changeModalHome({prop:'modalQuizz',val:false}))}
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

const styles = StyleSheet.create({
    contQuestion:{
        height: 100, 
        width: width, 
        //backgroundColor:'red', 
        alignItems:'center'
    },
    question:{
        color: Colors.darkGray, 
        fontSize: getFontSize(24), 
        fontWeight:'700', 
        marginBottom:13
    },
    contBtn:{
        flexDirection:'row', 
        justifyContent:'space-around', 
        width:width 
    },
    btnQuestion:{
        width: width/2.5, 
        height:44, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8
    },
    lblQuestion:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'700'
    }
})

export default HomeScreen;