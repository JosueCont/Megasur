import { axiosTypes } from "./AxiosTypes";
import { axiosGet, axiosPost } from "./AxiosConfig";

//Login

//Verify phone
export const postVerifyPhone = async(data) => await axiosPost(axiosTypes.VERIFY_PHONE, data);
export const postValidateCode = async(data) => await axiosPost(axiosTypes.VALIDATE_CODE, data)