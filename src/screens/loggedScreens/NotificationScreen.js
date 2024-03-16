import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useToast, Alert, VStack, HStack,  } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import HeaderLogged from "../../components/Headers/HeaderLogged";
import { useNavigation } from "@react-navigation/native";
import AccordionNotifications from "../../components/Notifications/AccordionItemNotify";
import AccordionItem from "../../components/profile/AccordionItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification, getCountNotifications, getUserNotifications, onDeleteNotification, onNotificationAsRead, refreshNotificationScreen } from "../../store/ducks/NotificationsDuck";
import EmptyList from "../../components/Exchanges/EmptyList";

const NotificationScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const notifications = useSelector(state => state.notificationsDuck.notifications)
    const refresh = useSelector(state => state.notificationsDuck.refresh)
    const userId = useSelector(state => state.authDuck.dataUser?.id)


    const [firstRender, setFirstRender] = useState(true);
    const [fetchNotifications, setFetchNotifications] = useState(true);


    useEffect(() => {
        if (firstRender) {
          setFirstRender(false);
          return;
        }else{
            (async() => {
                if(fetchNotifications){
                    try {
                        await dispatch(getUserNotifications(`?page=1&per_page=50&is_read=true&user_id=${userId}`))
                        dispatch(getCountNotifications())
    
                    } catch (e) {
                        console.log('eeror local',e)
                    }finally {
                        setFetchNotifications(false);
                    }
                }
            })()
        }
      }, [notifications]);

    useEffect(() => {
        //setNotifications()
    },[notifications])

    const onRefresh = () => {
        dispatch(refreshNotificationScreen())
        setTimeout(() => {
            dispatch(getUserNotifications(`?page=1&per_page=50&is_read=true&user_id=${userId}`))
        },500)
    }

    return(
        <HeaderLogged 
            title="Notificaciones"
            showSubtitle={true} 
            refresh={refresh}
            onRefresh={() => onRefresh()}
            isBack={true} 
            goBack={() => navigation.goBack()}>
                <View style={{marginHorizontal:20, backgroundColor: Colors.white, borderRadius:8}}>
                    {notifications.length > 0 ? notifications.map((item,index) => (
                        <AccordionNotifications 
                            index={index} 
                            item={item}
                            onDeleted={(item) => {
                                dispatch(onDeleteNotification(item?.id))
                                setFetchNotifications(true); 
                                //onDeleteItem(item.id)
                            }}
                            onRead={(item) => {
                                dispatch(onNotificationAsRead(item?.id))
                                setFetchNotifications(true); 
                            }}
                        />
                    )): <EmptyList message='No has recibido notificaciones'/>}

                </View>
        </HeaderLogged>
    )
}

export default NotificationScreen;