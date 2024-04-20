import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateAction } from "../../store/ducks/invoicingDuck";

const {height, width} = Dimensions.get('window');

const ListRfcItem = ({item, index, onDelete, setDefault, showCheck=false, selectRfc, setSelectRfc}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return(
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => {
                if(showCheck){
                    setSelectRfc(index)
                }else{
                    dispatch(updateAction(item))
                    navigation.navigate('RegisterRfc',{isEdit:true, id: item?.id})

                }
            }}
            onLongPress={() => onDelete(item)}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
                <View style={{justifyContent:'space-between',}}>
                    <Text>{item?.rfc}</Text>
                    <Text>{item?.name}</Text>
                </View>
                {!showCheck ? (
                    <TouchableOpacity style={{zIndex: 10}} onPress={() => setDefault(item)}>
                        <AntDesign  
                            name={item?.is_default ? 'star' : 'staro'} 
                            size={30} 
                            color={item?.is_default ? Colors.yellow : Colors.grayStrong} 
                        />
                    </TouchableOpacity>
                ):(
                    <View style={[styles.check,{borderColor: selectRfc === index ? Colors.blueGreen : Colors.grayStrong,}]}>
                        <View style={[styles.mark,{ backgroundColor: selectRfc === index ?  Colors.blueGreen : Colors.white}]}/>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        flex:1,
        //width: width * .9,
        height: 80,
        borderWidth: 0.5,
        borderColor: Colors.grayBorders,
        borderRadius:8,
        padding:12,
        marginBottom:10,        
    },
    check:{
        width:25, 
        height:25, 
        borderRadius:12.5, 
        borderWidth:2, 
        marginRight:5,
        justifyContent:'center',
        alignItems:'center'
    },
    mark:{
        width: 15, 
        height:15, 
        borderRadius: 7.5,
    }
})

export default ListRfcItem;