import { axiosTypes } from "./AxiosTypes";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./AxiosConfig";

//Login

export const postVerifyPhone = async(data) => await axiosPost(axiosTypes.VERIFY_PHONE, data);
export const postValidateCode = async(data) => await axiosPost(axiosTypes.VALIDATE_CODE, data)
export const postRegisterUser = async(data) => await axiosPost(axiosTypes.REGISTER_USER,data);
export const postRefreshToken = async(data) => await axiosPost(axiosTypes.REFRESH_TOKEN, data)
export const postLogout = async(data) => await axiosPost(axiosTypes.LOGOUT, data);

//logged

/*Profileee */
export const getDataUser = async() => await axiosGet(axiosTypes.SECURITY_USER_DATA)
export const postverifyEmail = async(data) => await axiosPost(`${axiosTypes.SECURITY_USER}${data}/verify-email/`)
export const postVerifyCodeMail = async(id,code) => await axiosPost(`${axiosTypes.SECURITY_USER}${id}/confirm-verify-email/${code}/`)
export const putUserData = async(data) => await axiosPut(axiosTypes.SECURITY_USER_DATA, data,{headers: {'Content-Type': 'multipart/form-data',}})
export const postDeleteAccount = async(data) => await axiosPost(axiosTypes.DELETE_ACCOUNT, data)
export const getDataVehicle = async(id) => await axiosGet(`${axiosTypes.SECURITY_USER_VEHICLE}${id}/`)
export const updateDataVehicle = async(id, data) => await axiosPut(`${axiosTypes.SECURITY_USER_VEHICLE}${id}/`, data)

/*Home */

export const getSiteConfig = async() => await axiosGet(axiosTypes.SITE_CONFIG)
export const getCards = async(userId) => await axiosGet(`${axiosTypes.CARDS}${userId}`)
export const postValidateOTP = async(data) => await axiosPost(axiosTypes.VALIDATE_OTP, data)
export const getTotalPoints = async(id) => await axiosGet(`${axiosTypes.GET_POINTS}${id}/`)
export const getPhysicalBanner = async(id) => await axiosGet(`${axiosTypes.SHOW_BANNER}${id}`)
export const putPhysicBanner = async(id) => await axiosPut(`${axiosTypes.SHOW_BANNER}${id}`)

//exchange center
export const getListProducts = async(filters) => await axiosGet(`${axiosTypes.LIST_PRODUCTS}${filters}`)
export const getListCategories = async() => await axiosGet(axiosTypes.LIST_CATEGORIES)
export const getCloseBranches = async(coords) => await axiosGet(`${axiosTypes.CLOSE_BRANCHES}${coords}`)
export const getOrders = async(filters) => await axiosGet(`${axiosTypes.GET_ORDERS}${filters}`) 
export const postOrders = async(data) => await axiosPost(axiosTypes.GET_ORDERS, data)
export const getQrFuel = async(data) => await axiosPost(axiosTypes.GET_QR_EXCHANGE_FUEL, data)
//stations
export const getStations = async(lat, long) => await axiosGet(`${axiosTypes.CLOSE_STATIONS}?lat=${lat}&long=${long}`)

//charges
export const getTransactions = async(filters) => await axiosGet(`${axiosTypes.GET_TRANSACTIONS}${filters}`)
export const getInfoBranch = async(id) => await axiosGet(`${axiosTypes.GET_INFO_BRANCH}${id}`)
export const getBranches = async(filter) => await axiosGet(`${axiosTypes.GET_INFO_BRANCH}${filter}`)
export const putRateCharge = async(data,id) => await axiosPut(`${axiosTypes.GET_TRANSACTIONS}${id}/`, data)

//promotions
export const getAdvertisements = async(filters) => await axiosGet(`${axiosTypes.GET_PROMOTIONS}${filters}`)
export const getAdvertisementId = async(AdvertisementId) => await axiosGet(`${axiosTypes.GET_PROMOTIONS}${AdvertisementId}/`)
//surveys
export const getSurveysTotal = async() => await axiosGet(`${axiosTypes.GET_SURVEYS}total/`);
export const getSurveys = async() => await axiosGet(`${axiosTypes.GET_SURVEYS}all/?page=1&per_page=100`)
export const postSurveys = async(data) => await axiosPost(axiosTypes.SEND_ANSWERS_SURVEY, data)
export const getAnsweredSurveys = async(userId,filter='?page=1&per_page=20') => await axiosGet(`${axiosTypes.ASWERED_SURVEYS}${userId}/${filter}`)

//Notifications
export const getNotifications = async(filter='') => await axiosGet(`${axiosTypes.GET_NOTIFICATIONS}${filter}`)
export const getBadgeNotifications = async() => await axiosGet(axiosTypes.GET_COUNT_NOTIFICATIONS)
export const deleteNotifications = async(id) => await axiosPost(`${axiosTypes.GET_NOTIFICATIONS}${id}/delete/`)
export const postReadNotification = async(id) => await axiosPost(`${axiosTypes.GET_NOTIFICATIONS}${id}/read/`)

//link cards
export const getCardsExchange = async(cardId) => await axiosGet(`${axiosTypes.USER_CARDS}${cardId}/redeemed-cards`);
export const postAddPhysicCard = async(data) => await axiosPost(axiosTypes.ADD_PHYSIC_CARD,data)

//contact
export const getFrecuentQuestion = async() => await axiosGet(axiosTypes.GET_FREQUEST_QUESTIONS)
export const postSendEmail = async(data) => await axiosPost(axiosTypes.SEND_MAIL, data)

//invoicing
export const getCfdiUse = async() => await axiosGet(axiosTypes.GET_CFDI_USE)
export const getTaxRegimen = async() => await axiosGet(axiosTypes.GET_TAX_REGIMEN)
export const postCreateRfc = async(data) => await axiosPost(axiosTypes.POST_ADD_RFC, data)
export const getUserRfc = async() => await axiosGet(axiosTypes.GET_USER_RFC)
export const putRfc = async(data, id) => await axiosPut(`${axiosTypes.POST_ADD_RFC}${id}/`,data)
export const deleteRfc = async(id) => await axiosDelete(`${axiosTypes.POST_ADD_RFC}${id}/`)
export const putAutoInvoicing = async() => await axiosPut(axiosTypes.AUTO_INVOICING)
export const putInvoicingTransaction = async(fuelId, rfcId) => await axiosPut(`${axiosTypes.INVOICE_CHARGE}${fuelId}/${rfcId}`)