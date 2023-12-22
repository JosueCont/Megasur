import React, {useState, useEffect, useSyncExternalStore} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Animated,{useSharedValue, useAnimatedStyle, withSpring, useAnimatedRef, runOnUI, measure, interpolate, Extrapolate, withTiming, } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { onChangeModalProf } from "../../store/ducks/profileDuck";


const {height, width} = Dimensions.get('window');

const AccordionItem = ({item,index,}) => {
    const dispatch = useDispatch();
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
            height: withTiming(animationHeight, {duration:500}),
            opacity: withTiming(isExpanded.value ? 1 : 0,{duration:500})
        }
    })
    return(
        <Animated.View key={index} style={[ styles.item]}>
            <TouchableOpacity 
                onPress={() => {
                    if(index === 9){
                        dispatch(onChangeModalProf({prop:'modalActive', value: true}))
                    }else if(index === 7) dispatch(onChangeModalProf({prop:'modalDelete',value:true}))
                    else if(index === 4){
                        dispatch(onChangeModalProf({prop:'modalTerms', value: true}))
                    }else{
                        
                        if(heightValue.value === 0){
                            runOnUI(() => {
                                'worklet';
                                heightValue.value = measure(listRef).height
                            })()
                        }
                        isExpanded.value = !isExpanded.value

                    }
                }} 
                style={styles.btn}>
                <Text style={styles.lbl}>{item.title}</Text>
                <Animated.View style={rotateRow}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.blueGreen} />            

                </Animated.View>
            </TouchableOpacity>
            <Animated.View style={heightExpanded}>
                <Animated.View ref={listRef} style={[{position:'absolute', top:0,}]}>{item?.component}</Animated.View>

            </Animated.View>
        </Animated.View>
        
    )
}

const styles = StyleSheet.create({
    item:{
        //flex:1, 
        borderBottomWidth:0.5, 
        borderTopWidth:0.5, 
        borderColor:Colors.grayStrong, 
        paddingVertical:16, 
        //flexDirection:'row', 
        justifyContent:'space-between'
    },
    btn:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    lbl:{
        color: Colors.darkGray, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    }

})

export default AccordionItem;