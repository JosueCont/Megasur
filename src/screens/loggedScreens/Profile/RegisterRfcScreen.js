import React,{ useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Select, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import Input from '../../../components/CustomInput'
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { changeVariable, cleanValues, getDataInvoicing, onSaveRFC, updataRfc } from "../../../store/ducks/invoicingDuck";
import ModalAlertFailed from "../../../components/modals/ModalAlertFail";
import ModalAlertSuccess from "../../../components/modals/AlertModalSucces";

const {height, width} = Dimensions.get('window');

const RegisterRfcScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute()

    const listCfdi = useSelector(state => state.invoicingDuck.listCfdi)
    const regimens = useSelector(state => state.invoicingDuck.regimens)
    const tax_regime = useSelector(state => state.invoicingDuck.tax_regime)
    const rfc = useSelector(state => state.invoicingDuck.rfc)
    const cp = useSelector(state => state.invoicingDuck.cp)
    const name = useSelector(state => state.invoicingDuck.name)
    const use = useSelector(state => state.invoicingDuck.use)
    const userId = useSelector(state => state.authDuck.dataUser?.id)
    const loading = useSelector(state => state.invoicingDuck.loadingUpdate)
    const modalSuccess = useSelector(state => state.invoicingDuck.modalSucces)
    const modalFailed = useSelector(state => state.invoicingDuck.modalFailed)
    const message = useSelector(state => state.invoicingDuck.message)

    const [disabled, setDisabled] = useState(false)

    const {isEdit, id} = route?.params;
    //useEffect(() => {
    //    if(!route?.params?.isEdit) dispatch(cleanValues())
    //},[])

    useEffect(() => {
        (async() => {
            await dispatch(getDataInvoicing())
        })()
    },[])

    useEffect(() => {
        if(tax_regime != null && tax_regime != undefined && rfc != '' && cp != '' && name != '' && use != '') setDisabled(false)
        else setDisabled(true)

    },[tax_regime, rfc, cp, name, use])

    const onAction = () => {
        isEdit ? dispatch(updataRfc(id,{tax_regime, rfc, cp, name, use,user_id: userId,is_default:false}))
        : dispatch(onSaveRFC({tax_regime, rfc, cp, name, use,user_id: userId,is_default:false}))
    }

    return(
        <HeaderLogged 
            isBack={true}
            goBack={() => navigation.goBack()}
            title={`${route?.params?.isEdit ? 'Editar' : 'Registrar'} RFC`}>
                <View style={{marginHorizontal:20}}>
                    <Text style={styles.lbl}>Régimen fiscal</Text>
                    <View style={styles.input}>
                        <Select
                            selectedValue={tax_regime}
                            onValueChange={(value) => dispatch(changeVariable({prop:'tax_regime', value}))}
                            borderWidth={0}
                            placeholder="Selecciona regimen"
                            style={{}}>
                                {regimens.map((item,index) => (
                                    <Select.Item value={item.id} label={`(${item?.id}) - ${item?.descripcion}`} key={index}/>

                                ))}
                                
                            </Select>

                    </View>

                    <View style={styles.separator}>
                        <Text style={styles.lbl}>RFC</Text>
                        <Input
                            maxLength={13}
                            isLogged={true} 
                            value={rfc} 
                            setValue={(value) => dispatch(changeVariable({prop:'rfc', value: value.toUpperCase() }))}
                        />

                    </View>
                    
                    <View style={styles.separator}>
                        <Text style={styles.lbl}>Nombre completo</Text>
                        <Input 
                            isLogged={true} 
                            value={name} 
                            setValue={(value) => dispatch(changeVariable({prop:'name', value }))}
                        />

                    </View>

                    <View style={styles.separator}>
                        <Text style={styles.lbl}>Código postal</Text>
                        <Input 
                            maxLength={5}
                            keyboardType='numeric'
                            isLogged={true} 
                            value={cp} 
                            setValue={(value) => dispatch(changeVariable({prop:'cp', value }))}
                        />

                    </View>

                    <Text style={styles.lbl}>Uso CFDI</Text>
                    <View style={styles.input}>
                        <Select
                            selectedValue={use}
                            onValueChange={(value) => dispatch(changeVariable({prop:'use', value}))}
                            borderWidth={0}
                            placeholder="Selecciona uso de cfdi"
                            style={{}}>
                                {listCfdi.map((item,index) => (
                                    <Select.Item value={item.id} label={`${item.id} - ${item?.descripcion}`} key={index}/>

                                ))}
                                
                            </Select>

                    </View>

                    <TouchableOpacity 
                        disabled={disabled}
                        onPress={() => onAction()}
                        style={[styles.btnSave,{backgroundColor: disabled ? Colors.gray : Colors.blueGreen}]}>
                        {loading ? <Spinner size={'sm'} color={Colors.white} /> : <Text style={styles.lblBtn}>Guardar</Text>}
                    </TouchableOpacity>


                    <ModalAlertFailed 
                        visible={modalFailed}
                        message={message}
                        setVisible={() => dispatch(changeVariable({prop:'modalFailed', value: false}))}
                    />
                    
                    <ModalAlertSuccess 
                        visible={modalSuccess}
                        message={message}
                        setVisible={() => {
                            dispatch(changeVariable({prop:'modalSucces', value: false}))
                            navigation.goBack();
                        }}
                    />
                </View>
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    lbl:{
        fontSize:getFontSize(14), 
        color: Colors.grayStrong, 
        fontWeight:'400', 
        marginBottom:4,
        alignSelf:'flex-start',
        marginLeft:5,
        marginTop:8,
    },
    input:{
        backgroundColor: Colors.white,
        width:width * .9, 
        height: 44,  
        borderRadius:8, 
        //padding:7,
        borderColor:Colors.gray,
        borderWidth:1,
        justifyContent:'center',
        marginBottom:5
    },
    separator:{
        marginBottom:5
    },
    btnSave:{
        width: width * .9, 
        paddingVertical:12, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8,
        marginTop:20
    },
    lblBtn:{
        color: Colors.white,
        fontSize: getFontSize(14),
        fontWeight:'400'
    }
})

export default RegisterRfcScreen;