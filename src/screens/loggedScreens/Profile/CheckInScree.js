import React,{useEffect, useState,} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, Dimensions  } from "react-native";
import { Skeleton } from "native-base";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ListRfcItem from "../../../components/Invoicing/ListRfcItem";
import EmptyList from "../../../components/Exchanges/EmptyList";
import { changeVariable, cleanValues, getListUserRfc, onDeleteRfc, updataRfc, updateAutoInvoicing } from "../../../store/ducks/invoicingDuck";
import ModalDeleteItem from "../../../components/modals/ModalDeleteItem";
import { getProfileData } from "../../../store/ducks/profileDuck";
import ModalAlertFailed from "../../../components/modals/ModalAlertFail";
import ModalAlertSuccess from "../../../components/modals/AlertModalSucces";

const {height, width} = Dimensions.get('window');

const CheckInScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const listRfc = useSelector(state => state.invoicingDuck.listRfc)
    const modalDelete = useSelector(state => state.invoicingDuck.modalDelete)
    const isFinish = useSelector(state => state.invoicingDuck.isFinishAction)
    const loading = useSelector(state => state.invoicingDuck.loading)
    const dataUser = useSelector(state => state.profileDuck.dataUser)
    const auto_invoicing = useSelector(state => state.invoicingDuck.auto_invoicing)
    const disabled = useSelector(state => state.invoicingDuck.disableAutoInvoicing)
    const modalSuccess = useSelector(state => state.invoicingDuck.modalSucces)
    const modalFailed = useSelector(state => state.invoicingDuck.modalFailed)
    const message = useSelector(state => state.invoicingDuck.message)

    const [itemDelete, setItemDelete] = useState(null)
    const [firstRender, setFirstRender] = useState(true)

    useEffect(() => {
        (async() => {
            await dispatch(getListUserRfc(dataUser?.auto_invoicing))
        })()
    },[isFocused, isFinish])

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
            return;
        }else{
            console.log('cargando invoicing')
            dispatch(getProfileData())
        }
    },[auto_invoicing])
    

    return(
        <HeaderLogged
            title="Facturación"
            isBack={true}
            goBack={() => navigation.goBack()}>
                <View style={styles.container}>
                    <View style={styles.contSwitch}>
                        <Text style={styles.lblSwitch}>Auto Facturación</Text>
                        <Switch 
                            trackColor={{true: Colors.green, false: Colors.gray}}
                            thumbColor={auto_invoicing ? Colors.greenStrong : Colors.gray}
                            disabled={disabled}
                            style={{ transform:[{ scaleX: .7 }, { scaleY: .7 }], }}
                            value={auto_invoicing}
                            onValueChange={(val) => dispatch(updateAutoInvoicing(val))}
                        />
                    </View>
                    <TouchableOpacity 
                        onPress={() => {
                            dispatch(cleanValues())
                            navigation.navigate('RegisterRfc',{isEdit: false})
                        }}
                        style={styles.btnAdd}>
                        <Text style={{color: Colors.white, fontSize: getFontSize(15), fontWeight:'700'}}>+</Text>
                    </TouchableOpacity>
                    <View>
                        {loading ? (
                            <View>
                                {Array.from({length:3}).map((_,index) => (
                                    <Skeleton key={index} lines={1} borderRadius={20} height={height/7} mb={2} backgroundColor={'gray.100'}/>
                                ))}
                            </View>
                        ) :listRfc.length > 0 ? listRfc?.map((item, index) => (

                            <ListRfcItem 
                                item={item} 
                                index={index}
                                onDelete={(item) => {
                                    setItemDelete(item)
                                    dispatch(changeVariable({prop:'modalDelete', value: true}))
                                }}
                                setDefault={(item) => {
                                    delete item?.created_at
                                    item.is_default = !item?.is_default
                                    dispatch(updataRfc(item?.id, item))
                                }}
                            />
                        ))
                        :(
                            <EmptyList message='No has registrado rfc'/>
                        )}
                    </View>

                    <ModalDeleteItem 
                        visible={modalDelete}
                        setVisible={() => dispatch(changeVariable({prop:'modalDelete', value: false}))}
                        message={`¿Esta seguro de elimiar el RFC ${itemDelete?.rfc}?`}
                        onSubmit={() => dispatch(onDeleteRfc(itemDelete?.id))}
                    />
                    <ModalAlertFailed 
                        visible={modalFailed}
                        message={message}
                        setVisible={() => {
                            dispatch(changeVariable({prop:'isFinishAction', value:!isFinish}))
                            dispatch(changeVariable({prop:'modalFailed', value: false}))
                        }}
                        titleBtn="Aceptar"
                    />
                    <ModalAlertSuccess 
                        visible={modalSuccess}
                        message='Se ha cambiado el estado del rfc'
                        setVisible={() => {
                            dispatch(changeVariable({prop:'isFinishAction', value:!isFinish}))
                            dispatch(changeVariable({prop:'modalSucces', value: false}))
                        }}
                        
                    />
                </View>
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10
    },
    contSwitch:{
        alignItems:'center', 
        flexDirection:'row', 
        justifyContent:'flex-end',
        marginBottom:20
    },
    lblSwitch:{
        color: Colors.grayStrong,
        fontSize: getFontSize(13),
        fontWeight:'500'
    },
    btnAdd:{
        justifyContent:'center', 
        alignItems:'center', 
        height:30, 
        width:30, 
        backgroundColor: Colors.blueGreen, 
        alignSelf:'flex-end', 
        borderRadius:5, 
        marginRight:10,
        marginBottom:20
    }
})

export default CheckInScreen;