import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AccordionQuestionItem from "./AccordionQuestionItem";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";

const AccordionQuestionList = ({data}) => {
    return(
        <View style={styles.container}>
            <Text style={{alignSelf:'center', marginVertical:10, color: Colors.darkGray, fontSize: getFontSize(20), fontWeight:'700'}}>FAQ</Text>
            {data.map((item,index) => <AccordionQuestionItem item={item} index={index}/>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        //elevation:4,
        //shadowColor: '#000', // Color de la sombra
        //shadowOffset: {
        //  width: 0,  
        //  height: 2,
        //},
        //shadowOpacity: 0.25, 
        //shadowRadius: 4, 
    }
})
export default AccordionQuestionList;