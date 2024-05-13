import * as React from 'react';

import { Text, View, StyleSheet } from 'react-native'
import PrimaryButton from '../components/PrimaryButton';
import Volume from '../components/Volume';
import { commonStyles } from '../styles/common';
// import { useSharedValue } from 'react-native-reanimated';
// import { Slider } from 'react-native-awesome-slider';

function HomeScreen() {
  const [serverState, setServerState] = React.useState('Loading...');
  const [serverError, setServerError] = React.useState('');
  const [socket, setSocket] = React.useState();
  const [states, setStates] = React.useState([]);

  // const progress = useSharedValue(30);
  // const min = useSharedValue(0);
  // const max = useSharedValue(100);

  var pins = [2,3,14,4,15,18,17];

  function connect(message = '') {
    var ws = new WebSocket('ws://192.168.1.12:8899/');
    ws.onopen = () => {
      setServerState('Connected to the server')

      if (message) {
        ws.send(message)
      }
    };
    ws.onclose = (e) => {
      setServerState('Disconnected. Check internet or server.')
    };
    ws.onerror = (e) => {
      setServerError(e.message);
    };
    ws.onmessage = (e) => {
      const statesReceived = JSON.parse(e.data);
      setStates(pins.map(pin => statesReceived[pin]))
      setServerError('')
    };
    setSocket(ws)
  }

  React.useEffect(() => {
    connect()
  }, [])

  const pressHandler = (gpioPin) => {
    const msg = JSON.stringify({ pin: gpioPin })
    if (socket.readyState !== 1) {
      connect(msg)
    } else {
      socket.send(msg);
    }
  }


return <>
    <View style={styles.inputContainer}>
      <Text style={styles.textContainer}>GPIO: {serverState}</Text>
      {serverError && <Text style={commonStyles.errorContainer}>GPIO: {serverError}</Text>}

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>    
          <PrimaryButton onPress={pressHandler} gpioPin={pins[6]} state={states[6]}>Agata</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>    
          <PrimaryButton onPress={pressHandler} gpioPin={pins[5]} state={states[5]}>Sypialnia</PrimaryButton>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>    
          <PrimaryButton onPress={pressHandler} gpioPin={pins[3]} state={states[3]}>Dora</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>    
          <PrimaryButton onPress={pressHandler} gpioPin={pins[4]} state={states[4]}>Łazienka</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>    
          <PrimaryButton onPress={pressHandler} gpioPin={pins[2]} state={states[2]}>Justyna</PrimaryButton>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>    
          <PrimaryButton onPress={pressHandler} gpioPin={pins[0]} state={states[0]}>Kuchnia</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>    
          <PrimaryButton onPress={pressHandler} gpioPin={pins[1]} state={states[1]}>Salon</PrimaryButton>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.sliderContainer}>
          <Volume 
            name='Home'
            url='ws://192.168.1.12:6680/mopidy/ws'
          />
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.sliderContainer}>
          <Volume 
            name='Salon'
            url='ws://192.168.1.36:6680/mopidy/ws'
          />
        </View>
      </View>

    </View>
  </>
}

export default HomeScreen;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    // marginTop: 100,
    marginHorizontal:24,
    backgroundColor: '#4e0329',
    opacity: 0.8,
    borderRadius: 8,
    elevation: 4
  },
  buttonsContainer: { 
    flexDirection: 'row',
    marginVertical: 10
  },
  sliderContainer: { 
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: { 
    flex: 1
  },
  textContainer: {
    color: 'white',
    paddingVertical: 8
  },
  errorContainer: {
    color: '#ff7777',
    paddingVertical: 8
  }
});
