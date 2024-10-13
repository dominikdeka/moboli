import { createStackNavigator } from '@react-navigation/stack';
import SensorDataScreen from './SensorDataScreen';
import ChartScreen from './ChartScreen';
import { useEffect } from 'react';
import { fetchReadings } from '../store/thingspeak';
import { useDispatch } from 'react-redux';
import { CommonActions, useNavigationState } from '@react-navigation/native';
const Stack = createStackNavigator();

function SensorsScreen({navigation}) {
  const dispatch = useDispatch()
  const index = useNavigationState((state) => state.index)
  useEffect(() => {
    dispatch(fetchReadings())
  }, [])

  useEffect(() => {
    if (index === 0) {
      navigation.reset({
        index: 0,
        routes: [{ name: "SensorDataScreen" }]
      });
    }
  }, [navigation, index]);

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
