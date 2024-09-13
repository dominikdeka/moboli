import React from "react";
import { ImageBackground, StyleSheet, View  } from "react-native"
import { commonStyles } from "../styles/common"
import SensorReadings from "../components/sensorData/SensorReadings";

function SensorDataScreen() {
  const [serverState, setServerState] = React.useState('');
  const [serverError, setServerError] = React.useState('');
  const [socket, setSocket] = React.useState();
  const [states, setStates] = React.useState([]);
  function connect() {
    console.info('reconnect');
  }
  var pins = [2,3,14,4,15,18,17];

  return (
    <View style={[commonStyles.screenContainer]}>
      {/* <Status name='Pomiary' onReload={connect} serverError={serverError} serverState={serverState} /> */}
      {/* <ImageBackground
          source={require('../assets/images/ver1.png')} 
          resizeMode='cover' 
          > */}
      <View style={styles.sensorsOuterContainer}>

        <View style={styles.sensorsInnerContainer}>
          <View style={styles.sensorContainer}>    
            <SensorReadings gpioPin={pins[6]} state={states[6]}>Poddasze</SensorReadings>
          </View>
          <View style={styles.sensorContainer}>    
            <SensorReadings gpioPin={pins[5]} state={states[5]}>I Piętro</SensorReadings>
          </View>
          <View style={styles.sensorContainer}>    
            <SensorReadings gpioPin={pins[5]} state={states[5]}>Parter</SensorReadings>
          </View>
          <View style={styles.sensorContainer}>    
            <SensorReadings gpioPin={pins[5]} state={states[5]}>Pralnia</SensorReadings>
          </View>
        </View>

        <View style={styles.sensorsInnerContainer}>
          <View style={{ flex: 1 }}></View>
          <View style={[styles.sensorContainer, { flex: 1 }]}>    
            <SensorReadings gpioPin={pins[3]} state={states[3]}>Na zewnątrz</SensorReadings>
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={[styles.sensorContainer, { flex: 1 }]}>    
            <SensorReadings gpioPin={pins[4]} state={states[4]}>Pod tarasem</SensorReadings>
          </View>
        </View>
      </View>

      {/* </ImageBackground> */}
    </View>
  )
}

export default SensorDataScreen

const styles = StyleSheet.create({
  sensorsOuterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 16,
    flex: 1
  },
  sensorsInnerContainer: {
    flexDirection: 'column',
    marginVertical: 10,
    flex: 1,
    // gap: 8
  },
  sensorContainer: {
    flex: 1
  },
});
