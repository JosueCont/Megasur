import React, {useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { TextArea, useToast, Alert, VStack, HStack, Spinner } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "native-base";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import Input from "../../../components/CustomInput";
import { changeValueContact, cleanContact, onSendMail } from "../../../store/ducks/contactDuck";
import ModalAlertFailed from "../../../components/modals/ModalAlertFail";

const {height, width} = Dimensions.get('window');

const SendQuestionScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const toast = useToast();
    const question = useSelector(state => state.contactDuck.question)
    const comment = useSelector(state => state.contactDuck.comment)
    const modalFailed = useSelector(state => state.contactDuck.modalFailed)
    const message = useSelector(state => state.contactDuck.message)
    const isSentMail = useSelector(state => state.contactDuck.isSentMail)
    const loading = useSelector(state => state.contactDuck.loading)

    useEffect(() => {
        if(isSentMail){
            toast.show({
                placement:'top',
                render:({id}) =>(
                    <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status='success' variant='solid' backgroundColor={Colors.green}>
                        <VStack space={1} flexShrink={1} w="100%" >
                            <HStack flexShrink={1} alignItems="center" justifyContent="space-between" >
                                <HStack space={2} flexShrink={1} alignItems="center">
                                    <Alert.Icon/>
                                    <Text style={{color: Colors.white, fontSize: getFontSize(17)}}>{message}</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                )
            })
            navigation.goBack();
            setTimeout(() => {
                dispatch(cleanContact())
            },500)
        }
    },[isSentMail])

    return(
        <HeaderLogged
            title="Envía mansaje"
            isBack={true}
            goBack={() => navigation.goBack()}
        >
            <View style={{marginHorizontal:10}}>
                <View style={{marginBottom:15}}>
                    <Text style={styles.lbl}>¿Cuál es el tema de tu consulta?</Text>
                    <Input 
                        style={styles.input}
                        value={question}
                        setValue={(value) => dispatch(changeValueContact({prop:'question', value}))}
                    />
                </View>
                    
                <Text style={styles.lbl}>Cuéntanos un poco más...</Text>
                <TextArea 
                    w={width * .95}
                    h={180}
                    borderRadius={5}
                    backgroundColor={Colors.white}
                    //marginTop={3}
                    //alignSelf={'center'}
                    //marginX={3}
                    marginBottom={7}
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
                    multiline={true}
                    returnKeyType='default'
                    value={comment}
                    onChangeText={(value) => dispatch(changeValueContact({prop:'comment', value}))}
                />
                <TouchableOpacity 
                    disabled={!(question !='' && comment!='')}
                    onPress={() => dispatch(onSendMail({question,comment}))}
                    style={[styles.btn,{backgroundColor: !(question !='' && comment!='') ? Colors.gray : Colors.blueGreen}]}>
                    {loading ? <Spinner size={'sm'} color={'white'} /> : <Text style={styles.lblbtn}>Enviar</Text>}
                </TouchableOpacity>
            </View>
            <ModalAlertFailed 
                visible={modalFailed}
                setVisible={() => dispatch(changeValueContact({prop:'modalFailed', value: false}))}
                message={message}
            />
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    input:{
        width: width*.95,
        height:44,
        borderRadius:8,
        elevation:2,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4,
    },
    lbl:{
        color: Colors.grayV4,
        fontSize: getFontSize(14),
        fontWeight:'300',
        marginBottom:5
    },
    input:{
        height: 44,  
        borderRadius:8, 
        padding:7,
        borderColor:Colors.gray,
        borderWidth:1,
        elevation:0,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    btn:{
        paddingVertical:13, 
        backgroundColor: Colors.blueGreen, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8
    },
    lblbtn:{
        color: Colors.white, 
        fontSize: getFontSize(14), 
        fontWeight:'400'
    }
})

export default SendQuestionScreen;