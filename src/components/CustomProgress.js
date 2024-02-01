import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";

const {height, width} = Dimensions.get('window');


const Progress = ({ numSteps, currentStep }) => {
  const steps = Array.from({ length: numSteps }, (_, index) => `Paso ${index + 1}`);

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View
          key={index}
          style={[
            styles.stepContainer,
            index < steps.length - 1 && styles.lineContainer,
          ]}
        >
          <FontAwesome
            name={index < currentStep ? "check-circle" : "circle-thin"}
            color={index < currentStep ? Colors.lightGreen : Colors.gray}
            size={15}
            //style={styles.icon}
          />
          {index < steps.length - 1 && (
            <View
              style={index < currentStep - 1 ? styles.line : styles.lineActive}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: width/3
      },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lineContainer: {
      flex: 1,
    },
    line: {
      flex: 1,
      height: 2,
      backgroundColor: Colors.lightGreen,
    },
    lineActive: {
      flex: 1,
      height: 2,
      backgroundColor: Colors.gray,
    },
    icon: {
      marginRight: 2,
    },
});

export default Progress;
