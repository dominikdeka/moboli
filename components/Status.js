import * as React from 'react';

import { Text, StyleSheet, View } from 'react-native'
import { commonStyles } from '../styles/common'
import IconButton from './IconButton';
import TextTicker from 'react-native-text-ticker';

function Status({name, onReload, serverState, serverError, loading, title = ''}) {
  const [state, setState] = React.useState('')
  React.useEffect(() => {
    if (loading) setState(`${name}: Ładowanie...`);
    else if (serverError || !title) setState(`${name}: ${serverState}`);
    else setState(title);
  }, [serverState, loading, title])
  return <View style={styles.statusContainer}>
      <View  style={styles.textContainer}>
        <TextTicker
            style={serverError ? commonStyles.error : commonStyles.text}
            duration={6000}
            repeatSpacer={100}
            marqueeDelay={5000}
          >{state}</TextTicker>
      </View>
      <View>
        <IconButton onPress={onReload} name='reload-outline' />
      </View>
    </View>
}

export default Status;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    paddingVertical: 8,
    flexShrink: 1
  },
})