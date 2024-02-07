import React,{useEffect,useState} from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { TextArea } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { AntDesign } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import Animated,{withSpring, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import RateStars from "../RateStars";
import KeyboardAvoidingCustom from "../KeyboardAvoidingCustom";
import { changeInputCharges } from "../../store/ducks/chargesDuck";

const {height, width} = Dimensions.get('window');

const ModalRateCharge = ({visible, setVisible, onRate}) => {
    const dispatch = useDispatch();
    const [starRating, setStarRating] = useState(null);
    const [isComment, setComment] = useState(false)
    const comment = useSelector(state => state.chargesDuck.comment)
    const info = useSelector(state => state.chargesDuck.infoCharge)

    useEffect(() => {
        setStarRating(null)
        setComment(false)
        console.log('info',info)
    },[visible])


    return(
        <Modal
            visible={visible} animationType='slide' transparent>
                <StatusBar
                    animated={true}
                    backgroundColor="rgba(0,0,0,0.5)"
                    color={Colors.white}
                    style='light'
                    hidden={false}
                />
                <View style={styles.container}>
                <KeyboardAvoidingCustom>
                    <View style={[styles.card,]}>
                        <TouchableOpacity style={styles.contClose} onPress={setVisible}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                        {!isComment ? (
                            <>
                                <View style={styles.contDesc}>
                                    <Text style={styles.question}>¿Cómo deseas calificar el servicio?</Text>
                                </View>
                                <RateStars starRating={starRating} setStar={(val) => setStarRating(val)}/>
                                <Text style={[styles.lblDesc,{fontSize: getFontSize(15), textAlign:'center', marginTop:10}]}>Muchas gracias, tu opinion nos importa.</Text>
                                {/*starRating != null && <Text style={[styles.lblDesc,{fontSize: getFontSize(12), textAlign:'center'}]}>¡Tus puntos han sido agregados a tu cuenta!</Text> */}
                                {starRating != null ? (
                                    <View style={styles.contSectionPoints}>
                                        {/*<Text style={styles.lblPoints}>+100<Text style={{fontWeight:'400'}}>pts</Text></Text>*/}
                                    </View>
                                ) : null}
                            
                                <View style={styles.contBtn}>
                                    <TouchableOpacity 
                                        onPress={() => setComment(true)}
                                        style={[styles.btn,{marginRight:15,}]}>
                                        <Text style={styles.lblBtn}>Añadir comentario</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.btn,{backgroundColor: starRating != null ? Colors.blueGreen : Colors.gray }]} 
                                        onPress={() => onRate(info, starRating)} 
                                        disabled={starRating != null ? false : true}>
                                        <Text style={styles.lblBtn}>Calificar</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <View >
                                <Text style={styles.lblComment}>Dinos que podemos mejorar</Text>
                                <TextArea 
                                    w={width/1.2}
                                    h={180}
                                    borderRadius={5}
                                    backgroundColor={Colors.white}
                                    marginTop={3}
                                    alignSelf={'center'}
                                    //marginX={3}
                                    marginBottom={5}
                                    shadow={{
                                        elevation:4,
                                        shadowColor: '#000', // Color de la sombra
                                        shadowOffset: {
                                          width: 0,  
                                          height: 4,
                                        },
                                        shadowOpacity: 0.25, 
                                        shadowRadius: 4, 
                                    }}
                                    
                                    value={comment}
                                    onChangeText={(value) => dispatch(changeInputCharges({prop:'comment', value}))}
                                />
                                <TouchableOpacity style={styles.btnSend} onPress={() => onRate(info, starRating)}>
                                    <Text style={styles.lblSend}>Enviar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </KeyboardAvoidingCustom>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
    },
    card:{
        backgroundColor: Colors.white,
        borderRadius:15,
        width: width/1.1,
        height: 320,
        marginHorizontal:10
    },
    contClose:{
        alignSelf:'flex-end', 
        backgroundColor: Colors.gray, 
        borderTopEndRadius:15,  
        padding:4, marginBottom:5
    },
    contDesc:{
        justifyContent:'center',
        alignItems:'center', 
        marginBottom:10
    },
    lbl:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(14), 
        fontWeight:'400', 
        marginBottom:10
    },
    question:{
        width: width/1.7, 
        textAlign:'center', 
        fontSize: getFontSize(18), 
        color: Colors.blueGreen
    },
    contSectionPoints:{
        alignItems:'center', 
        marginTop:15
    },
    lblPoints:{
        fontSize: getFontSize(18), 
        color: Colors.blueGreen, 
        fontWeight:'800', 
        marginBottom:8
    },
    lblDesc:{
        color: Colors.grayStrong, 
        fontWeight:'400'
    },
    contBtn:{
        flexDirection:'row', 
        justifyContent:'center',
        marginTop:20
    },
    btn:{
        width: width/2.5, 
        height:40, 
        backgroundColor: Colors.blueGreen, 
        borderRadius:8,
        justifyContent:'center', 
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(13), 
        fontWeight:'500'
    },
    btnSend:{
        width: width/1.2, 
        height:50, 
        backgroundColor: Colors.blueGreen,
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center', 
        alignSelf:'center'
    },
    lblSend:{
        color: Colors.white, 
        fontSize: getFontSize(15), 
        fontWeight:'400'
    },
    lblComment:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(14), 
        fontWeight:'400', 
        marginLeft:15
    }
})

export default ModalRateCharge;