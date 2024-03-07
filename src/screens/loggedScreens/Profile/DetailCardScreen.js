import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../../components/profile/Card";
import { onChangeValueRedeem, setCardSelected } from "../../../store/ducks/redeemPointsDuck";
import ModalPhysicalCard from "../../../components/modals/ModalAddPhysicalCard";

const {height, width} = Dimensions.get('window');

const DetailCardScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const cardSelected = useSelector(state => state.redeemDuck.cardSelected)
    const modalAddCard = useSelector(state => state.redeemDuck.modalAddCard)
    console.log('cardSelected', cardSelected)

    const changeValue = (prop,value) => {
        dispatch(onChangeValueRedeem({prop,value}))
    }

    return(
        <HeaderLogged
            title="Redimir puntos"
            isBack={true}
            goBack={() => navigation.goBack()}>
                <View style={styles.container}>
                    {cardSelected != null && <CardItem item={cardSelected} index={1} disable={true} showPts={true}/>}
                    <View style={styles.card}>
                        <Text style={{color: Colors.blueGreen, fontSize: getFontSize(18), fontWeight:'700', marginBottom:10}}>Tarjetas redimidas</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between',}}>
                            <Text style={{color: Colors.darkGray, fontSize: getFontSize(16), fontWeight:'400'}}>1028 3783 0323 9993</Text>
                            <Text style={{color: Colors.darkGray, fontSize: getFontSize(16), fontWeight:'600'}}>270 pts</Text>
                        </View>
                    </View>
                        <Text style={{textAlign:'center', color: Colors.grayStrong, fontSize: getFontSize(16), fontWeight:'700', marginBottom:60}}>Se podrá añadir un máximo de 3 tarjetas.</Text>
                    <TouchableOpacity 
                        onPress={() => changeValue('modalAddCard', true)}
                        style={[styles.btn,]}>
                        <Text style={styles.lbl}>Redimir puntos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            dispatch(setCardSelected(null))
                            setTimeout(() => {
                                navigation.goBack();
                            },200)
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
                        changeValue('modalAddCard', false)
                        setTimeout(() => {
                            navigation.navigate('RedemPoints')
                        },500)
                    }}
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
    }
})

export default DetailCardScreen;