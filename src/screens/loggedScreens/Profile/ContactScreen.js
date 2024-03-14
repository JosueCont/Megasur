import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Linking } from "react-native";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute, CommonActions} from "@react-navigation/native";
import HeaderLogged from "../../../components/Headers/HeaderLogged";

const {height, width} = Dimensions.get('window');

const ContactScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const route = useRoute()
    const phone = useSelector(state => state.homeDuck.setupData?.contact_phone)

    useEffect(() => {
        console.log('route',route)
    },[])


    const options = [
        {name:'Consulta nuestras preguntas frecuentes', icon: require('../../../../assets/question.png'),route:'FrecuentQuestions'},
        {name:'Envíanos un mensaje', icon: require('../../../../assets/message.png'), route:'ContactUs'},
        {name:'Contáctanos en WhatsApp',icon: require('../../../../assets/whatsApp.png'), route:'Whats'}
    ]

    const openWhatsApp = () => {
        const whatsappUrl = `whatsapp://send?phone=${phone}`;
        const canOpen = Linking.canOpenURL(whatsappUrl);
        if(canOpen){
            Linking.openURL(whatsappUrl);
        }else{
            console.log('No es posible abrir WhatsApp en este dispositivo.');
        }
    }
    return(
        <HeaderLogged 
            title="Contacto" 
            isBack={true} 
            goBack={() => navigation.dispatch(CommonActions.reset({
                index:0,
                routes:[{name:route?.params?.route, params: {screen: route?.params?.route}}]
            }))}>
                <View style={{marginHorizontal:15}}>
                    <Text style={styles.lblTitle}>¿Tienes dudas?</Text>
                    <View style={styles.cont}>
                        {options.map((item,index) => (
                            <TouchableOpacity 
                                onPress={() => {
                                    if(item.route === 'Whats'){
                                        openWhatsApp()
                                    }else{
                                        navigation.navigate(item.route)
                                    }
                                }}
                                style={styles.card}
                                key={index+1}>
                                <Image source={item.icon} style={styles.img}/>
                                <Text style={styles.lblName}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    lblTitle:{
        color: Colors.darkGray, 
        fontSize: getFontSize(24), 
        fontWeight:'700'
    },
    cont:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:30,
        alignItems:'center',
        justifyContent:'space-between',
    },
    card:{
        width: width*.43, 
        borderRadius:16, 
        height:155, 
        backgroundColor: Colors.blueGreen, 
        //marginRight:16, 
        marginBottom:16,
        justifyContent:'center', 
        alignItems:'center'
    },
    img:{
        width: 80, 
        height:80, 
        resizeMode:'cover', 
        marginBottom:6
    },
    lblName:{
        color: Colors.white, 
        fontSize: getFontSize(13), 
        fontWeight:'400', 
        textAlign:'center'
    }
})

export default ContactScreen