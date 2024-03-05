import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import LogoMega from "../../../assets/svg/LogoMega";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { onChangeModalProf, onVerifyEmail, verifyCodeEmail } from "../../store/ducks/profileDuck";
import ModalVerifyEmail from "../modals/ModalVerifyEmail";
import SwitchNotification from "./SwitchNotification";


const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const modalVerify = useSelector(state => state.profileDuck.modalVerify)
    const user = useSelector(state => state.profileDuck.dataUser)
    const isValid = useSelector(state => state.profileDuck.isEmailVerified)
    const code = useSelector(state => state.profileDuck.code)
    
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('FormProfile')}
                style={{}}>
                    <Image source={require('../../../assets/profile.png')} style={{height:120, width:120, borderRadius:60, resizeMode:'contain'}}/>
                
            </TouchableOpacity>
            <View style={{flex:2, marginLeft:10}}>
                <TouchableOpacity onPress={() => navigation.navigate('FormProfile')}>
                    <Text style={styles.title}>{user?.first_name}</Text>
                    <Text style={[styles.title,{fontWeight:'400'}]}>{user?.last_name}</Text>

                </TouchableOpacity>
                <View style={styles.contMail}>
                    {isValid && <AntDesign name="checkcircle" size={16} color={Colors.green} /> }
                    <Text style={[styles.lblMail,{color: isValid ? Colors.darkGray : Colors.red, }]}>{user?.email}</Text>
                </View>
                {!isValid ? ( 
                    <TouchableOpacity 
                        onPress={() => {
                            dispatch(onVerifyEmail(user?.id));
                            dispatch(onChangeModalProf({prop:'modalVerify', value:true}));
                        }}
                        style={{flexDirection:'row',}}>
                        <AntDesign name="warning" size={15} color={Colors.red} />
                        <Text style={styles.lblWarinig}>Verifica aquí tu correo electrónico</Text>
                    </TouchableOpacity>
                ):null}
                <SwitchNotification />
            </View>
            {/*<Image source={require('../../../assets/LogoMegaCard.png')} style={styles.img}/>*/}
            <ModalVerifyEmail 
                visible={modalVerify} 
                onClose={() => dispatch(onChangeModalProf({prop:'modalVerify', value:false}))}
                onVerify={() => {
                    dispatch(verifyCodeEmail({userId:user?.id,code}))
                }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        flex:1, 
        justifyContent:'space-between', 
        alignItems:'center', 
        marginBottom:20,
        paddingHorizontal:10,
        borderBottomColor: Colors.grayBorders,
        borderBottomWidth:2
    },
    title:{
        color: Colors.darkGray, 
        fontSize: getFontSize(25), 
        fontWeight:'800',
    },
    contMail:{
        flexDirection:'row', 
        alignItems:'center',
        //justifyContent:'center'
    },
    lblMail:{
        fontSize: getFontSize(12), 
        fontWeight:'700', 
        marginBottom:4, 
        marginLeft:4,
        marginTop:5
    },
    lblWarinig:{
        color: Colors.red, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    },
    img:{
        width:60, height:60, resizeMode:'contain'
    }
})

export default VerifyEmail;