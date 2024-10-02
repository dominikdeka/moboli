import { createStackNavigator } from '@react-navigation/stack';
import SensorDataScreen from './SensorDataScreen';
import ChartScreen from './ChartScreen';
import { commonStyles } from '../styles/common';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const Stack = createStackNavigator();

function SensorsScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.navigate('SensorDataScreen')
  }, []);
  return (
    <View style={commonStyles.screenContainer}>
      <Stack.Navigator
        initialRouteName="SensorDataScreen"
        screenOptions={{
          headerShown: false,
          // tabBarStyle: { backgroundColor: '#4e0329' },
          tabBarShowLabel: false, 
          cardStyle: { flex: 1 }
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
            headerShown: true
            }}
          />
      </Stack.Navigator>
    </View>
  )
}

export default SensorsScreen
