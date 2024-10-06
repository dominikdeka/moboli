import * as React from 'react';

import { View, StyleSheet } from 'react-native'
import PrimaryButton from '../components/PrimaryButton';
import Status from '../components/Status';
import Radio from '../components/Radio';
import { commonStyles } from '../styles/common';

function RadioScreen() {
  const [serverState, setServerState] = React.useState('');
  const [serverError, setServerError] = React.useState('');
  const [socket, setSocket] = React.useState();
  const [states, setStates] = React.useState([]);

  var pins = [2,3,14,4,15,18,17];

  function connect(message = '') {
    var ws = new WebSocket(process.env.EXPO_PUBLIC_RADIO_GPIO_SERVER);
    setServerState('Łączenie...')
    ws.onopen = () => {
      setServerState('Połączono')

      if (message) {
        ws.send(message)
      }
    };
    ws.onclose = (e) => {
      setServerState('Połączenie zerwane')
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


return <View style={commonStyles.screenOuterContainer}>
    <View style={commonStyles.screenContainer}>

      <Status name='GPIO' onReload={connect} serverError={serverError} serverState={serverState} />
      
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

      <View style={styles.radioContainer}>
          <Radio 
            name='Radiowęzeł'
            url={process.env.EXPO_PUBLIC_RADIO_HOME_SERVER}
          />
      </View>

      <View style={styles.radioContainer}>
          <Radio 
            name='Salon'
            url={process.env.EXPO_PUBLIC_RADIO_LIVINGROOM_SERVER}
          />
      </View>

    </View>
  </View>
}

export default RadioScreen;

const styles = StyleSheet.create({
  buttonsContainer: { 
    flexDirection: 'row',
    marginVertical: 10,
    gap: 8
  },
  buttonContainer: { 
    flex: 1
  },
  radioContainer: { 
    marginVertical: 8,
  },
});
