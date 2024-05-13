import * as React from 'react';

import { View, Text, StyleSheet } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider';
import { commonStyles } from '../styles/common'

function Volume({url, name}) {
  const [mopidyServerState, setMopidyServerState] = React.useState('Loading...');
  const [mopidyServerError, setMopidyServerError] = React.useState('');
  const [socketMopidy, setSocketMopidy] = React.useState();
  const [mopidyVolumeValue, setMopidyVolumeValue] = React.useState(0);

  function connectMopidy(message = '') {
    var ws = new WebSocket(url);
    ws.onopen = () => {
      setMopidyServerState('Connected to the server')

      if (message) {
        ws.send(message)
      } else {
        ws.send(JSON.stringify({method:'core.mixer.get_volume',jsonrpc:'2.0', id: 99 }));
      }
    };
    ws.onclose = (e) => {
      setMopidyServerState('Disconnected. Check internet or server.')
    };
    ws.onerror = (e) => {
      setMopidyServerError(e.message);
    };
    ws.onmessage = (e) => {
      const dataReceived = JSON.parse(e.data);
      // console.log(dataReceived)
      if (dataReceived.volume) {
        setMopidyVolumeValue(dataReceived.volume)
      }
      if (dataReceived.result && dataReceived.id === 99) {
        setMopidyVolumeValue(dataReceived.result)
      }
      setMopidyServerError('')
    };
    setSocketMopidy(ws)
  }

  React.useEffect(() => {
    connectMopidy()
  }, [])

  const volumeChangeHandler = (value) => {
    const msg = JSON.stringify({method:"core.mixer.set_volume",params:{volume:value[0]},jsonrpc:"2.0",'id':100})
    if (socketMopidy.readyState !== 1) {
      connectMopidy(msg)
    } else {
      socketMopidy.send(msg)
    }
  }

  return <View style={styles.volumeContainer}>
      <Text style={styles.textContainer}>{name}: {mopidyServerState}</Text>
      {mopidyServerError && <Text style={commonStyles.errorContainer}>{name}: {mopidyServerError}</Text>}
      <Slider
        value={mopidyVolumeValue}
        minimumValue={0}
        maximumValue={100}
        step={1}
        onSlidingComplete={volumeChangeHandler}
        animateTransitions
        minimumTrackTintColor="#30a935"
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
      />
    </View>
}

export default Volume;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 28,
    overflow: 'hidden'
  },
  textContainer: {
    color: 'white',
    paddingVertical: 8,
    textAlign: 'center'
  },
  errorContainer: {
    color: '#ff7777',
    paddingVertical: 8,
    textAlign: 'center'
  },
  thumb: {
    backgroundColor: 'green',
    borderColor: '#30a935',
    borderRadius: 30 / 2,
    borderWidth: 2,
    height: 30,
    width: 30,
  },
  track: {
      borderRadius: 2,
      height: 4,
  },
})