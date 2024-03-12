import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../../components/profile/Card";
import { exchangeCard, getPhysicCardsExchange, onChangeValueRedeem, setCardSelected } from "../../../store/ducks/redeemPointsDuck";
import ModalPhysicalCard from "../../../components/modals/ModalAddPhysicalCard";
import { Skeleton, useToast, Alert, VStack, HStack } from "native-base";
import ModalAlertFailed from '../../../components/modals/ModalAlertFail'
import ModalAlertSuccess from '../../../components/modals/AlertModalSucces'

const {height, width} = Dimensions.get('window');

const DetailCardScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const toast = useToast();
    const cardSelected = useSelector(state => state.redeemDuck.cardSelected)
    const modalAddCard = useSelector(state => state.redeemDuck.modalAddCard)
    const loading = useSelector(state => state.redeemDuck.loading)
    const exchangeCards = useSelector(state => state.redeemDuck.exchangeCards)
    const exchanged = useSelector(state => state.redeemDuck.exchanged)
    const modalSuccess = useSelector(state => state.redeemDuck.modalSuccess)
    const modalFailed = useSelector(state => state.redeemDuck.modalFailed)
    const message = useSelector(state => state.redeemDuck.message)
    const cardNumber = useSelector(state => state.redeemDuck.cardNumber)



    const changeValue = (prop,value) => {
        dispatch(onChangeValueRedeem({prop,value}))
    }

    useEffect(() => {
        (async() => {
            await dispatch(getPhysicCardsExchange(cardSelected?.user_card_id))
        })()
        if(exchanged){
            navigation.navigate('RedemPoints')
        }
    },[exchanged])

    const getPoints = () => {
        return exchangeCards.reduce((total, item) => {
            return total + item?.points
        },0)
    }

    return(
        <HeaderLogged
            title="Redimir puntos"
            isBack={true}
            goBack={() => {
                dispatch(setCardSelected(null))
                navigation.goBack()
            }}>
                <View style={styles.container}>
                    {cardSelected != null && <CardItem item={cardSelected} index={1} disable={true} showPts={true} points={getPoints()}/>}
                    {loading ? (
                        <Skeleton lines={1} width={width * .93} height={100} mt={4} borderRadius={13} backgroundColor={'gray.200'}/>
                    ): (
                        <View style={styles.card}>
                            <Text style={styles.lblTitle}>Tarjetas redimidas</Text>
                            {exchangeCards.length > 0 ? exchangeCards.map((item,index) => (
                                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:7}} key={index+1}>
                                    <Text style={[styles.lbl16,{ fontWeight:'400'}]}>{item?.card_number.toString()}</Text>
                                    <Text style={[styles.lbl16,{ fontWeight:'600'}]}>{item?.points} pts</Text>
                                </View>

                            )):(
                                <Text style={{color: Colors.grayStrong, fontSize: getFontSize(13), fontWeight:'400', textAlign:'center'}}>No has agregado tarjetas</Text>
                            )}
                        </View>

                    )}
                    {loading ? (
                        <Skeleton.Text px="10" lines={1} mb={2} mt={2} backgroundColor={'gray.100'}/>
                    ):(

                        <Text style={styles.banner}>Se podrá añadir un máximo de 3 tarjetas.</Text>
                    )}
                    {exchangeCards.length <3 && (
                        <TouchableOpacity 
                            onPress={() => changeValue('modalAddCard', true)}
                            style={[styles.btn,]}>
                            <Text style={styles.lbl}>Redimir puntos</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.goBack();
                            dispatch(setCardSelected(null))
                        }}
                        style={[styles.btn,]}>
                        <Text style={styles.lbl}>Cambiar tarjeta</Text>
                    </TouchableOpacity>
                </View>
                <ModalPhysicalCard 
                    visible={modalAddCard}
                    setVisible={() => changeValue('modalAddCard', false)}
                    onChange={(value) => changeValue('cardNumber', value)}
                    onSubmit={() => {
                        dispatch(exchangeCard({userCardId:cardSelected?.user_card_id, cardNumber}))
                    }}
                />
                <ModalAlertFailed 
                    visible={modalFailed}
                    setVisible={() => changeValue('modalFailed',false)}
                    message={message}
                />
                
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10, 
        flex:1, 
    },
    card:{
        marginTop:50, 
        width: width * .93, 
        padding:10, 
        backgroundColor: Colors.white, 
        borderRadius:8,
        marginBottom:15,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    btn:{
        alignItems:'center', 
        justifyContent:'center', 
        paddingHorizontal:10, 
        paddingVertical:15, 
        borderRadius:8, 
        backgroundColor: Colors.blueGreen,
        marginBottom:15
    },
    lbl:{
        color: Colors.white, 
        fontSize: getFontSize(14), 
        fontWeight:'400'
    },
    lblTitle:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(18), 
        fontWeight:'700', 
        marginBottom:10
    },
    lbl16:{
        color: Colors.darkGray, 
        fontSize: getFontSize(16),
    },
    banner:{
        textAlign:'center', 
        color: Colors.grayStrong, 
        fontSize: getFontSize(16), 
        fontWeight:'700', 
        marginBottom:60
    }
})

export default DetailCardScreen;