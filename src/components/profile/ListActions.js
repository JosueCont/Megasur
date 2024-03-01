import React,{useEffect,} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
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
        {name:'Mi auto', icon:'car', route:'MyCar'},
        {name:'Vincular', icon:'credit-card-alt', route:'Link'},
        {name:'Facturación', icon:'file', route:'CheckIn'},
        {name:'Encuestas contestadas', icon:'file-text', route:'AnsweredSurvey'},
        {name:'Información legal', icon:'signature', route:'InfoLegal'},
        {name:'Acerca de la app', icon:'info-circle', route:'About'}
    ]

    return(
        <View style={{marginLeft:15}}>
            {options.map((item,index) => (
                <TouchableOpacity 
                    key={index}
                    onPress={() => navigation.navigate(item?.route)}
                    style={styles.contSection}>
                    {item.icon === 'signature' ? (
                        <View style={{width:30}}>
                            <FontAwesome5 name="signature" size={20} color="black" />

                        </View>
                    ):(
                        <View style={{width:30}}>

                            <FontAwesome name={item.icon} size={20} color="black" />
                        </View>
                    )}
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
        marginBottom:25
    },
    lblSection:{
        marginLeft:15, 
        color: Colors.grayStrong, 
        fontSize: getFontSize(16),
    },
    btnCLose:{
        justifyContent:'center', 
        alignItems:'center', 
        marginRight:15
    },
    lblClose:{
        color: Colors.red, 
        fontSize: getFontSize(16), 
        textDecorationLine:'underline'
    }
})

export default ListActionsProfile;