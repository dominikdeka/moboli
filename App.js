import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";
import Ionicons from '@expo/vector-icons/Ionicons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RadioScreen from './screens/RadioScreen';
import SensorsScreen from './screens/SensorsScreen';
const Tab = createMaterialTopTabNavigator();
import { store } from './store/store';
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
          <Provider store={store}>

            <NavigationContainer theme={MyTheme}>
              <Tab.Navigator
                initialRouteName="Radio"
                tabBarPosition="bottom"
                screenOptions={{
                  headerShown: false,
                  tabBarShowLabel: false,
                }}>
                <Tab.Screen
                  name="Radio"
                  component={RadioScreen}
                  options={{
                    title: 'Welcome',
                    tabBarIcon: ({focused, color})=> <Ionicons name='musical-notes' size={24} color={!focused ? color : 'blue'} />
                    }}
                  />
                <Tab.Screen
                  name="SensorsScreen"
                  component={SensorsScreen}
                  options={{
                    title: 'Pomiary',
                    tabBarIcon: ({focused, color})=> <Ionicons name='thermometer-outline' size={24} color={!focused ? color : 'blue'} />,
                    }}
                  />

              </Tab.Navigator>
            </NavigationContainer>
          </Provider>
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
