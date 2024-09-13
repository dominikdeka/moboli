import * as React from 'react';

import { StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from './screens/HomeScreen';
import SensorDataScreen from './screens/SensorDataScreen';
import { StatusBar } from "expo-status-bar";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

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
      <StatusBar style="dark" />
      <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreeen}>
        <ImageBackground
          source={require('./assets/images/20190712_191507.jpg')} 
          resizeMode='cover' 
          style={styles.rootScreeen}
          imageStyle={styles.backgroundImage}
          >
          <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
              sceneContainerStyle={{ flex: 1, justifyContent: 'space-around' }}
              screenOptions={{
                tabBarShowLabel: false,
              }}>
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'Welcome'}}
                />
              <Tab.Screen
                name="SensorDataScreen"
                component={SensorDataScreen}
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
