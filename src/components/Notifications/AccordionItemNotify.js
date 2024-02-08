import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import Animated,{useSharedValue, useAnimatedStyle, withSpring, useAnimatedRef, runOnUI, measure, interpolate, Extrapolate, withTiming, runOnJS } from "react-native-reanimated";
import moment from "moment";
import { Gesture, GestureHandlerRootView, GestureDetector } from "react-native-gesture-handler";


const {height, width} = Dimensions.get('window');


const AccordionNotifications = ({item, index, onDeleted}) => {
    const dispatch = useDispatch();
    const isExpanded = useSharedValue(false)
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0)
    const pan = Gesture.Pan()
    const swipeRight = useSharedValue(0)
    const isSwipped = useSharedValue(0)
    const opacity = useSharedValue(1);
    const isDeleted = useSharedValue(false)


    const TRANSLATE_X_THRESHOLD = -width * 0.3;


    const rotateRow =useAnimatedStyle(() => {
        return{
            transform:[
                {rotate: withSpring(isExpanded.value ? '90deg' : '0deg')}
            ]
        }
    })

    const heightExpanded = useAnimatedStyle(() => {
        const inputRange = [0,1]
        const output = [0, heightValue.value]
        const animationHeight = interpolate(
            isExpanded.value,
            inputRange,
            output,
            Extrapolate.CLAMP
        )
        return{
            height: withTiming(animationHeight, {duration:200}),
            opacity: withTiming(isExpanded.value ? 1 : 0,{duration:200})
        }
    })

    const startGesture = (e) => {
        e.translationX = swipeRight.value
    }
    
    const updateGesture = (e) => {
        if(e.translationX < 0) {
            swipeRight.value =  e.translationX
            isSwipped.value = Math.abs(e.translationX)
        }
    }

    const endGesture = (e) => {
        const shouldBeDismissed = swipeRight.value < TRANSLATE_X_THRESHOLD;
        if(shouldBeDismissed){
            swipeRight.value = withSpring(-width)
            isSwipped.value = withSpring(width*0.84)
            opacity.value = withTiming(0, {duration:500}, (isFinished) => {
                if (isFinished ) {
                    isSwipped.value = withTiming(0,{duration:500})
                    swipeRight.value = withTiming(0,{duration:500})
                    runOnJS(onDeleted)(item);
                    
                }
            });

        }else{
            isDeleted.value = false
            swipeRight.value = withSpring(0)
        }
    }

    const styleSwipe = useAnimatedStyle(() => {
        const inputRange = [0,-50,-100,-200]
        const opacityOutputRange = [1,0.8,1,0,]
        const opacityAnimate = interpolate(
            swipeRight.value,
            inputRange,
            opacityOutputRange,
            Extrapolate.CLAMP
        );

        return{
            transform:[
                {translateX: swipeRight.value}
            ],
            //opacity: isSwipped.value === width*0.84 ? 0 : 1
        }
    })

    const iconStyle = useAnimatedStyle(() => {
        return{
            width: isSwipped.value,//width * 0.84,
            opacity: withTiming(
                swipeRight.value < TRANSLATE_X_THRESHOLD +70? 1 : 0
            )
        }
    })

    const opacityLabel = useAnimatedStyle(() => {
        return{
            opacity: isDeleted.value ? 0 : 1
        }
    })
    return(
        <View>

            <GestureHandlerRootView>
                <GestureDetector gesture={pan.onStart((event) => startGesture(event)).onUpdate((event) => updateGesture(event)).onEnd((event) => endGesture(event))}>
                    <Animated.View key={index} style={[styles.item, styleSwipe]}>
                        <TouchableOpacity 
                            style={styles.btn}
                            onPress={() => {
                                if(heightValue.value === 0){
                                    runOnUI(() => {
                                        'worklet';
                                        heightValue.value = measure(listRef).height
                                    })()
                                }
                                isExpanded.value = !isExpanded.value
                            }}>
                            <Text style={[styles.lbl,{width: width/1.9, fontWeight:'700'}]} numberOfLines={1}>{item.title}</Text>
                            <Text>{moment(item.date,'DD/MM/YYYY').format('DD/MM/YYYY')}</Text>
                            <Animated.View style={rotateRow}>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.blueGreen} />            
                            </Animated.View>
                        </TouchableOpacity>
                        <Animated.View style={[heightExpanded,{ marginLeft:20}]}>
                            <Animated.Text ref={listRef} style={[styles.lblDesc]}>{item?.description}</Animated.Text>

                        </Animated.View>
                    </Animated.View>

                </GestureDetector>

            </GestureHandlerRootView>
            <Animated.View style={[styles.contIcon, iconStyle]}>
                <AntDesign name="delete" size={24} color={Colors.white} />
                {/*<Animated.Text style={[styles.lblDele, opacityLabel]}>Eliminar mensaje</Animated.Text>*/}
            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        //flex:1, 
        borderBottomWidth:0.5, 
        borderTopWidth:0.5, 
        borderColor:Colors.grayBorders, 
        paddingVertical:10, 
        //flexDirection:'row', 
        justifyContent:'space-between',
    },
    btn:{
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:10,
        marginBottom:10
    },
    lbl:{
        color: Colors.darkGray, 
        fontSize: getFontSize(14), 
        fontWeight:'400'
    },
    lblDesc:{
        position:'absolute', 
        top:0, 
        color: Colors.grayStrong,
        fontSize: getFontSize(13),
        fontWeight:'400',
        width: width/1.4,
    },
    contIcon:{
        flexDirection:'row',
        position:'absolute', 
        right: 20, 
        top:5, 
        backgroundColor: Colors.pink, 
        paddingVertical:10,
        borderRadius:8,
        alignItems:'center'
    },
    lblDele:{
        color: Colors.white, fontSize: getFontSize(13), fontWeight:'600'
    }
})

export default AccordionNotifications;