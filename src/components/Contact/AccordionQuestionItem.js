import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Animated,{useSharedValue, useAnimatedStyle, withSpring, useAnimatedRef, runOnUI, measure, interpolate, Extrapolate, withTiming, } from "react-native-reanimated";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";

const {height, width} = Dimensions.get('window');

const AccordionQuestionItem = ({item,index}) => {
    const isExpanded = useSharedValue(false)
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0)

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
    return(
        <Animated.View key={index+1} style={styles.item}>
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
                }}
            >
                <Text style={styles.lbl}>{item.question}</Text>
                <Animated.View style={rotateRow}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.blueGreen} />            

                </Animated.View>

            </TouchableOpacity>

            <Animated.View style={[heightExpanded,]}>
                <Animated.Text ref={listRef} style={[styles.lblDesc]}>{item?.answer}</Animated.Text>

            </Animated.View>
            
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    item:{
        paddingVertical:16, 
        //flexDirection:'row', 
        justifyContent:'space-between',
        backgroundColor: Colors.lightGray,
        marginBottom:15,
        borderRadius:8,
        paddingLeft:8
    },
    btn:{
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
    },
    lbl:{
        color: Colors.blueGreen,
        fontSize: getFontSize(16),
        fontWeight:'400'
    },
    lblDesc:{
        position:'absolute', 
        top:0, 
        color: Colors.grayStrong,
        fontSize: getFontSize(13),
        fontWeight:'400',
        width: width/1.4,
        marginTop:10,
    },
})
export default AccordionQuestionItem;