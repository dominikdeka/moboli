import * as React from 'react';

import { View, StyleSheet } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider';
import Status from './Status';
import IconButton from './IconButton';
import { RadioNS, Radio357 } from '../assets/images/svg';

function Radio({url, name}) {
  const [serverState, setServerState] = React.useState('');
  const [serverError, setServerError] = React.useState('');
  const [socketMopidy, setSocketMopidy] = React.useState();
  const [mopidyVolumeValue, setMopidyVolumeValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  function connectMopidy(messages = []) {
    setServerState('Connecting...')

    var ws = new WebSocket(url);
    ws.onopen = () => {
      setServerState('Connected')

      if (Array.isArray(messages) && messages.length) {
        messages.forEach(msg => ws.send(msg))
      } else {
        ws.send(JSON.stringify({method:'core.mixer.get_volume',jsonrpc:'2.0', id: 99 }));
      }
    };
    ws.onclose = (e) => {
      setServerState('Disconnected')
    };
    ws.onerror = (e) => {
      setServerError(e.message);
    };
    ws.onmessage = (e) => {
      console.info(e.data)
      const dataReceived = JSON.parse(e.data);
      if (dataReceived.volume) {
        setMopidyVolumeValue(dataReceived.volume)
      }
      if (dataReceived.result && dataReceived.id === 99) {
        setMopidyVolumeValue(dataReceived.result)
      }
      if (dataReceived.event === 'stream_title_changed') {
        setServerState(dataReceived.title)
        setLoading(false)
      }
      setServerError('')
    };
    setSocketMopidy(ws)
  }

  React.useEffect(() => {
    connectMopidy()
  }, [])

  const volumeChangeHandler = (value) => {
    // setLoading(true)
    const msg = JSON.stringify({method:'core.mixer.set_volume',params:{volume:value[0]},jsonrpc:'2.0',id:100})
    if (socketMopidy.readyState !== 1) {
      connectMopidy([msg])
    } else {
      socketMopidy.send(msg)
    }
  }

  const radioOnHandler = (radio) => {
    setLoading(true)
    let stream;
    switch (radio) {
      case 'rns':
        stream = 'https://stream.rcs.revma.com/ypqt40u0x1zuv'  
        break;    
      default:
        stream = 'https://stream.rcs.revma.com/ye5kghkgcm0uv'  
        break;
    }
    const messages = [
      // JSON.stringify({jsonrpc:'2.0', method: 'core.mixer.set_volume', params:{volume:35},id:100}),
      JSON.stringify({jsonrpc:'2.0', method: 'core.tracklist.clear', id:101}),
      JSON.stringify({jsonrpc: '2.0', method: 'core.tracklist.set_repeat', params: {'value': false}, id: 102}),
      JSON.stringify({jsonrpc: '2.0', method: 'core.tracklist.add', params:{'uris':[stream]}, id:103}),
      JSON.stringify({jsonrpc: '2.0', method: 'core.playback.play', id: 104})
    ]
    if (socketMopidy.readyState !== 1) {
      connectMopidy(messages)
    } else {
      messages.forEach((msg) => socketMopidy.send(msg))
    }
  }
  return <View style={loading ? [styles.loading, styles.radioContainer] : styles.volumeContainer}>
      <Status name={name} onReload={connectMopidy} loading={loading} serverError={serverError} serverState={serverState} />
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
      <View style={styles.controlsContainer}>
        <IconButton onPress={() => radioOnHandler('357')}>
          <Radio357 width={100} height={100} />
        </IconButton>
        <IconButton onPress={() => radioOnHandler('rns')}>
          <RadioNS width={100} height={100} />
        </IconButton>
      </View>
    </View>
}

export default Radio;

const styles = StyleSheet.create({
  radioContainer: {
    alignItems: 'stretch'
  },
  loading: {
    opacity: 0.5
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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