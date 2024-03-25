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
import { changeModalHome, getDataConfi, getAllCards, saveDataLocalStorage, getAllSurveys, getTotalSurveys, getPointsCard } from "../../store/ducks/homeDuck";
import { getCloseStations } from "../../store/ducks/locationsDuck";
import { getProfileData } from "../../store/ducks/profileDuck";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAdvertisements } from "../../utils/services/ApiApp";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import ModalAlertFailed from "../../components/modals/ModalAlertFail";
import ModalScreenShot from "../../components/modals/ModalScreenShot";

const {height, width} = Dimensions.get('window');


const HomeScreen = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused()
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
    const points = useSelector(state => state.homeDuck.points)
    const modalScreenShot = useSelector(state => state.homeDuck.modalScreenShot)
    const gender = useSelector(state => state.authDuck.dataUser?.gender)

    const [dataAdvertisements, setDataAdvertisements] = useState([])
    const [dataPromotions, setDataPromotions] = useState([])

    const genders = {
        'MALE':'Bienvenido',
        'FEMALE':'Bienvenida'
    }

    useEffect(() => {
        (async() => {
            if(userId && userId != undefined){
                const cards = await AsyncStorage.getItem('cards')
                await dispatch(saveDataLocalStorage(JSON.parse(cards)))
                await dispatch(getDataConfi())
                const location = await getPermissionLocation()
                await dispatch(getCloseStations(location?.coords))
                //await dispatch(getAllCards(userId))
                await dispatch(getProfileData())
                await dispatch(getAllSurveys())

            }
                
        })()
    },[userId])

    useEffect(() => {
        if(userCard && userCard != undefined && userCard[0]?.user_card_id ) dispatch(getPointsCard(userCard[0]?.user_card_id))
    },[userCard, isFocused])

    useEffect(() => {
        getDataAdvertisements()
        getDataPromotions()
    },[isFocused])

    const getDataAdvertisements = async()=>{
        const result = await getAdvertisements('?page=1&per_page=1000&type=1&is_active=true')
        if (result.status == 200){
            setDataAdvertisements(result.data?.items ? result.data.items : [])
        }
    }

    const getDataPromotions = async()=>{
        try {
            const result = await getAdvertisements('?page=1&per_page=1000&type=2&is_active=true')
            if (result.status == 200){
                setDataPromotions(result.data?.items ? result.data.items : [])
            }
            
        } catch (e) {
            console.log('error promotions',e)
        }
    }

    const dataDisconunt = [
        {id:'1', discount:20, valityStart:'06/07/2023', valityEnd:'01/05/2024', image: require('../../../assets/promotion.png')},
        {id:'2', discount:15, valityStart:'06/07/2023', valityEnd:'01/05/2024', image: require('../../../assets/promotion.png')},
        {id:'3', discount:10, valityStart:'06/07/2023', valityEnd:'01/05/2024', image: require('../../../assets/promotion.png')}

    ];

    const dataPromotion_old = [
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
        <HeaderLogged 
            title={genders[gender]}
            onRefresh={() => console.log('refreshPAge')}>
            <FlipCard cards={userCard} points={points}/>
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
            <ListPromotions dataPromotion={dataAdvertisements}/>
            <ListDiscount dataDisconunt={dataPromotions}/>
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
            <ModalScreenShot 
                visible={modalScreenShot}
                setVisible={() => dispatch(changeModalHome({prop:'modalScreenShot', val: false}))}
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