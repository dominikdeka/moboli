import * as React from 'react';

import { Text, StyleSheet, View } from 'react-native'
import { commonStyles } from '../styles/common'
import IconButton from './IconButton';
import TextTicker from 'react-native-text-ticker';

function Status({name, onReload, serverState, serverError, loading}) {
  return <View style={styles.statusContainer}>
      <View  style={serverError ? [styles.textContainer, commonStyles.errorContainer] : styles.textContainer}>
        <TextTicker
            style={serverError ? commonStyles.errorContainer : styles.text}
            duration={6000}
            repeatSpacer={100}
            marqueeDelay={5000}
          >
            {name}: {loading ? 'Loading...' : serverState}
        </TextTicker>
      </View>
      <View style={styles.iconContainer}>
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
  },
  iconContainer: {
  },
  text: {
    color: 'white',
  },
})