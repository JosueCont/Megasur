import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
  Platform,
} from "react-native";
import { Select, Spinner } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Input from "../CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  getVehicleData,
  updateVehicleData,
} from "../../store/ducks/profileDuck";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  onChangeImage,
  onChangeInputProf,
  onUpdateDataUser,
} from "../../store/ducks/profileDuck";
import moment from "moment";
import ModalAlertSuccess from "../modals/AlertModalSucces";
import ModalAlertFailed from "../modals/ModalAlertFail";

const { height, width } = Dimensions.get("window");

const VehicleInfoForm = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userId = useSelector((state) => state.authDuck.dataUser?.id);
  const [vehicleData, setVehicleData] = useState({
    plate_number: "",
    insurance_policy_number: "",
    insurance_phone: "",
    insurance_validity_date: "",
  });
  const [loader, setLoader] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getDataVehicle();
  }, [isFocused]);

  const getDataVehicle = async () => {
    setLoader(true);
    const response = await getVehicleData(userId);
    if (response.success) {
      setVehicleData(response.data);
      if (response.data?.insurance_validity_date)
        setDate(new Date(response.data?.insurance_validity_date));
    }
    setLoader(false);
  };

  const handleUpdateVehicleData = async (data) => {
    setLoader(true);
    data.insurance_validity_date = moment(date.toDateString()).format(
      "YYYY-MM-DD"
    );
    const response = await updateVehicleData(userId, data);
    if (response.success) {
      setModalSuccess(true);
    } else {
      setModalFailed(false);
    }

    setLoader(false);
  };

  const onShowDatepicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = ({ type }, selectedDate) => {
    console.log("event", type);
    if (type === "set") {
      const currentDate = selectedDate || date;

      setDate(currentDate);
      if(Platform.OS === 'android'){
        setVehicleData({
          ...vehicleData,
          insurance_validity_date: moment(currentDate.toDateString()).format(
            "DD/MM/YYYY"
          ),
        });
        setShowDatePicker(false);

      }
    } else {
      onShowDatepicker()
      console.log("entro aqui");
    }
  };

  const confirmIOSDate = () => {
    setVehicleData({
      ...vehicleData,
      insurance_validity_date: moment(date.toDateString()).format(
        "DD/MM/YYYY"
      ),
    });
    //setBirthdayDate(moment(date.toDateString()).format('DD/MM/YYYY'))
    onShowDatepicker()

  }

  return (
    <View style={styles.container}>
      <Text style={styles.lblTitle}>Datos de tu vehículo</Text>
      <Text style={styles.lbl}>Número de placas</Text>
      <Input
        maxLength={10}
        autoCapitalize="characters"
        isLogged={true}
        value={vehicleData.plate_number}
        setValue={(value) =>
          setVehicleData({ ...vehicleData, plate_number: value })
        }
      />
      <Text style={styles.lbl}>No. póliza de seguro</Text>
      <Input
        autoCapitalize="none"
        maxLength={40}
        isLogged={true}
        value={vehicleData.insurance_policy_number}
        setValue={(value) =>
          setVehicleData({ ...vehicleData, insurance_policy_number: value })
        }
      />
      <Text style={styles.lbl}>Teléfono de aseguradora</Text>
      <Input
        isLogged={true}
        maxLength={13}
        value={vehicleData.insurance_phone}
        keyboardType="numeric"
        setValue={(value) =>
          setVehicleData({ ...vehicleData, insurance_phone: value })
        }
      />
      <Text style={styles.lbl}>Vigencia del seguro</Text>
      {showDatePicker && (
        <DateTimePicker
          locale="es-ES"
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}

      {showDatePicker && Platform.OS === 'ios' && (
          <View style={{flexDirection:'row',justifyContent:'space-between', width: width/2}}>
              <TouchableOpacity onPress={onShowDatepicker} style={{padding:7, backgroundColor:Colors.red, borderRadius:7}}>
                  <Text style={{color:Colors.white}}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmIOSDate} style={{padding:7, backgroundColor:Colors.orange, borderRadius:7}}>
                  <Text style={{color:Colors.white}}>Confirmar</Text>
              </TouchableOpacity>
          </View>
      )}

      {!showDatePicker && <Pressable onPress={onShowDatepicker}>
        <Input
          placeholder="DD/MM/YYYY"
          editable={false}
          isLogged={true}
          onPressIn={onShowDatepicker}
          //style={{width:150, height:44, backgroundColor:'white', justifyContent:'center',alignItems:'center', paddingLeft:30}}
          value={vehicleData.insurance_validity_date}
          //onChange={(val) => se}
        />
      </Pressable>}

      {/* <Input
        isLogged={true}
        value={vehicleData.insurance_validity_date}
        setValue={(value) =>
          setVehicleData({ ...vehicleData, insurance_validity_date: value })
        }
      /> */}
      <View style={styles.contBt}></View>
      <TouchableOpacity
        onPress={() => {
          handleUpdateVehicleData(vehicleData);
        }}
        style={[styles.btnSave, { backgroundColor: Colors.blueGreen }]}
      >
        {loader ? (
          <Spinner size={"sm"} color={"white"} />
        ) : (
          <Text style={styles.lblBtnSave}>Guardar</Text>
        )}
      </TouchableOpacity>
      <ModalAlertSuccess
        visible={modalSuccess}
        setVisible={() => setModalSuccess(!modalSuccess)}
        message={"Datos de vehículo actualizados."}
      />
      <ModalAlertFailed
        titleBtn="Cerrar"
        visible={modalFailed}
        setVisible={() => setModalFailed(!modalFailed)}
        message={"No ha sido posible actualizar los datos."}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 15,
  },
  lblTitle: {
    fontSize: getFontSize(18),
    color: Colors.grayStrong,
    fontWeight: "bold",
    marginBottom: 4,
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 8,
  },
  lbl: {
    fontSize: getFontSize(14),
    color: Colors.grayStrong,
    fontWeight: "400",
    marginBottom: 4,
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 8,
  },
  contBt: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  btn: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 10,
  },
  lblBtn: {
    color: Colors.gray,
    fontSize: getFontSize(16),
    fontWeight: "400",
  },
  btnSave: {
    width: width * 0.9,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    
  },
  lblBtnSave: {
    color: Colors.white,
    fontSize: getFontSize(16),
    fontWeight: "400",
  },
  input: {
    backgroundColor: Colors.white,
    width: width * 0.9,
    height: 44,
    borderRadius: 8,
    //padding:7,
    borderColor: Colors.gray,
    borderWidth: 1,
    justifyContent: "center",
  },
  img: {
    width: 120,
    height: 60,
    //aspectRatio:2,
    resizeMode: "cover",
  },
});

export default VehicleInfoForm;
