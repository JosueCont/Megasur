import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image} from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { onChangeModalProf } from "../../store/ducks/profileDuck";


const ListActionsProfile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const options =[
        {name:'Mi auto', icon: require('../../../assets/car-icon.png'), route:'MyCar'},
        {name:'Vincular', icon: require('../../../assets/card-icon.png'), route:'Link'},
        {name:'Facturación', icon: require('../../../assets/file-icon.png'), route:'CheckIn'},
        {name:'Encuestas contestadas', icon: require('../../../assets/poll-icon.png'), route:'AnsweredSurvey'},
        {name:'Información legal', icon: require('../../../assets/signature-icon.png'), route:'InfoLegal'},
        {name:'Acerca de la app', icon: require('../../../assets/info-icon.png'), route:'About'}
    ]

    return(
        <View style={{marginLeft:15}}>
            {options.map((item,index) => (
                <TouchableOpacity 
                    key={index}
                    onPress={() => navigation.navigate(item?.route, {route: item?.route === 'Link' ? 'Profile' : ''})}
                    style={styles.contSection}>
                        <View style={{width:30}}>
                            <Image source={item?.icon} style={{width:20, height:20, resizeMode:'contain'}}/>
                        </View>
                    {/*item.icon === 'signature' ? (
                        <View style={{width:30}}>
                            <FontAwesome5 name="signature" size={20} color="black" />

                        </View>
                    ):(
                        <View style={{width:30}}>

                            <FontAwesome name={item.icon} size={20} color="black" />
                        </View>
                    )*/}
                    <Text style={styles.lblSection}>{item?.name}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity 
                onPress={() => dispatch(onChangeModalProf({prop:'modalActive', value: true}))}
                style={styles.btnCLose}>
                <Text style={styles.lblClose}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contSection:{
        flexDirection:'row', 
        alignItems:'center', 
        marginBottom:40
    },
    lblSection:{
        marginLeft:15, 
        color: Colors.grayStrong, 
        fontSize: getFontSize(16),
    },
    btnCLose:{
        justifyContent:'center', 
        alignItems:'center', 
        marginRight:15, 
        marginBottom:20,
    },
    lblClose:{
        color: Colors.red, 
        fontSize: getFontSize(16), 
        textDecorationLine:'underline'
    }
})

export default ListActionsProfile;