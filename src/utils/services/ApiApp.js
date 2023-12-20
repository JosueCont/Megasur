import { axiosTypes } from "./AxiosTypes";
import { axiosGet, axiosPost } from "./AxiosConfig";

//Login

export const postVerifyPhone = async(data) => await axiosPost(axiosTypes.VERIFY_PHONE, data);
export const postValidateCode = async(data) => await axiosPost(axiosTypes.VALIDATE_CODE, data)
export const postRegisterUser = async(data) => await axiosPost(axiosTypes.REGISTER_USER,data);

//logged

export const getDataUser = async(id) => await axiosGet(axiosTypes.SECURITY_USER)
