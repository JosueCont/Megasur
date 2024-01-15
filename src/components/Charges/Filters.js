import React,{useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Select } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { changeInputCharges, refreshFilters } from "../../store/ducks/chargesDuck";
const {height, width} = Dimensions.get('window');


const Filters = ({onFilter}) => {
    const dispatch = useDispatch();
    const [showFilters, setShowFilters] = useState(false)
    const branchesOptions = useSelector(state => state.chargesDuck.branches)
    const typeFuel = useSelector(state => state.chargesDuck.typeFuel)
    const branchName = useSelector(state => state.chargesDuck.branchName)


    return(
        <View style={{marginBottom:16}}>
            {!showFilters ? (
                <TouchableOpacity style={styles.btnFilter} onPress={() => setShowFilters(!showFilters)}>
                    <Text style={styles.lblFilter}>Filtros</Text>
                    <Feather name="sliders" size={18} color={Colors.white} />
                </TouchableOpacity>
            ):(
                <View style={{flexDirection:'row', alignSelf:'flex-end', }}>
                    <TouchableOpacity 
                        onPress={() => dispatch(refreshFilters())}
                        style={{borderRadius:9, padding:6, backgroundColor: Colors.blueGreen, marginRight:5}}>
                        <FontAwesome name="refresh" size={18} color={Colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setShowFilters(false)}
                        style={{borderRadius:9, padding:6, backgroundColor: Colors.blueGreen}}>
                        <MaterialCommunityIcons name="filter-off" size={18} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            )}

            {showFilters && (
            <View style={{}}>
                <Text style={styles.lbl}>Sucursales</Text>
                <View style={styles.input}>
                    <Select
                        selectedValue={branchName}
                        onValueChange={(value) => dispatch(changeInputCharges({prop:'branchName', value}))}
                        borderWidth={0}
                        placeholder="Sucursal"
                        style={{}}>
                            {branchesOptions.map((branch, index) => (
                                <Select.Item key={index} value={branch.value.toString()} label={branch.label}/>
                            ))}
                            
                        </Select>

                </View>
                <Text style={styles.lbl}>Tipo de combustible</Text>
                <View style={[styles.input,{ width: width/2.5}]}>
                    <Select
                        selectedValue={typeFuel}
                        onValueChange={(value) => dispatch(changeInputCharges({prop:'typeFuel', value}))}
                        borderWidth={0}
                        placeholder="Tipo"
                        style={{}}>
                            <Select.Item value="MAGNA" label="Magna"/>
                            <Select.Item value="PREMIUM" label="Premium"/>
                            <Select.Item value="DIESEL" label="Diesel"/> 
                        </Select>

                </View>
                
                <View>

                </View>
                <TouchableOpacity 
                    onPress={onFilter}
                    style={styles.btn}>
                    <Text style={styles.lblFilter}>Filtrar</Text>
                </TouchableOpacity>
            </View>)}

        </View>
    )
}

const styles = StyleSheet.create({
    btnFilter:{
        height:36, 
        width:120, 
        flexDirection:'row', 
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor: Colors.blueGreen, 
        alignSelf:'flex-end',  
        borderRadius:9
    },
    lblFilter:{
        color: Colors.white, 
        fontSize: getFontSize(14), 
        fontWeight:'600'
    },
    input:{
        backgroundColor: Colors.white,
        width:width/1.05, 
        height: 44,  
        borderRadius:8, 
        //padding:7,
        borderColor:Colors.gray,
        borderWidth:1,
        justifyContent:'center'
    },
    lbl:{
        fontSize:getFontSize(14), 
        color: Colors.grayStrong, 
        fontWeight:'400', 
        marginBottom:4,
        alignSelf:'flex-start',
        marginLeft:2,
        marginTop:8,
    },
    btn:{
        flex:1,
        backgroundColor: Colors.blueGreen, 
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:15, 
        paddingVertical:10, 
        borderRadius:8
    }
})

export default Filters;