import React,{useEffect,useState} from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { getFontSize } from "../../utils/functions";
import ScreenBaseRegister from "../../components/ScreenBaseRegister";
import NameComponent from "../../components/Register/NameComponent";
import MailComponent from "../../components/Register/MailComponent";
import BirthdayComponent from "../../components/Register/BirthdayComponent";
import GenderComponent from "../../components/Register/GenderComponent";
import ModalSubmit from "../../components/modals/ModalSubmitForm";
import { useNavigation } from "@react-navigation/native";


const RegisterScreen = () => {
    const navigation = useNavigation()
    const [componentType, setComponentType] = useState(1)
    const [modalSubmit, setModalSubmit] = useState(false)

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
              return prevComponentType + 1;
            } else {
                navigation.navigate('RegisterDone')
                console.log('YA es necesario avanzar')
              return prevComponentType;
            }
          });
    }
    return(
        <ScreenBaseRegister 
            changeSection={() => onChangeComponent()} 
            componentType={componentType} 
            onsubmit={() => setModalSubmit(true)}>
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