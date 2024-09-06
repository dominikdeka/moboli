import * as React from 'react';

import { View, StyleSheet } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider';
import Status from './Status';
import IconButton from './IconButton';
import { RadioNS, Radio357 } from '../assets/images/svg';

function Radio({url, name}) {
  const [serverState, setServerState] = React.useState('');
  const [serverError, setServerError] = React.useState('');
  const [socketMopidy, setSocketMopidy] = React.useState(null);

  const [volume, setVolume] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [streamTitle, setStreamTitle] = React.useState('');
  const [trackTitle, setTrackTitle] = React.useState('');
  const [waitStreamTitle, setWaitStreamTitle] = React.useState(false);
  function connectMopidy(messages = []) {
    setLoading(true)
    var ws = new WebSocket(url);
    ws.onopen = () => {
      setServerState('Connected')

      if (Array.isArray(messages) && messages.length) {
        messages.forEach(msg => ws.send(msg))
      }

      ws.send(JSON.stringify({method:'core.mixer.get_volume',jsonrpc:'2.0', id: 99 }));
      ws.send(JSON.stringify({method:'core.playback.get_stream_title',jsonrpc:'2.0', id: 98}))
      ws.send(JSON.stringify({method:'core.playback.get_state',jsonrpc:'2.0', id: 97}))
      ws.send(JSON.stringify({method:'core.playback.get_current_tl_track',jsonrpc:'2.0', id: 96}))
    };
    ws.onclose = (e) => {
      setServerState('Disconnected')
    };
    ws.onerror = (e) => {
      console.log('error', e.message)
      setServerError(e.message);
    };
    ws.onmessage = (e) => {
      console.info(e.data)
      const dataReceived = JSON.parse(e.data);
      if (dataReceived.result && dataReceived.id === 99) {
        setVolume(dataReceived.result)
      }
      if (dataReceived.id === 98) {
        setStreamTitle(dataReceived.result && dataReceived.result)
      }
      if (dataReceived.result && dataReceived.id === 97) {
        setPlaying(dataReceived.result === 'playing' ? true : false)
      }
      if (dataReceived.id === 96
          && (dataReceived.result?.track.name || (Array.isArray(dataReceived.result.artists) && dataReceived.result.artists.length))) {
        const title = []
        if (Array.isArray(dataReceived.result.track.artists) && dataReceived.result.track.artists.length) {
          title.push(dataReceived.result.track.artists[0]?.name)
        }
        if (dataReceived.result?.track.name) {
          title.push(dataReceived.result?.track.name)
        }
        if (title.length){
          setTrackTitle(title.join(' - '))
        }
      }
      
      if (dataReceived.event === 'volume_changed' && dataReceived.volume) {
        setVolume(dataReceived.volume)
      }
      if (dataReceived.event === 'playback_state_changed') {
        setPlaying(dataReceived.new_state === 'playing' ? true : false)
      }
      if (dataReceived.event === 'track_playback_resumed') {
        setLoading(false) // play/pause scenario - when the title does not change
      }
      if (dataReceived.event === 'track_playback_started') {
        const title = []
        if (Array.isArray(dataReceived.tl_track.track.artists) && dataReceived.tl_track.track.artists.length) {
          title.push(dataReceived.tl_track.track.artists[0]?.name)
        }
        if (dataReceived.tl_track?.track.name) {
          title.push(dataReceived.tl_track?.track.name)
        }
        if (title.length) {
          setTrackTitle(title.join(' - '))
          setStreamTitle('')
        }
      }

      if (dataReceived.event === 'stream_title_changed') {
        setWaitStreamTitle(false)
        setStreamTitle(dataReceived.title)
      }

      setServerError('')
    };
    return ws
  }

  React.useEffect(() => {
    setSocketMopidy(connectMopidy())
    return () => {
      socketMopidy?.close();
    }
  }, [])

  React.useEffect(() => {
    if (!waitStreamTitle) {
      setTitle(streamTitle ? streamTitle : trackTitle)
      setLoading(false)
    }
  }, [title, trackTitle, streamTitle, waitStreamTitle])

  const volumeChangeHandler = async (value) => {
    setLoading(true)
    const msg = JSON.stringify({method:'core.mixer.set_volume',params:{volume:value[0]},jsonrpc:'2.0',id:100})
    if (socketMopidy.readyState !== 1) {
      setSocketMopidy(connectMopidy([msg]))
    } else {
      await socketMopidy.send(msg)
    }
    setLoading(false)
  }

  const stopHandler = async () => {
    setLoading(true)

    const messages = [
      JSON.stringify({method:'core.playback.stop',jsonrpc:'2.0',id:101})
    ];
    if (socketMopidy.readyState !== 1) {
      setSocketMopidy(connectMopidy(messages))
    } else {
      for(msg of messages) {
        await socketMopidy.send(msg)
      }
    }
    setLoading(false)
  }

  const playHandler = async () => {
    if (streamTitle) {
      setWaitStreamTitle(true)
    }
    setLoading(true)

    const messages = [
      JSON.stringify({method:'core.playback.play',params:{},jsonrpc:'2.0',id:102})
    ];
    if (socketMopidy.readyState !== 1) {
      setSocketMopidy(connectMopidy(messages))
    } else {
      for(msg of messages) {
        await socketMopidy.send(msg)
      }
    }
  }

  const pauseHandler = async() => {
    setLoading(true)
    const messages = [
      JSON.stringify({method:'core.playback.pause',params:{}, jsonrpc:'2.0',id:103})
    ];
    if (socketMopidy.readyState !== 1) {
      setSocketMopidy(connectMopidy(messages))
    } else {
      for(msg of messages) {
        await socketMopidy.send(msg)
      }
    }
    setLoading(false)
  }

  const radioOnHandler = async (radio) => {
    setWaitStreamTitle(true)
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
      JSON.stringify({jsonrpc:'2.0', method: 'core.tracklist.clear', id:104}),
      JSON.stringify({jsonrpc: '2.0', method: 'core.tracklist.set_repeat', params: {'value': false}, id: 105}),
      JSON.stringify({jsonrpc: '2.0', method: 'core.tracklist.add', params:{'uris':[stream]}, id:106}),
      JSON.stringify({jsonrpc: '2.0', method: 'core.playback.play', id: 107}),
    ]
    if (socketMopidy.readyState !== 1) {
      setSocketMopidy(connectMopidy(messages))
    } else {
      for(msg of messages) {
        await socketMopidy.send(msg)
      }
    }
  }
  return <View style={loading ? [styles.loading, styles.radioContainer] : styles.volumeContainer}>
      <Status 
        name={name} 
        onReload={() => {
          socketMopidy?.close();
          setStreamTitle('')
          setTrackTitle('')
          setSocketMopidy(connectMopidy())
        }} 
        loading={loading} 
        title={title} 
        serverError={serverError} 
        serverState={serverState}
      />
      <Slider
        value={volume}
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
        {!playing && <IconButton onPress={() => playHandler()} name='play'></IconButton>}
        {playing && <IconButton onPress={() => pauseHandler()} name='pause'></IconButton>}
        <IconButton onPress={() => stopHandler()} name='stop'></IconButton>
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
    alignItems: 'center'
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