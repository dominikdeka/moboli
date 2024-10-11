import { Dimensions, StyleSheet, Text, View } from "react-native"
import { useRoute } from '@react-navigation/native';
import { COLORS, commonStyles } from "../styles/common";
import {
  LineChart,
} from "react-native-chart-kit";
import { useSelector } from "react-redux";

function ChartScreen() {
  const route = useRoute();
  const readings = useSelector((state) => state.thingspeak.readings);
  const loading = useSelector((state) => state.thingspeak.loading);
  return (
    <View style={commonStyles.screenOuterContainer}>
      <View style={commonStyles.screenContainer}>
        <View style={styles.headerContainer}>
          <Text style={commonStyles.text}>
            Zmiana temperatur: {route.params.sensorName}
          </Text>
        </View>

        {!loading && <LineChart
          data={{
            // labels: ["I", "II", "III", "IV", "V", "VI"],
            datasets: [
              {
                data: Object.values(readings[173692]['field1'])
              }
            ]
          }}
          width={Dimensions.get("window").width-72} // from react-native
          height={200}
          yAxisLabel=""
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


      <View style={styles.headerContainer}>
          <Text style={commonStyles.text}>
            Zmiana wilgotności: {route.params.sensorName}
          </Text>
      </View>

      {!loading && <LineChart
          data={{
            // labels: ["I", "II", "III", "IV", "V", "VI"],
            datasets: [
              {
                data: Object.values(readings[173692]['field2'])
              }
            ]
          }}
          width={Dimensions.get("window").width-72} // from react-native
          height={200}
          yAxisLabel=""
          yAxisSuffix="%"
          yAxisInterval={1} // optional, defaults to 1
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
  }
})