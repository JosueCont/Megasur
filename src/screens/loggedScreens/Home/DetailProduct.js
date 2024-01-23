import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList } from "react-native";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { useNavigation, useRoute } from "@react-navigation/native";
import SliderGallery from "../../../components/SliderGalleryCustom";
import { useDispatch, useSelector } from "react-redux";
import { onActionCount, resetCount } from "../../../store/ducks/exchangeDuck";

const {height, width} = Dimensions.get('window');

const DetailProduct = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const dispatch = useDispatch()
    const count = useSelector(state => state.exchangeDuck.countProduct)

    useEffect(() => {
        console.log('route',route)
    },[route])

    const {product} = route?.params;

    return(
        <HeaderLogged 
            title={`Detalle ${product?.name.split(' ')[0]}`} 
            isBack={true} 
            goBack={() => {
                dispatch(resetCount())
                navigation.goBack()
            }}>
            <View style={styles.contHeader}>
                <View style={[styles.contNew,{ backgroundColor: product?.isNewProduct ? Colors.yellowStrong: Colors.lightGray}]}>
                    {product?.isNewProduct && <Text style={[styles.lbl,{ fontSize: getFontSize(25) }]}>Nuevo</Text>}
                </View>
                <Text style={[styles.lbl,{ fontSize: getFontSize(24)}]}>{product.price_in_points}pts</Text>
            </View>
            <View style={styles.contImages}>
                {product?.gallery.length > 0 ? (
                    <SliderGallery 
                        gallery={product?.gallery}
                    />
                ):(
                    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                        <Text>No hay imagenes para mostrar</Text>
                    </View>
                )}
            </View>
            <View style={styles.contAbout}>
                <Text style={[styles.lbl,styles.lblTitle]}>{product?.name}</Text>
                <View style={styles.contCounter}>
                    <TouchableOpacity 
                        disabled={count === 0}
                        onPress={() => dispatch(onActionCount({action:'decrement', count}))}
                        style={styles.btnAction}>
                        <Text style={[styles.lbl,{
                            fontSize: getFontSize(25),
                            color: count === 0 ? Colors.gray : Colors.blueGreen }]}>-</Text>
                    </TouchableOpacity>
                    <Text style={[styles.lbl,{fontSize: getFontSize(13)}]}>{count}</Text>
                    <TouchableOpacity 
                        onPress={() => dispatch(onActionCount({action:'increment', count}))}
                        style={styles.btnAction}>
                        <Text style={[styles.lbl,{ fontSize: getFontSize(25)}]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contDesc}>
                <Text style={styles.lblTitleDesc}>Detalle del producto</Text>
                <Text style={styles.lblDesc}>{product?.description}</Text>
            </View>
            <View style={styles.contDesc}>
                <Text style={styles.lblTitleDesc}>Restricciones</Text>
                <Text style={styles.lblDesc}>Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed.
Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed.</Text>
            </View>
            <TouchableOpacity 
                disabled={count === 0}
                style={[styles.btnOk,{backgroundColor: count === 0 ? Colors.grayStrong : Colors.blueGreen,}]} onPress={() => navigation.navigate('Confirm')}>
                <Text style={styles.lblBtn}>Canjear por {product?.price_in_points}ptos. C/U</Text>
            </TouchableOpacity>
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    contHeader:{
        flexDirection:'row',
        justifyContent:'space-between', 
        marginHorizontal:16, 
        alignItems:'center',
        marginBottom:8
    },
    contNew:{
        width: 109, 
        height:42, 
        justifyContent:'center', 
        alignItems:'center',
        borderRadius:11, 
    },
    lbl:{
        color: Colors.blueGreen, 
        fontWeight:'700'
    },
    contImages:{
        width: width, 
        height: 230, 
        backgroundColor:Colors.lightGray, 
        marginBottom:10
    },
    contAbout:{
        flexDirection:'row', 
        justifyContent:'center', 
        marginHorizontal:16, 
        marginBottom:30
    },
    lblTitle:{
        flex:2, 
        fontSize: getFontSize(24), 
        marginRight:6
    },
    contCounter:{
        flex:1, 
        flexDirection:'row', 
        height:48, 
        alignItems:'center', 
        borderColor: Colors.green, 
        borderWidth:1.5, 
        borderRadius:8, 
        justifyContent:'space-between', 
        paddingHorizontal:5
    },
    btnAction:{
        width:30, 
        alignItems:'center'
    },
    contDesc:{
        marginHorizontal:16, 
        marginBottom:12
    },
    lblTitleDesc:{
        color:'black', 
        fontSize: getFontSize(18), 
        fontWeight:'500', 
        marginBottom:10
    },
    lblDesc:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(11), 
        fontWeight:'400'
    },
    btnOk:{
        marginHorizontal:16, 
        flex:1,  
        paddingVertical:10, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:8,
        marginTop:20
    },
    lblBtn:{
        color: Colors.white,
        fontSize: getFontSize(16),
        fontWeight:'400'
    }
})
export default DetailProduct