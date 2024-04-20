import React, {useState, useEffect, useCallback} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Animated,{useSharedValue, useAnimatedStyle, withSpring, useAnimatedRef, runOnUI, measure, interpolate, Extrapolate, withTiming, } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { onChangeModalProf } from "../../store/ducks/profileDuck";
import { useIsFocused } from "@react-navigation/native";
import StationList from "../StationsList";


const {height, width} = Dimensions.get('window');

const AccordionItem = ({item,index,isLocation, onChangeRegion,onOpenMaps, disabled}) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused()
    const isExpanded = useSharedValue(false)
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0)

    
    useEffect(() => {
        let timeoutId;
        if(isLocation && index === 0 && listRef.current){
            console.log('se vuelve a correr', heightValue.value)
            timeoutId = setTimeout(() => {
                if(heightValue.value === 0){
                    runOnUI(runOnUIThread)()
                    //isExpanded.value = true
                }
            },200)
            
        }
        return () => {
            // Limpiar el timeout si el componente se desmonta antes de que se ejecute
            clearTimeout(timeoutId);
        };
    },[isFocused])
    
    const runOnUIThread = useCallback(() => {
        'worklet';
            const measuredHeight = measure(listRef)?.height;
            if(measuredHeight != undefined && measuredHeight != null){
                heightValue.value = measuredHeight
                isExpanded.value = true;
            }
    })

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
            height: withTiming(animationHeight, {duration:500}) ,
            opacity: withTiming(isExpanded.value ? 1 : 0,{duration:500})
        }
    })
    return(
        <Animated.View key={index.toString()} style={[ isLocation ? styles.itemLocation : styles.item]}>
            <TouchableOpacity 
                onPress={() => {
                    if(index === 9 && !isLocation){
                        dispatch(onChangeModalProf({prop:'modalActive', value: true}))
                    }else if(index === 7 && !isLocation) dispatch(onChangeModalProf({prop:'modalDelete',value:true}))
                    else if(index === 4 && !isLocation){
                        dispatch(onChangeModalProf({prop:'modalTerms', value: true}))
                    }else{
                        
                        if(heightValue.value === 0){
                            runOnUI(runOnUIThread)()
                        }
                        isExpanded.value = !isExpanded.value

                    }
                }} 
                style={styles.btn}>
                <Text style={isLocation ? styles.lblLocation : styles.lbl}>{item.title}</Text>
                <Animated.View style={rotateRow}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.blueGreen} />            

                </Animated.View>
            </TouchableOpacity>
            {item?.stations.length > 0 && <Animated.View style={heightExpanded}>
                <Animated.View ref={listRef} style={[{position:'absolute', top:0,}]}>
                    <StationList 
                        stations={item?.stations} 
                        isLocation={true} 
                        changeRegion={onChangeRegion}
                        openMaps={onOpenMaps}
                        disabled={disabled}
                    />
                </Animated.View>

            </Animated.View>}
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
    itemLocation:{
        paddingVertical:16, 
        paddingHorizontal:10,
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
    },
    lblLocation:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(20), 
        fontWeight:'700'
    }

})

export default AccordionItem;