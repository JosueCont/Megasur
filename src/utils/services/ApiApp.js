import { axiosTypes } from "./AxiosTypes";
import { axiosGet, axiosPost, axiosPut } from "./AxiosConfig";

//Login

export const postVerifyPhone = async(data) => await axiosPost(axiosTypes.VERIFY_PHONE, data);
export const postValidateCode = async(data) => await axiosPost(axiosTypes.VALIDATE_CODE, data)
export const postRegisterUser = async(data) => await axiosPost(axiosTypes.REGISTER_USER,data);
export const postRefreshToken = async(data) => await axiosPost(axiosTypes.REFRESH_TOKEN,data)

//logged

/*Profileee */
export const getDataUser = async() => await axiosGet(axiosTypes.SECURITY_USER_DATA)
export const postverifyEmail = async(data) => await axiosPost(`${axiosTypes.SECURITY_USER}${data}/verify-email/`)
export const postVerifyCodeMail = async(id,code) => await axiosPost(`${axiosTypes.SECURITY_USER}${id}/confirm-verify-email/${code}/`)
export const putUserData = async(data) => await axiosPut(axiosTypes.SECURITY_USER_DATA, data)
export const postDeleteAccount = async(data) => await axiosPost(axiosTypes.DELETE_ACCOUNT, data)

/*Home */

export const getSiteConfig = async() => await axiosGet(axiosTypes.SITE_CONFIG)
export const getCards = async(userId) => await axiosGet(`${axiosTypes.CARDS}${userId}`)
export const postValidateOTP = async(data) => await axiosPost(axiosTypes.VALIDATE_OTP, data)

//stations
export const getStations = async(lat, long) => await axiosGet(`${axiosTypes.CLOSE_STATIONS}?lat=${lat}&long=${long}`)

//charges
export const getTransactions = async(filters) => await axiosGet(`${axiosTypes.GET_TRANSACTIONS}${filters}`)
export const getInfoBranch = async(id) => await axiosGet(`${axiosTypes.GET_INFO_BRANCH}${id}`)
export const putRateCharge = async(data,id) => await axiosPut(`${axiosTypes.GET_TRANSACTIONS}${id}/`, data)
