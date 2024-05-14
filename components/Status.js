import * as React from 'react';

import { Text, StyleSheet, View } from 'react-native'
import { commonStyles } from '../styles/common'
import IconButton from './IconButton';

function Status({name, onReload, serverState, serverError}) {
  return <View style={styles.statusContainer}>
      <Text style={serverError ? commonStyles.errorContainer : styles.textContainer}>{name}: {serverState}</Text>
      <IconButton onPress={onReload} name='reload-outline' />
    </View>
}

export default Status;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    color: 'white',
    paddingVertical: 8
  }
})