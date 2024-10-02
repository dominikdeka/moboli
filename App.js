import * as React from 'react';

import { StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from './screens/HomeScreen';
import SensorDataScreen from './screens/SensorDataScreen';
import { StatusBar } from "expo-status-bar";
import Ionicons from '@expo/vector-icons/Ionicons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SensorsScreen from './screens/SensorsScreen';
const Tab = createBottomTabNavigator();

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
  };
  return (
    <>
      <StatusBar style="light" backgroundColor='#4e0329' translucent={false} />
      <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreeen}>
        <ImageBackground
          source={require('./assets/images/20190712_191507.jpg')} 
          resizeMode='cover' 
          style={styles.rootScreeen}
          imageStyle={styles.backgroundImage}
          >
          <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
              sceneContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
              screenOptions={{
                headerShown: false,
                // tabBarStyle: { backgroundColor: '#4e0329' },
                tabBarShowLabel: false
              }}>
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: 'Welcome',
                  tabBarIcon: ({color, size})=> <Ionicons name='musical-notes' size={size} color={color} />
                  }}
                />
              <Tab.Screen
                name="SensorsScreen"
                component={SensorsScreen}
                options={{
                  title: 'Pomiary',
                  tabBarIcon: ({color, size})=> <Ionicons name='thermometer-outline' size={size} color={color} />,
                  unmountOnBlur: true
                  }}
                />

            </Tab.Navigator>
          </NavigationContainer>

        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreeen: {
    backgroundColor: '#ddb52f',
    justifyContent: 'space-around',
    flex: 1
  },
  backgroundImage: {
    opacity: 0.45
  }
});
