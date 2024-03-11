import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { Video } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";

const {height, width} = Dimensions.get('window');

const SurveyDoneScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {points} = route.params;
    
    return(
        <HeaderLogged
            title="Encuesta contestada"
            noPadding={true}
            bgColor={Colors.white}
        >
            <View style={{alignItems:'center'}}> 
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
                <Text style={styles.subtitle}>Añadimos {points} pts a tu cuenta</Text>
                <View style={styles.contBtn}>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => navigation.navigate('House')}>
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
        fontSize: getFontSize(18),
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

export default SurveyDoneScreen