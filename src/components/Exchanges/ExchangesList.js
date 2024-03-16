import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Skeleton } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import ExchangeItem from "./ExchangeItem";
import EmptyList from "./EmptyList";

const {height, width} = Dimensions.get('window');


const ExchangeList = ({data, showTitle=true, showActions=true, onMinus, onPlus, onAddCar}) => {
    const loader = useSelector(state => state.exchangeDuck.loading)

    return(
        <View>
            {showTitle && data.length > 0 && <Text style={styles.title}>Especiales</Text>}
            <View style={styles.container}>
                {loader ? (
                    <View style={{flex:1,flexDirection:'row', justifyContent:'space-between'}}>
                        <Skeleton lines={1} width={'50%'} height={260} mt={4} mr={1} />
                        <Skeleton lines={1} width={'50%'} height={260} mt={4} />

                    </View>
                ) : data.length > 0 ? data.map((item,index) => (
                    <ExchangeItem 
                        index={index}
                        item={item}
                        showActions={showActions}
                        setMinus={(id, action) => onMinus(id, action)}
                        setPlus={(id,action) => onPlus(id,action)}
                        addCarITem={(item, action) => onAddCar(item,action)}
                    />
                )):(
                    <EmptyList message='No se encontraron artículos'/>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        alignSelf:'flex-start', 
        color: Colors.grayStrong, 
        fontSize:getFontSize(18), 
        fontWeight:'700',
        marginBottom:10
    },
    container:{
        flexDirection:'row', 
        flexWrap:'wrap', 
        justifyContent:'space-between'
    }
})

export default ExchangeList;