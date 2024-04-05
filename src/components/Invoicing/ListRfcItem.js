import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateAction } from "../../store/ducks/invoicingDuck";

const {height, width} = Dimensions.get('window');

const ListRfcItem = ({item, index, onDelete, setDefault}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return(
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => {
                dispatch(updateAction(item))
                navigation.navigate('RegisterRfc',{isEdit:true, id: item?.id})
            }}
            onLongPress={() => onDelete(item)}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
                <View style={{justifyContent:'space-between',}}>
                    <Text>{item?.rfc}</Text>
                    <Text>{item?.name}</Text>
                </View>
                <TouchableOpacity style={{zIndex: 10}} onPress={() => setDefault(item)}>
                    <AntDesign  
                        name={item?.is_default ? 'star' : 'staro'} 
                        size={30} 
                        color={item?.is_default ? Colors.yellow : Colors.grayStrong} 
                    />
                </TouchableOpacity>
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
    }
})

export default ListRfcItem;