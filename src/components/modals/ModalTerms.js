import React,{useEffect,useState} from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import { Colors } from "../../utils/Colors";
import Check from '../../../assets/svg/Check'
import { getFontSize } from "../../utils/functions";
import { ScrollView } from "native-base";
import { useSelector } from "react-redux";
import HTMLView from 'react-native-htmlview';


const {height, width} = Dimensions.get('window');

const ModalTerms = ({visible, setVisible, message}) => {
    const terms = useSelector(state => state.homeDuck.setupData)
    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <ImageBackground 
                        source={require('../../../assets/waves.png')} 
                        imageStyle={{borderTopRightRadius:20, borderTopLeftRadius:20,}}
                        style={{height:70, width: width/1.1, resizeMode:'cover',padding:12}} >
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image source={require('../../../assets/LogoMegaCard.png')} style={{width:50, height:50, resizeMode:'contain',}}/>
                                <Text style={{color: Colors.white, fontSize: getFontSize(20), fontWeight:'700'}}>Terminos y condiciones</Text>
                            </View>
                        </ImageBackground>
                        <ScrollView
                            keyboardShouldPersistTaps='handled'
                            automaticallyAdjustKeyboardInsets
                            nestedScrollEnabled={true}
                            overScrollMode="always"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom:20,
                                padding:12

                            }}>
                                <HTMLView
                                    value={terms?.terms_and_conditions}
                                    stylesheet={styles}
                                    />
                        </ScrollView>
                    <TouchableOpacity style={styles.btn} onPress={setVisible}>
                        <Text style={styles.txtBtn}>Entendido</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
} 

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        width: width/1.1,
        height: height/1.3,
        backgroundColor: Colors.lightGray,
        borderRadius:20,
        //alignItems:'center',
        //paddingVertical:20,
        //paddingHorizontal:10
    },
    message:{
        marginBottom:18, 
        marginTop:15, 
        fontSize: getFontSize(16), 
        fontWeight:'700', 
        color: Colors.darkGray, 
        textAlign:'center'
    },
    btn:{
        width:120, 
        height:40, 
        backgroundColor:Colors.blueGreen, 
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center',
        alignSelf:'center', marginBottom:10
    },
    txtBtn:{
        fontSize: getFontSize(16), 
        fontWeight:'700', 
        color:Colors.white
    }

})

export default ModalTerms;