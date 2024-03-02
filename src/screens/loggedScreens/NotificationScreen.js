import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useToast, Alert, VStack, HStack,  } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import HeaderLogged from "../../components/Headers/HeaderLogged";
import { useNavigation } from "@react-navigation/native";
import AccordionNotifications from "../../components/Notifications/AccordionItemNotify";
import AccordionItem from "../../components/profile/AccordionItem";

const NotificationScreen = () => {
    const navigation = useNavigation()
    const [notifications, setNotifications] = useState([
        {
            id:1,
            title:'Gracias por sus respuestas',
            date:'20/01/2024',
            description:'Por responder a la encuesta te hemos dado 100 puntos'
        },
        {
            id:2,
            title: 'Aprovecha los ultimos descuentos',
            date:'30/01/2024',
            description:'Ultimos días de enero con increibles descuentos en sucursales'
        },
        {
            id:3,
            title:'Bienvenido febrero',
            date:'01/02/2024',
            description:'Carga con nosotros y obten 300 puntos extra como regalo'
        }
    ])

    useEffect(() => {
        //setNotifications()
    },[notifications])

    const onDeleteItem = (notification) => {
        setNotifications( prev => prev.filter(item => item.id !== notification))
    }

    return(
        <HeaderLogged 
            title="Notificaciones"
            showSubtitle={true} 
            isBack={true} 
            goBack={() => navigation.goBack()}>
                <View style={{marginHorizontal:20, backgroundColor: Colors.white, borderRadius:8}}>
                    {notifications.map((item,index) => (
                        <AccordionNotifications 
                            index={index} 
                            item={item}
                            onDeleted={(item) => {
                                onDeleteItem(item.id)
                            }}
                        />
                    ))}

                </View>
        </HeaderLogged>
    )
}

export default NotificationScreen;