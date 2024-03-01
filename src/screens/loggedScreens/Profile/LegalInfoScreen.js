import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfoForm from "../../../components/profile/PersonalInfo";
import { onChangeModalProf, requestDeleteAccount } from "../../../store/ducks/profileDuck";
import HTMLView from "react-native-htmlview";

const LegalInfoScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const terms = useSelector(state => state.homeDuck.setupData)


    return(
        <HeaderLogged
            title="Información legal"
            isBack={true}
            goBack={() => navigation.goBack()}>
                <View style={{marginHorizontal:10}}>
                    <Image source={require('../../../../assets/LogoMegaCard.png')} style={styles.img}/>
                    <HTMLView
                        value={terms?.terms_and_conditions}
                        stylesheet={styles}
                    />
                </View>
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    img:{
        width:60, 
        height:60, 
        resizeMode:'contain',
        alignSelf:'flex-end',
        marginBottom:15
    }
})

export default LegalInfoScreen;