import { StyleSheet, Text, View } from "react-native"
import { useRoute } from '@react-navigation/native';
import { commonStyles } from "../styles/common";

function ChartScreen() {
  const route = useRoute();

  return (
    <View style={commonStyles.screenOuterContainer}>
      <View style={commonStyles.screenContainer}>
        <View style={styles.chartOuterContainer}>
          <Text style={commonStyles.text}>
            Wykres: {route.params.sensorName}!
          </Text>
        </View>
      </View>    
    </View>
  )
}

export default ChartScreen

const styles = StyleSheet.create({
  chartOuterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 16,
    flex: 1
  }
})