import React,{useState, useEffect, useRef} from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";

const SurveyContent = ({children, scrollViewRef}) => {
    return(
        <View style={{flex:1}}>

        <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps='handled'
            contentInsetAdjustmentBehavior='scrollableAxes'
            nestedScrollEnabled={true}
            overScrollMode='always'
            //automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom:20
                
            }}>
                <View style={{marginBottom:20}}>
                    {children}
                </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SurveyContent