import { PixelRatio } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size/fontScale;