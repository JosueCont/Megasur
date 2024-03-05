import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfoForm from "../../../components/profile/PersonalInfo";
import { onChangeModalProf, requestDeleteAccount } from "../../../store/ducks/profileDuck";
import { Video } from "expo-av";

const {height, width} = Dimensions.get('window');

const ConfirmRateScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const route = useRoute()

    const {points} = route.params;

    return(
        <HeaderLogged
            title="Redención de puntos"
            isBack={true}
            goBack={() => navigation.goBack()}
            bgColor={Colors.white}>
                <View>
                    <View style={{height: height/3, width: width}}>
                        <Video  
                            source={require('../../../../assets/confeti.mp4')}
                            style={{width: width, height: height/3,}}
                            useNativeControls={false}
                            resizeMode="cover"
                            isLooping
                            shouldPlay
                        />
                    </View>
                    <Text style={styles.title}>¡Felicidades!</Text>
                    <Text style={styles.subtitle}>Añadimos {points || 10} a tu cuenta</Text>
                    <View style={styles.contBtn}>
                        <TouchableOpacity 
                            style={styles.btn}
                            onPress={() => navigation.goBack()}>
                            <Text style={styles.lblBtn}>Continuar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    title:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(56), 
        fontWeight:'700', 
        marginBottom:16
    },
    subtitle:{
        textAlign:'center', 
        width: width/1.8,
        color: Colors.darkGray,
        fontSize: getFontSize(14),
        fontWeight:'400', 
        marginBottom:28
    },
    contBtn:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width: width/1.2,
    },
    btn:{
        width: 120,
        height:44,
        backgroundColor: Colors.blueGreen,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white,
        fontSize: getFontSize(14),
        fontWeight:'400',
        textAlign:'center'
    }
})

export default ConfirmRateScreen;