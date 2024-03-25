import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList,  } from "react-native";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfoForm from "../../../components/profile/PersonalInfo";
import { onChangeModalProf, requestDeleteAccount } from "../../../store/ducks/profileDuck";
import EmptyList from "../../../components/Exchanges/EmptyList";
import { MaterialIcons } from '@expo/vector-icons';
import CardItem from "../../../components/profile/Card";
import { setCardSelected } from "../../../store/ducks/redeemPointsDuck";


const LinkScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const route = useRoute();
    const userCard = useSelector(state => state.authDuck.cardsStorage)
    const loader = false
    const cardSelected = useSelector(state => state.redeemDuck.cardSelected)


    useEffect(() => {
        console.log('route',cardSelected)
    },[])

    return(
        <HeaderLogged
            title="Validar tarjeta"
            isBack={true}
            goBack={() => navigation.dispatch(CommonActions.reset({
                index:0,
                routes:[{name:route?.params?.route === 'Profile' ? 'Profile' : 'Home', params: {screen: route?.params?.route}}]
            }))}>
                <View style={styles.container}>
                    {loader ? (
                        <View>
                        </View>
                    ): userCard.length > 0 ? userCard.map((item,index) => (
                        <CardItem 
                            item={item} 
                            index={index} 
                            cardSelected={(item) => dispatch(setCardSelected(item))}
                        />
                    )): (
                        <View>
                            <MaterialIcons name="credit-card-off" size={24} color={Colors.blueGreen} />
                        </View>
                    )}
                    <TouchableOpacity 
                        disabled={cardSelected != null ? false : true}
                        onPress={() => navigation.navigate('DetailCard')}
                        style={[styles.btn,{backgroundColor: cardSelected != null ? Colors.blueGreen : Colors.gray }]}>
                        <Text style={styles.lbl}>Vincular tarjeta física</Text>
                    </TouchableOpacity>
                </View>
                
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10, 
        flex:1, 
        justifyContent:'space-between'
    },
    btn:{
        alignItems:'center', 
        justifyContent:'center', 
        paddingHorizontal:10, 
        paddingVertical:15, 
        borderRadius:8, 
        backgroundColor: Colors.blueGreen
    },
    lbl:{
        color: Colors.white, 
        fontSize: getFontSize(14), 
        fontWeight:'400'
    }
})

export default LinkScreen;