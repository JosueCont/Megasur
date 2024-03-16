import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { Skeleton } from "native-base";
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
    const loader = useSelector(state => state.profileDuck.loading)
    const profile_picture = useSelector(state => state.profileDuck.userImage)

    
    return(
        <View style={styles.container}>
            {!loader ? (
                <TouchableOpacity 
                    onPress={() => navigation.navigate('FormProfile')}
                    style={{}}>
                        {profile_picture !=null 
                            && profile_picture !='' && 
                            profile_picture?.split('/').pop() !== 'None' ? (
                            <Image source={{uri: profile_picture}} style={styles.imgProfile}/>
                        ):(
                                <Image source={require('../../../assets/profile.png')} style={styles.imgProfile}/>
                        )}

                </TouchableOpacity>
            ):(
                <Skeleton  lines={1} borderRadius={60} height={120} width={120} mb={2} backgroundColor={'gray.100'}/>
            )}
            <View style={{flex:2, marginLeft:10}}>
                <TouchableOpacity onPress={() => navigation.navigate('FormProfile')}>
                    {loader ? <Skeleton.Text px="10" lines={1} mb={2} mt={2} backgroundColor={'gray.100'}/> :<Text style={styles.title}>{user?.first_name}</Text>}
                    {loader ? <Skeleton.Text px="10" lines={1} mb={2} mt={2} backgroundColor={'gray.100'}/> :<Text style={[styles.title,{fontWeight:'400'}]}>{user?.last_name}</Text>}

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
    },
    imgProfile:{
        height:120, 
        width:120, 
        borderRadius:60, 
        resizeMode:'contain'
    }
})

export default VerifyEmail;