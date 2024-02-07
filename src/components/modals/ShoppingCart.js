import React,{useEffect,useState} from "react";
import {  Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Select, Modal, useToast, Alert, VStack, HStack } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
  } from 'react-native-reanimated';
  
  import { GestureDetector, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from "react-redux";
import ShoppingItem from "../Exchanges/ShoppingCartItem";

const {height, width} = Dimensions.get('window');

const ModalShoppingCart = ({visible, setVisible, branches, points, onSubmit}) => {
    const translateY = useSharedValue(0);
    const pan = Gesture.Pan()
    const shoppingCart = useSelector(state => state.exchangeDuck.cart)
    const total = 2000
    const isVerifyMail = useSelector(state => state.profileDuck.isEmailVerified)
    const [showToast, setShowToast] = useState(false)
    const toast = useToast();

    useEffect(() => {
        if(showToast){
            toast.show({
                placement:'top',
                render:({id}) =>(
                    <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status='error' variant='solid' backgroundColor={Colors.pink} zIndex={10}>
                        <VStack space={1} flexShrink={1} w="100%" >
                            <HStack flexShrink={1} alignItems="center" justifyContent="space-between" >
                                <HStack space={2} flexShrink={1} alignItems="center">
                                    <Alert.Icon/>
                                    <Text style={{color: Colors.white, fontSize: getFontSize(15)}}>El correo no está verificado, realiza la acción en perfil para poder continuar</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                )
            })
            setTimeout(() => {
                setShowToast(false)
            },500)
        }
    },[showToast])

    
    const  onStart = (event) => {
    console.log('event',event)
        event.y = translateY.value;
    };
    const onActive = (event, ctx) => {
        //console.log('update',event, ctx)
        if(event.translationY > 0) translateY.value = event.translationY;
    }
    const onEnd = event => {
        console.log('end',event)
        if (event.translationY > 0) {
            runOnJS(setVisible)();
            setTimeout(() => {
                translateY.value= 0
            },1000)
        }
    }
    
     
    const animatedStyle = useAnimatedStyle(() => {
        return {
        transform: [
            {
                translateY: translateY.value,
            },
        ],
        };
    });

    const validateCar = () => {
        if(isVerifyMail){
            onSubmit()
        }else{
            setShowToast(true)
        }
    }

    return(
        <Modal isOpen={visible} animationPreset='slide' transparent>
            <View style={styles.container}>
                <GestureHandlerRootView>
                    <GestureDetector gesture={pan.onStart((event) => onStart(event)).onUpdate((event,ctx) => onActive(event,ctx)).onEnd((event) => onEnd(event))}>
                        <Animated.View style={[styles.card, animatedStyle]}>
                            {shoppingCart.length > 0 ? (
                                <>
                                <ScrollView 
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow:1, paddingBottom: 10}}
                                    style={styles.contentItems}>
                                    {shoppingCart?.map((item,index) => <ShoppingItem item={item} index={index} />)}
                                </ScrollView>
                                <View style={styles.contInfo}>
                                    <Text style={{flex:1, alignSelf:'flex-start', paddingTop:15}}>Enviar a:</Text>
                                    <View style={styles.contDelivery}>
                                        <View style={styles.input}>
                                            <Select
                                                value={''}
                                                //onValueChange={(value) => dispatch(onChangeInputProf({prop:'gender', value}))}
                                                borderWidth={0}
                                                placeholder="Sucursal"
                                                style={{}}>
                                                    {branches.map(item => (
                                                        <Select.Item value={item.id.toString()} label={item.label}/>

                                                    ))}
                                                </Select>

                                        </View>
                                        <Text style={styles.lblDelivery}>Fecha estimada de entrega : <Text style={{fontWeight:'700'}}>14 sept 2023</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.contTotal}>
                                    <Text>Total:</Text>
                                    <Text style={styles.lblPoints}>{total.toString()}pts</Text>
                                </View>
                                <TouchableOpacity style={styles.btn} onPress={() => validateCar()}>
                                    <Text style={styles.lblBtn}>Realizar pedido</Text>
                                </TouchableOpacity>
                                </>

                            ):(
                                <View>
                                    <Text>No hay articulos en el carrito de canjes</Text>
                                </View>
                            )}
                        </Animated.View>
                    </GestureDetector>
                </GestureHandlerRootView>
            </View>
        </Modal>
    )
} 

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        flex:1, 
        justifyContent:'flex-end',
        alignItems:'center'
    },
    card:{
        width: width,
        maxHeight: height-100,
        //height: height/4,
        backgroundColor: Colors.white,
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        //justifyContent:'flex-end',
        //alignItems:'center',
        paddingVertical:20,
        paddingHorizontal:20
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
        alignItems:'center'
    },
    txtBtn:{
        fontSize: getFontSize(16), 
        fontWeight:'700', 
        color:Colors.white
    },
    input:{
        backgroundColor: Colors.white,
        width:width/1.6, 
        height: 44,  
        borderRadius:8, 
        //padding:7,
        borderColor:Colors.gray,
        borderWidth:1,
        justifyContent:'center',
        marginBottom: 7
    },
    contentItems:{
        padding:12, 
        borderBottomWidth:0.5, 
        borderBottomColor: Colors.grayStrong, 
        marginBottom:16,
    },
    contInfo:{
        flexDirection:'row', 
        alignItems:'center', 
        marginBottom:16
    },
    contDelivery:{
        flex:3, 
        borderBottomWidth:0.5, 
        borderBottomColor: Colors.grayStrong, 
        paddingBottom:16
    },
    lblDelivery:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(12), 
        fontWeight:'400'
    },
    contTotal:{
        flexDirection:'row', 
        alignItems:'center', 
        marginBottom:30
    },
    lblPoints:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(22), 
        fontWeight:'700', 
        paddingLeft:15
    },
    btn:{
        width: width/1.3, 
        height:50, 
        marginHorizontal:20, 
        backgroundColor: Colors.blueGreen, 
        alignSelf:'center', 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    }

})

export default ModalShoppingCart;