import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, Linking } from "react-native";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { useNavigation } from "@react-navigation/native";
import { getAdvertisementId } from "../../../utils/services/ApiApp";

const {height, width} = Dimensions.get('window');

const AnnouncementDetail = ({route}) => {
    const navigation = useNavigation()

    const { itemId } = route.params;
    const [data, setData] = useState(null)
    const [title, setTitle] = useState("")

    useEffect(() => {
        if (itemId){
            getData()
        }
    },[itemId])

    const getData = async()=>{
        let result = await getAdvertisementId(itemId)
        if (result.status == 200){
            setData(result.data)
            if (result?.data?.type && result.data.type == 2){
                setTitle("Promoción")
            }else{
                setTitle("Anuncio")
            }
        }
        // {"id": 2, "image": "", "image_partner_thumbnail": "", "image_thumbnail": "", "is_active": true, "link": "https://www.netflix.com/mx/", "long_description": "NETLFIX PASE GRATISNETLFIX PASE GRATISNETLFIX PASE GRATISNETLFIX PASE GRATIS", "partner": null, "short_description": "NETLFIX PASE GRATIS", "title": "Netlfix", "type": 1}
    }

    return(
        <HeaderLogged 
            title={title} 
            isBack={true}
            noPadding={true}
            goBack={() => {
                navigation.goBack()
            }}>
            {
                data ? <View>
                    {data.image && <View style={styles.contHeader}>
                        <Image source={{
                            uri: data.image}}
                            style={{resizeMode:'contain', width: width-32, height: (width-32)*0.5
                            }}
                        />
                    </View>}
                    <View style={styles.contText}>
                        <Text style={[styles.lbl,styles.lblTitle]}>{data.title}</Text>
                    </View>
                    <View style={styles.contText}>
                        <Text style={styles.lblDesc}>{data.long_description}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.btnOk} 
                        onPress={() =>{
                            Linking.openURL(data.link);
                        }}>
                        <Text style={styles.lblBtn}>Conoce más</Text>
                    </TouchableOpacity>
                </View>: null
            }
            
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    contHeader:{
        flexDirection:'row',
        justifyContent:'space-between', 
        marginHorizontal:16,
        alignItems:'center',
        marginBottom:8,
        marginTop: 16
    },
    lbl:{
        color: Colors.blueGreen, 
        fontWeight:'700'
    },
    contText:{
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
    lblDesc:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    },
    btnOk:{
        height: 48,
        justifyContent:'center', 
        alignItems:'center', 
        marginHorizontal: 16,
        borderRadius:8,
        borderWidth: 1,
        borderColor: 'black'
    },
    lblBtn:{
        fontSize: getFontSize(16),
        fontWeight:'400',
        textAlign: 'center'
    }
})
export default AnnouncementDetail