import React,{useEffect,useState, useRef} from "react";
import { View, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import { getFontSize } from "../../utils/functions";
import ScreenBaseRegister from "../../components/ScreenBaseRegister";
import NameComponent from "../../components/Register/NameComponent";
import MailComponent from "../../components/Register/MailComponent";
import BirthdayComponent from "../../components/Register/BirthdayComponent";
import GenderComponent from "../../components/Register/GenderComponent";
import ModalSubmit from "../../components/modals/ModalSubmitForm";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getExpoToken, getRandomPassword } from "../../utils/functions";
import { onRegisterUser, changeModal } from "../../store/ducks/authDuck";
import moment from "moment";
import ModalAlertFailed from "../../components/modals/ModalAlertFail";


const RegisterScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [componentType, setComponentType] = useState(1)
    const [modalSubmit, setModalSubmit] = useState(false)
    const [isDisableSection, setDisable] = useState(false)
    const name = useSelector(state => state.authDuck.name)
    const lastName = useSelector(state => state.authDuck.lastName)
    const email = useSelector(state => state.authDuck.email)
    const birthdayDate = useSelector(state => state.authDuck.birthday)
    const gender = useSelector(state => state.authDuck.gender)
    const phone = useSelector(state => state.authDuck.phone)
    const isRegistered = useSelector(state => state.authDuck.isRegistered)
    const modalActive = useSelector(state => state.authDuck.modalFailed)
    const message = useSelector(state => state.authDuck.message)

    const scrollViewRef = useRef();



    useEffect(() => {
        const conditions = {
            1: name !== '' && lastName !== '',
            2: email !== '',
            3: birthdayDate !== '',
            4: gender !== ''
        };
        
        setDisable(!conditions[componentType]);
    },[componentType, name, lastName, email, birthdayDate,gender])

    useEffect(() => {
        if(isRegistered){
            setTimeout(() => {
                navigation.navigate('RegisterDone')
            },500)
        }
    },[isRegistered])

    const onMoveScroll = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }

    const renderComponent = () => {
        switch(componentType){
            case 1:
                return <NameComponent />
            case 2:
                return <MailComponent />
            case 3:
                return <BirthdayComponent />
            case 4: 
                return <GenderComponent />
            default:
                return <NameComponent />
                
        }
    }


    const onChangeComponent = async() => {
        const expoToken = await getExpoToken();

        setComponentType((prevComponentType) => {
            if (prevComponentType < 4) {
                onMoveScroll()
              return prevComponentType + 1;
            } else {
                
                const os = Platform.OS;
                const password = getRandomPassword()
               
                dispatch(onRegisterUser({
                    email, first_name:name, last_name: lastName, 
                    birthday:moment(birthdayDate,'DD/MM/YYYY').format('YYYY-MM-DD'), 
                    gender, expoToken, os, password, phone
                }))
                //navigation.navigate('RegisterDone')
              return prevComponentType;
            }
          });
    }

    const onSubmitForm = async() => {
        const expoToken = await getExpoToken();
        const os = Platform.OS;
        const password = getRandomPassword()
        await dispatch(onRegisterUser({
            email, first_name:name, last_name: lastName, 
            birthday:birthdayDate != '' ? moment(birthdayDate,'DD/MM/YYYY').format('YYYY-MM-DD') : '', 
            gender, expoToken, os, password, phone
        }))

    }
    return(
        <ScreenBaseRegister 
            scrollViewRef={scrollViewRef}
            changeSection={() => onChangeComponent()} 
            componentType={componentType} 
            onsubmit={() => setModalSubmit(true)}
            isDisabled={isDisableSection}>
            {renderComponent()}
            <ModalSubmit 
                visible={modalSubmit}
                setVisible={() => setModalSubmit(false)}
                onSubmit={() => {
                    setModalSubmit(false)
                    setTimeout(() => {
                        
                        //navegar a pantalla de gracias
                        //navigation.navigate('RegisterDone')
                        //console.log('Omitir respuestas')
                        onSubmitForm()
                    },400)
                }}
            />
            <ModalAlertFailed 
                visible={modalActive}
                titleBtn="Cerrar"
                setVisible={() => dispatch(changeModal({prop:'modalFailed', val: false}))}
                message={message}
            />
        </ScreenBaseRegister>
    )
}

export default RegisterScreen;