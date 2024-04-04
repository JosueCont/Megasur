import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

const AboutAppScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <HeaderLogged
      title="Acerca de la app"
      isBack={true}
      goBack={() => navigation.goBack()}
    >
      <View style={{ marginHorizontal: 15 }}>
        <View style={styles.contHeader}>
          <Image
            source={require("../../../../assets/LogoMegaCard.png")}
            style={styles.img}
          />
          <Text style={styles.lblDesc}>
            Versión: {Constants.expoConfig.version}(
            {Platform.OS === "ios"
              ? Constants.expoConfig.ios.buildNumber.toString()
              : Constants.expoConfig.android.versionCode}
            ){" "}
          </Text>
        </View>
        <View style={styles.separator}>
          <Text style={styles.lblDesc}>
            La aplicación es una plataforma de fidelización de clientes diseñada
            para usuarios que frecuentan estaciones de servicio de <Text style={{fontWeight:'bold'}}>MEGASUR</Text>. Ofrece un
            sistema de acumulación de puntos por cada compra de combustible,
            siguiendo reglas de bonificación de puntos establecidas. Además,
            proporciona la posibilidad de obtener puntos adicionales
            participando en encuestas u otras actividades promocionales.
          </Text>
        </View>
        <View style={styles.separator}>
          <Text style={styles.lblTitle}>Características Principales:</Text>
          <Text style={styles.lblDesc}>
            1.
            <Text style={styles.lblSubtitle}>
              Acumulación de Puntos por Compra de Combustible:{" "}
            </Text>
            Los usuarios ganan puntos cada vez que realizan una compra de
            combustible en una estación de servicio <Text style={{fontWeight:'bold'}}>MEGASUR</Text>. La cantidad de
            puntos ganados puede variar según el monto de la compra y las reglas
            de bonificación establecidas.
          </Text>
          <Text style={styles.lblDesc}>
            2.
            <Text style={styles.lblSubtitle}>
              Reglas de Bonificación de Puntos:{" "}
            </Text>{" "}
            La aplicación puede tener reglas específicas que determinan cuándo y
            cómo se otorgan puntos adicionales. Por ejemplo, bonificaciones por
            cargar en determinados días de la semana, por el cumpleaños del usuario, etc.
          </Text>
          <Text style={styles.lblDesc}>
            3.
            <Text style={styles.lblSubtitle}>
              Canje de Puntos por Productos y Combustible:{" "}
            </Text>
            Los usuarios pueden canjear los puntos acumulados por una variedad
            de productos disponibles en el programa de recompensas, que pueden
            incluir desde artículos de conveniencia hasta descuentos en
            combustible. El proceso de canje se realiza a través de la
            aplicación, donde los usuarios pueden navegar por el catálogo de
            producto/combustible (Magna, Premium y Diésel)  y seleccionar lo que desean.
          </Text>
          <Text style={styles.lblDesc}>
            4.
            <Text style={styles.lblSubtitle}>
              Obtención de Puntos por Actividades Adicionales:{" "}
            </Text>
            Además de ganar puntos por compras de combustible, los usuarios
            pueden obtener puntos adicionales participando en actividades como
            encuestas o promociones especiales.
          </Text>
          <Text style={styles.lblDesc}>
            5.
            <Text style={styles.lblSubtitle}>
              Seguimiento de Puntos y Historial de Transacciones:{" "}
            </Text>
            La aplicación permite a los usuarios llevar un registro de los
            puntos acumulados, así como revisar su historial de transacciones
            para ver cómo han utilizado sus puntos en el pasado.
          </Text>
          <Text style={styles.lblDesc}>
            6.
            <Text style={styles.lblSubtitle}>
              Notificaciones y Ofertas Personalizadas:{" "}
            </Text>
            La aplicación puede enviar notificaciones a los usuarios sobre
            ofertas especiales, promociones exclusivas, entre otros anuncios relevantes.
          </Text>
        </View>
        <View style={styles.separator}>
          <Text style={styles.lblTitle}>Beneficios para los Usuarios:</Text>
          <Text style={styles.lblDesc}>
            <Text style={[styles.lblSubtitle, { fontSize: getFontSize(18), fontWeight:'bold' }]}>
              ·{" "}
            </Text>
            Recompensas por la lealtad: Los usuarios se benefician de descuentos
            y productos gratuitos como resultado de sus compras habituales de
            combustible.
          </Text>
          <Text style={styles.lblDesc}>
            <Text style={[styles.lblSubtitle, { fontSize: getFontSize(18), fontWeight:'bold' }]}>
              ·{" "}
            </Text>
            Participación en actividades adicionales: Los usuarios pueden
            obtener puntos adicionales participando en encuestas promocionales, 
            lo que les permite acumular puntos más rápido.
          </Text>
          <Text style={styles.lblDesc}>
            <Text style={[styles.lblSubtitle, { fontSize: getFontSize(18), fontWeight:'bold' }]}>
              ·{" "}
            </Text>
            Personalización de ofertas: La aplicación puede ofrecer ofertas
            personalizadas basadas en el historial de transacciones y las
            preferencias del usuario.
          </Text>
        </View>

        {/*<Text style={styles.lblDesc}>
          En resumen, esta aplicación proporciona a los usuarios una manera
          conveniente de acumular puntos y obtener recompensas por sus compras
          de combustible, al tiempo que fomenta la participación a través de
          actividades adicionales y ofertas personalizadas.
            </Text>*/}
      </View>
    </HeaderLogged>
  );
};

const styles = StyleSheet.create({
  contHeader: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 15,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  separator: {
    marginBottom: 15,
  },
  lblTitle: {
    color: Colors.darkGray,
    fontSize: getFontSize(18),
    fontWeight: "700",
    marginBottom: 8,
  },
  lblSubtitle: {
    color: Colors.darkGray,
    fontSize: getFontSize(14),
    fontWeight: "700",
  },
  lblDesc: {
    color: Colors.grayStrong,
    fontSize: getFontSize(14),
    fontWeight: "400",
    marginBottom: 8,
    textAlign: "justify",
  },
});

export default AboutAppScreen;
