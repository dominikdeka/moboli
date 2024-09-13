import {View, Text, StyleSheet} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { commonStyles } from '../../styles/common';

function SensorReadings({gpioPin, onPress, state, children}) {
  function pressHandler() {
    if (onPress) {
      onPress(gpioPin);
    }
  }
  return <View style={styles.readingsOuterContainer}>
      <Text style={styles.header}>{children}</Text>
      <View style={styles.readingsContainer}>
        <View style={styles.singleReadingContainer}>
          <Ionicons name="thermometer-outline" size={30} color="white" />
          <Text style={commonStyles.text}>20 °C</Text>          
        </View>
        <View style={styles.singleReadingContainer}>
          <Ionicons name="water-outline" size={30} color="white" />
          <Text style={commonStyles.text}>40 %</Text>          
        </View>

      </View>
    </View>
}

export default SensorReadings;

const styles = StyleSheet.create({
  readingsOuterContainer: {
    overflow: 'hidden',
    flex: 1,
    marginVertical: 8,
  },
  header: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#dd2222',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    fontWeight: '400'

  },
  readingsContainer: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flex: 1
  },
  singleReadingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})