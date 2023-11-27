import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Pressable, Platform } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Input from "../CustomInput";
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from "moment";

const {height, width} = Dimensions.get('window');

const BirthdayComponent = () => {
    const [date, setDate] = useState(new Date());
    const [birthdayDate, setBirthdayDate] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onShowDatepicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleDateChange = ({type}, selectedDate) => {
        console.log('event',type)
        if(type === 'set'){
            const currentDate = selectedDate || date;
            setDate(currentDate);
            if(Platform.OS === 'android'){
                setBirthdayDate(moment(currentDate.toDateString()).format('DD/MM/YYYY'))
                setShowDatePicker(false)
            }
            //setShowDatePicker(false);

        }else{
            console.log('entro aqui')
        }
    };

    const confirmIOSDate = () => {
        setBirthdayDate(moment(date.toDateString()).format('DD/MM/YYYY'))
        onShowDatepicker()
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>¿Cuándo podemos celebrar tu cumpleaños?</Text>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                />
            )}
            {showDatePicker && Platform.OS === 'ios' && (
                <View style={{flexDirection:'row',justifyContent:'space-between', width: width/2}}>
                    <TouchableOpacity onPress={onShowDatepicker}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={confirmIOSDate}>
                        <Text>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!showDatePicker && (
                <Pressable onPress={onShowDatepicker}>
                    <Input 
                        placeholder='DD/MM/YYYY' 
                        editable={false} 
                        onPressIn={onShowDatepicker}
                        style={{width:150, height:44, backgroundColor:'white', justifyContent:'center',alignItems:'center', paddingLeft:30}}
                        value={birthdayDate}
                        //onChange={(val) => se}    
                    />

                </Pressable>)}
            {/*<TouchableOpacity onPress={onShowDatepicker} style={{width: width/2, height:44, backgroundColor: Colors.white, justifyContent:'center', alignItems:'center', borderRadius:8}}>
             && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                />
            )
                <Text style={{color: Colors.gray, fontSize: getFontSize(16), fontWeight:'400'}}>{showDatePicker ? date ? moment(date).format('DD/MM/YYYY') : '' : 'DD / MM / YYYY'}</Text>
            </TouchableOpacity>*/}
            <View style={{ width: width/1.4}}>
                <Text style={styles.legend}>Tu cumpleaños es especial, y queremos hacerlo aún mejor.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    title:{
        fontSize: getFontSize(24),
        fontWeight:'400',
        color: Colors.darkGray,
        textAlign:'center',
        marginBottom:60
    },
    legend:{
        fontSize: getFontSize(14),
        fontWeight:'400',
        textAlign:'center',
        marginTop:50
    }
})
export default BirthdayComponent;