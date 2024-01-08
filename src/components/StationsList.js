import React,{useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import StationItem from "./StationITem";


const StationList = ({stations, isLocation=false, changeRegion, openMaps}) => {
    return(
        <View style={{alignItems:'center'}}>
            {stations?.map((item,index) => (
                <StationItem 
                    station={item} 
                    index={index} 
                    isLocation={isLocation}
                    changeRegion={changeRegion}
                    openMaps={openMaps}
                />
            ))}
        </View>
    )
}

export default StationList;