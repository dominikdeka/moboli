import React from "react";
import { StyleSheet, View  } from "react-native"
import { commonStyles } from "../styles/common"
import SensorReadings from "../components/sensorData/SensorReadings";
import Status from "../components/Status";
import { useDispatch, useSelector } from "react-redux";
import { fetchReadings } from "../store/thingspeak.js";
import { sensors } from "../config/sensors.js";

const selectLastValue = (index, field, readings) => {
  if (!readings[sensors[index][field].thingspeakReadings.channel]) return '-'
  const allReadings = readings[sensors[index][field].thingspeakReadings.channel][sensors[index][field].thingspeakReadings.field]
  return allReadings[Object.keys(allReadings)[Object.keys(allReadings).length-1]]
}

function SensorDataScreen() {
  const dispatch = useDispatch();
  const readings = useSelector((state) => state.thingspeak.readings);
  const loading = useSelector((state) => state.thingspeak.loading);
  const serverError = useSelector((state) => state.thingspeak.serverError);
  const serverState = useSelector((state) => state.thingspeak.serverState);

  return (
    <View style={commonStyles.screenOuterContainer}>

      <View style={loading ? [commonStyles.screenContainer, commonStyles.loading] : [commonStyles.screenContainer]}>
        <Status 
          name='Pomiary' 
          onReload={() => dispatch(fetchReadings())} 
          serverError={serverError} 
          serverState={serverState} 
          loading={loading}  />
        <View style={loading ? [styles.loading, styles.sensorsOuterContainer] : styles.sensorsOuterContainer}>

          <View style={styles.sensorsInnerContainer}>
            <View style={styles.sensorContainer}>    
              <SensorReadings temperature={selectLastValue(0, 'temperature', readings)} hummidity={selectLastValue(0, 'hummidity', readings)} id={0}>{sensors[0].label}</SensorReadings>
            </View>
            <View style={styles.sensorContainer}>    
              <SensorReadings temperature={selectLastValue(1, 'temperature', readings)} hummidity={selectLastValue(1, 'hummidity', readings)} id={1}>{sensors[1].label}</SensorReadings>
            </View>
            <View style={styles.sensorContainer}>    
              <SensorReadings temperature={selectLastValue(2, 'temperature', readings)} hummidity={selectLastValue(2, 'hummidity', readings)} id={2}>{sensors[2].label}</SensorReadings>
            </View>
            <View style={styles.sensorContainer}>    
              <SensorReadings temperature={selectLastValue(3, 'temperature', readings)} hummidity={selectLastValue(3, 'hummidity', readings)} id={3}>{sensors[3].label}</SensorReadings>
            </View>
          </View>

          <View style={styles.sensorsInnerContainer}>
            <View style={{ flex: 1 }}></View>
            <View style={[styles.sensorContainer, { flex: 1 }]}>    
              <SensorReadings temperature={selectLastValue(4, 'temperature', readings)} hummidity={selectLastValue(4, 'hummidity', readings)} id={4}>{sensors[4].label}</SensorReadings>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={[styles.sensorContainer, { flex: 1 }]}>    
              <SensorReadings temperature={selectLastValue(5, 'temperature', readings)} hummidity={selectLastValue(5, 'hummidity', readings)} id={5}>{sensors[5].label}</SensorReadings>
            </View>
          </View>
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
  }
});
