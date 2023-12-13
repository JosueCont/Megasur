import React,{useEffect,useState, useRef} from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { getFontSize } from "../../utils/functions";
import ScreenBaseRegister from "../../components/ScreenBaseRegister";
import NameComponent from "../../components/Register/NameComponent";
import MailComponent from "../../components/Register/MailComponent";
import BirthdayComponent from "../../components/Register/BirthdayComponent";
import GenderComponent from "../../components/Register/GenderComponent";
import ModalSubmit from "../../components/modals/ModalSubmitForm";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";


const RegisterScreen = () => {
    const navigation = useNavigation()
    const [componentType, setComponentType] = useState(1)
    const [modalSubmit, setModalSubmit] = useState(false)
    const [isDisableSection, setDisable] = useState(false)
    const name = useSelector(state => state.authDuck.name)
    const lastName = useSelector(state => state.authDuck.lastName)
    const email = useSelector(state => state.authDuck.email)
    const birthdayDate = useSelector(state => state.authDuck.birthday)
    const gender = useSelector(state => state.authDuck.gender)
    const scrollViewRef = useRef();



    useEffect(() => {
        const conditions = {
            1: name !== '' && lastName !== '',
            2: email !== '',
            3: birthdayDate !== '',
            4: gender !== ''
          };
        
          setDisable(!conditions[componentType]);
        //if(componentType === 1){
        //    if(name !='' && lastName != '') setDisable(false)
        //    else setDisable(true)
        //}else if(componentType === 2){
        //    if(email != '') setDisable(false)
        //    else setDisable(true)
        //}else if(componentType === 3){
        //    if(birthdayDate != '') setDisable(false)
        //    else setDisable(true)
        //}else if(componentType === 4){
        //    if(gender != '') setDisable(false)
        //    else setDisable(true)
        //}
    },[componentType, name, lastName, email, birthdayDate,gender])

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

    const onChangeComponent = () => {
        setComponentType((prevComponentType) => {
            if (prevComponentType < 4) {
                onMoveScroll()
              return prevComponentType + 1;
            } else {
                console.log('datos',name, lastName, email, birthdayDate,gender)
                navigation.navigate('RegisterDone')
              return prevComponentType;
            }
          });
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
                        navigation.navigate('RegisterDone')
                        console.log('Omitir respuestas')
                    },400)
                }}
            />
        </ScreenBaseRegister>
    )
}

export default RegisterScreen;