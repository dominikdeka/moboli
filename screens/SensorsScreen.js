import { createStackNavigator } from '@react-navigation/stack';
import SensorDataScreen from './SensorDataScreen';
import ChartScreen from './ChartScreen';
import { useEffect } from 'react';
import { fetchReadings } from '../store/thingspeak';
import { useDispatch } from 'react-redux';
const Stack = createStackNavigator();

function SensorsScreen({navigation}) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReadings())
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      navigation.navigate('SensorDataScreen')
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false, 
        }}>
        <Stack.Screen
          name="SensorDataScreen"
          component={SensorDataScreen}
          options={{
            title: 'Pomiary',
            }}
          />
        <Stack.Screen
          name="ChartScreen"
          component={ChartScreen}
          options={{
            title: 'Wykres',
            // headerShown: true
            }}
          />
      </Stack.Navigator>
  )
}

export default SensorsScreen
