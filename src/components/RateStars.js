import React,{useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Colors } from '../utils/Colors';
import { getFontSize } from '../utils/functions';
const {height, width} = Dimensions.get('window');


const RateStars = ({starRating,setStar}) => {
    const animatedButtonScale = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(animatedButtonScale, {
          toValue: 1.5,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        }).start();
      };
    
      const handlePressOut = () => {
        Animated.spring(animatedButtonScale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        }).start();
      };
    
      const animatedScaleStyle = {
        transform: [{ scale: animatedButtonScale }],
      };

    const renderStars = () => {
        let stars=[];
        for(let i=0; i<5; i++){
            stars.push(i)
        }

        return stars.map((star,index) => (
            <TouchableWithoutFeedback 
                key={index}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => setStar(index+1)}>
                    <Animated.View style={animatedScaleStyle}>
                        <AntDesign  
                            name={index < starRating ? "star" : 'staro'} 
                            size={40} 
                            color={index < starRating ? Colors.yellow : Colors.grayStrong} 
                        />
                    </Animated.View>

            </TouchableWithoutFeedback>
        ))
    }
    return(
        <>
            <View style={styles.contStars}>
                {renderStars()}
            </View>
            <View style={styles.contLbl}>
                <Text style={styles.lbl}>Muy mala</Text>
                <Text style={styles.lbl}>Muy buena</Text>
            </View>
        
        </>
    )
}

const styles = StyleSheet.create({
    contStars:{
        flexDirection:'row',
        width: width/1.5,
        alignItems:'center',
        justifyContent:'space-between',
        alignSelf:'center',
        marginBottom:5
    },
    starUnselected:{
        backgroundColor: Colors.white
    },
    contLbl:{
        flexDirection:'row', 
        width: width/1.35, 
        justifyContent:'space-between', 
        alignSelf:'center'
    },
    lbl:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(15)
    }
})

export default RateStars;