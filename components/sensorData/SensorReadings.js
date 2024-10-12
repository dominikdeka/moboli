import {View, Text, StyleSheet, Pressable} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, commonStyles } from '../../styles/common';
import { useNavigation } from '@react-navigation/native';

function SensorReadings({sensorReading, children, id}) {
  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate('ChartScreen', { sensorName: children, id })
  }

  return <Pressable style={styles.readingsOuterContainer} onPress={pressHandler} android_ripple={{ color: '#ffff33' }}>
      <Text style={styles.header}>{children}</Text>
      <View style={styles.readingsContainer}>
        <View style={styles.singleReadingContainer}>
          <Ionicons name="thermometer-outline" size={30} color="white" />
          <Text style={commonStyles.text}>{sensorReading?.temperature.value} °C</Text>          
        </View>
        <View style={styles.singleReadingContainer}>
          <Ionicons name="water-outline" size={30} color="white" />
          <Text style={commonStyles.text}>{sensorReading?.hummidity.value} %</Text>          
        </View>

      </View>
  </Pressable>
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
    backgroundColor: COLORS.RED,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    fontWeight: '400'

  },
  readingsContainer: {
    backgroundColor: COLORS.GREEN,
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