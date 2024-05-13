import * as React from 'react';

import { StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from './screens/HomeScreen';
import { StatusBar } from "expo-status-bar";

export default function App() {

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
          <HomeScreen />
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
