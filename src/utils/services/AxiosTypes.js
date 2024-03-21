export const axiosTypes = {
    VERIFY_PHONE : '/security/users/send-sms-to-verify/',
    VALIDATE_CODE: '/security/users/verify-sms/',
    REGISTER_USER: '/security/users/register/',
    SECURITY_USER_DATA: '/security/users/mobile/',
    SECURITY_USER_VEHICLE: '/security/users/vehicle/',
    REFRESH_TOKEN: '/security/users/refresh-token/',
    SECURITY_USER:'/security/users/',
    DELETE_ACCOUNT: 'security/deletion-request/',
    SITE_CONFIG:'/setup/site-config/',
    CLOSE_STATIONS:'/business/branches/distance/',
    CARDS:'/security/users/',
    GET_TRANSACTIONS: '/membership/fuel-transaction/',
    GET_INFO_BRANCH: '/business/branches/',
    VALIDATE_OTP: '/membership/otp-validation/',
    LIST_PRODUCTS:'/store/products/',
    LIST_CATEGORIES:'/store/product-categories/',
    CLOSE_BRANCHES: '/business/branches/distance/',
    GET_ORDERS: '/store/orders/',
    GET_PROMOTIONS: '/marketing/advertisement-app/',
    LOGOUT: '/security/users/logout/',
    GET_SURVEYS:'/marketing/pending-poll/',
    SEND_ANSWERS_SURVEY:'/marketing/poll/response/',
    ASWERED_SURVEYS:'/marketing/poll/response/polls/',
    USER_CARDS:'/membership/user-cards/',
    ADD_PHYSIC_CARD: '/membership/physical-card/redeem/',
    GET_NOTIFICATIONS:'/security/notifications/',
    GET_COUNT_NOTIFICATIONS:'/security/notifications/not-read/',
    GET_FREQUEST_QUESTIONS:'/utilities/faq/',
    SEND_MAIL:'/email/contact/send/',
    GET_POINTS: '/membership/user-card-points/',
    GET_QR_EXCHANGE_FUEL: '/membership/get-code-data/'
}