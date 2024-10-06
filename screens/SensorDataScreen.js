import React from "react";
import { ImageBackground, StyleSheet, View  } from "react-native"
import { commonStyles } from "../styles/common"
import SensorReadings from "../components/sensorData/SensorReadings";
import { Client } from 'react-native-paho-mqtt';
import Status from "../components/Status";
import MQTTStorage from "../utils/MQTTStorage.js";
import { sensors } from "../config/mqtt";

function SensorDataScreen() {
  const [serverState, setServerState] = React.useState('');
  const [serverError, setServerError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [mqttClient, setMqttClient] = React.useState();
  const [sensorReadings, setSensorReadings] = React.useState(sensors);
  const [newReading, setNewReading] = React.useState();

  function connect(message = '') {
    setLoading(true);
    setSensorReadings(sensors)
    const client = new Client({ uri: process.env.EXPO_PUBLIC_MQTT_SERVER_URI, clientId: 'reactNative-1', storage: MQTTStorage });
    client.on('connectionLost: ', (responseObject) => {
      setServerError('onConnectionLost:' + responseObject);
      setServerState('Połączenie zerwane')
    });
    client.on('messageReceived', (message) => {
      setNewReading({
        name: message.destinationName,
        payload: message.payloadString
      })
    });
    client.connect({ password: process.env.EXPO_PUBLIC_MQTT_PASSWORD, userName: process.env.EXPO_PUBLIC_MQTT_USERNAME })
      .then(() => {
        setServerState('Połączono')

        sensors.forEach(sensor => {
          client.subscribe(sensor.temperature.channel);
          client.subscribe(sensor.hummidity.channel);
        });
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          setServerError('onConnectionLost:' + responseObject);
        }
      });
    return client
  }

  React.useEffect(() => {
    setMqttClient(connect())
    return () => {
      mqttClient?.disconnect();
    }
  }, [])

  React.useEffect(() => {
    setSensorReadings((sr) => {
      const readings = [...sr]
      return readings.map((sensor) => {
        if (sensor.hummidity.channel === newReading?.name) {
          return {
            ...sensor,
            hummidity: {
              ...sensor.hummidity,
              value: newReading.payload
            }
          }
        }
        if (sensor.temperature.channel === newReading?.name) {
          return {
            ...sensor,
            temperature: {
              ...sensor.temperature,
              value: newReading.payload
            }
          }
        }
        return sensor;
      })
    })
    
  }, [newReading])

  React.useEffect(() => {
    setLoading(() => {
      return sensorReadings.some(sensor => sensor.hummidity.value === undefined || sensor.temperature.value === undefined)
    })
  }, [sensorReadings])  
  return (
    <View style={commonStyles.screenOuterContainer}>

      <View style={commonStyles.screenContainer}>
        <View style={loading ? [styles.loading, { flex: 1}]: [{ flex: 1}]}>
          <Status name='Pomiary' onReload={() => {
              mqttClient?.disconnect();
              setMqttClient(connect())
            }} serverError={serverError} serverState={serverState} loading={loading}  />
          {/* <ImageBackground
              source={require('../assets/images/ver1.png')} 
              resizeMode='cover' 
              > */}
          <View style={loading ? [styles.loading, styles.sensorsOuterContainer] : styles.sensorsOuterContainer}>

            <View style={styles.sensorsInnerContainer}>
              <View style={styles.sensorContainer}>    
                <SensorReadings sensorReading={sensorReadings[0]}>Poddasze</SensorReadings>
              </View>
              <View style={styles.sensorContainer}>    
                <SensorReadings sensorReading={sensorReadings[1]}>I Piętro</SensorReadings>
              </View>
              <View style={styles.sensorContainer}>    
                <SensorReadings sensorReading={sensorReadings[2]}>Parter</SensorReadings>
              </View>
              <View style={styles.sensorContainer}>    
                <SensorReadings sensorReading={sensorReadings[3]}>Pralnia</SensorReadings>
              </View>
            </View>

            <View style={styles.sensorsInnerContainer}>
              <View style={{ flex: 1 }}></View>
              <View style={[styles.sensorContainer, { flex: 1 }]}>    
                <SensorReadings sensorReading={sensorReadings[4]}>Na zewnątrz</SensorReadings>
              </View>
              <View style={{ flex: 1 }}></View>
              <View style={[styles.sensorContainer, { flex: 1 }]}>    
                <SensorReadings sensorReading={sensorReadings[5]}>Pod tarasem</SensorReadings>
              </View>
            </View>
          </View>

          {/* </ImageBackground> */}
        </View>
      </View>
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
  loading: {
    opacity: 0.5,
  }
});
