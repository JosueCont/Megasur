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
import { changeModalHome, getDataConfi, getAllCards, getAllSurveys, getTotalSurveys, getPointsCard, getInfoVehicle, onShowBanner } from "../../store/ducks/homeDuck";
import { saveDataLocalStorage } from "../../store/ducks/authDuck";
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
    const userCard = useSelector(state => state.authDuck.cardsStorage)
    const totalSurveys = useSelector(state => state.homeDuck.totalSurveys)
    const surveys = useSelector(state => state.homeDuck.surveys)
    const modalFailed = useSelector(state => state.homeDuck.modalFailed)
    const message = useSelector(state => state.homeDuck.message)
    const [selectedSurver, setSelectedSurvey] = useState(null)
    const points = useSelector(state => state.homeDuck.points)
    const modalScreenShot = useSelector(state => state.homeDuck.modalScreenShot)
    const gender = useSelector(state => state.authDuck.dataUser?.gender)
    const fuelCost = useSelector(state => state.homeDuck.setupData?.fuel_cost)
    const vehicle = useSelector(state => state.homeDuck.vehicle)
    const showBannerCard = useSelector(state => state.homeDuck.showBannerCard)
    const [dataAdvertisements, setDataAdvertisements] = useState([])
    const [dataPromotions, setDataPromotions] = useState([])
    const [location, setLocation] = useState(null)

    const genders = {
        'MALE':'Bienvenido',
        'FEMALE':'Bienvenida'
    }

    const VehicleLtr = {
        null: 0,
        1: 45,
        2: 60,
        3: 80,
        4: 80,
        5: 120,
        6: 70,
        7: 90,
        8: 120,
        9: 90
    }

    useEffect(() => {
        (async() => {
            if(isFocused){
                const location = await getPermissionLocation()
                setLocation(location)
                //await dispatch(getCloseStations(location?.coords))
                if(userId && userId != undefined){
                    const cards = await AsyncStorage.getItem('cards')
                    await dispatch(saveDataLocalStorage(JSON.parse(cards)))
                    await dispatch(getDataConfi())
                    await dispatch(getInfoVehicle(userId))
                    //await dispatch(getAllCards(userId))
                    await dispatch(getProfileData())
                    await dispatch(getAllSurveys())
    
                }

            }
                
        })()
    },[ isFocused])

    useEffect(() => {
        console.log('change location permission', location)
        if(location != null && location != undefined) dispatch(getCloseStations(location?.coords))
    },[location])


    useEffect(() => {
        if(userCard && userCard != undefined && userCard[0]?.user_card_id ){
            dispatch(getPointsCard(userCard[0]?.user_card_id))
            dispatch(onShowBanner(userCard[0]?.user_card_id,1))
        }
    },[userCard, isFocused, showBannerCard])

    useEffect(() => {
        getDataAdvertisements()
        getDataPromotions()
    },[isFocused])

    const getDataAdvertisements = async()=>{
        const result = await getAdvertisements('?page=1&per_page=1000&type=1&is_active=true')
        if (result.status == 200){
            let advertisement = []
            if(result.data?.items){
                result.data?.items.map(item => {
                    if(item?.is_active) advertisement.push(item)
                })
            }
            setDataAdvertisements(advertisement)
        }
    }

    const getDataPromotions = async()=>{
        try {
            const result = await getAdvertisements('?page=1&per_page=1000&type=2&is_active=true')
            if (result.status == 200){
                let dataProm = []
                if(result.data?.items?.length > 0){
                    result.data?.items.map(item => {
                        if(item?.is_active) dataProm.push(item)
                    });

                }
                setDataPromotions(dataProm)
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
            {showBannerCard && userCard && <Question cardId={userCard[0]?.user_card_id}/>}
            <ProvitionalPoints 
                showSurvey={() => {
                    if(totalSurveys === 1){
                        setSelectedSurvey(surveys[0])
                        dispatch(changeModalHome({prop:'modalQuizz',val:true}))
                    }else navigation.navigate('Surveys')
                }}
                totalSurveys={totalSurveys}
            />
            {vehicle != null && vehicle?.vehicle_type &&(
                <ExchangeCenter 
                    fuelCost={fuelCost} 
                    capacity={VehicleLtr[vehicle?.vehicle_type]} 
                    points={points}
                />
            )}
            {dataAdvertisements.length > 0 &&<ListPromotions dataPromotion={dataAdvertisements}/>}
            {dataPromotions.length > 0 && <ListDiscount dataDisconunt={dataPromotions}/>}
            {stations.length > 0 && <CloseStations stations={stations}/>}
            
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