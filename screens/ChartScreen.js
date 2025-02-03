import { Dimensions, StyleSheet, Text, View } from "react-native"
import { useRoute } from '@react-navigation/native';
import { COLORS, commonStyles } from "../styles/common";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { sensors } from "../config/sensors.js";
import { fetchReadings } from "../store/thingspeak.js";
import Status from "../components/Status.js";

const mapDate = (date, index) => {
  if (index % 4 !== 0) return ''
  const time = new Date(date);
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const areAllValuesSame = (readings) => {
  const values = Object.values(readings[0]);
  return values.every(value => value === values[0]);
};

function ChartScreen() {
  const route = useRoute();
  const dispatch = useDispatch();
  const readings = useSelector((state) => state.thingspeak.readings);
  const loading = useSelector((state) => state.thingspeak.loading);
  const serverError = useSelector((state) => state.thingspeak.serverError);
  const serverState = useSelector((state) => state.thingspeak.serverState);
  const channel = sensors[route.params.id].temperature.thingspeakReadings.channel;
  const temperatureField = sensors[route.params.id].temperature.thingspeakReadings.field;
  const hummidityField = sensors[route.params.id].hummidity.thingspeakReadings.field;
  // console.log("readings", readings[channel])
  return (
    <View style={commonStyles.screenOuterContainer}>
      <View style={loading ? [commonStyles.screenContainer, commonStyles.loading] : [commonStyles.screenContainer]}>
        <Status 
          name='Poprzednie 24H' 
          onReload={() => dispatch(fetchReadings())} 
          serverError={serverError} 
          serverState={serverState} 
          loading={loading}  />
        <View style={styles.headerContainer}>
          <Text style={commonStyles.text}>
            Temperatury: {route.params.sensorName}
          </Text>
        </View>

        {loading 
          ? <View style={styles.loadingContainer} /> 
          : areAllValuesSame([readings[channel][temperatureField]])
            ? <Text style={commonStyles.text}>Wszystkie odczyty wynoszą: {readings[channel] ? Object.values(readings[channel][temperatureField])[0] : '-'}</Text>
            : <LineChart
                data={{
                  labels: Object.keys(readings[channel][temperatureField]).map(mapDate),
                  datasets: [
                    {
                      data: Object.values(readings[channel][temperatureField])
                    }
                  ]
                }}
                width={Dimensions.get("window").width-72} // from react-native
                height={210}
                yAxisLabel=""
                xLabelsOffset={10}
                verticalLabelRotation={290}
                yAxisSuffix="°C"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: COLORS.GREEN,
                  backgroundGradientFrom: COLORS.GREEN,
                  backgroundGradientTo: COLORS.GREEN,
                  decimalPlaces: 1, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                    paddingVertical: 20
                  },
                  propsForDots: {
                    r: "2",
                    strokeWidth: "1",
                    stroke: COLORS.RED
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />} 

      <View style={styles.headerContainer}>
          <Text style={commonStyles.text}>
            Wilgotność: {route.params.sensorName}
          </Text>
      </View>

      {loading 
        ? <View style={styles.loadingContainer} /> 
        : areAllValuesSame([readings[channel][hummidityField]])
          ? <Text style={commonStyles.text}>Wszystkie odczyty wynoszą: {readings[channel] ? Object.values(readings[channel][hummidityField])[0] : '-'}</Text>
          : <LineChart
              data={{
                labels: Object.keys(readings[channel][hummidityField]).map(mapDate),
                datasets: [
                  {
                    data: Object.values(readings[channel][hummidityField])
                  }
                ]
              }}
              width={Dimensions.get("window").width-72} // from react-native
              height={210}
              yAxisLabel=""
              yAxisSuffix="%"
              yAxisInterval={1} // optional, defaults to 1
              xLabelsOffset={10}
              verticalLabelRotation={290}
              chartConfig={{
                backgroundColor: COLORS.GREEN,
                backgroundGradientFrom: COLORS.GREEN,
                backgroundGradientTo: COLORS.GREEN,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "2",
                  strokeWidth: "1",
                  stroke: COLORS.RED
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />}
      </View>    
    </View>
  )
}

export default ChartScreen

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 16,
    // flex: 1
  },
  loadingContainer: {
    borderRadius: 16,
    width: Dimensions.get("window").width-72,
    height:210,
    backgroundColor: COLORS.GREEN,
    marginVertical: 8,
  }
})