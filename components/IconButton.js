import {View, Text, Pressable, StyleSheet} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

function IconButton({onPress, name, children}) {
  function pressHandler() {
    if (onPress) {
      onPress();
    }
  }
  return <View style={styles.buttonOuterContainer}>
      <Pressable style={styles.buttonInnerContainer} onPress={pressHandler} android_ripple={{ color: '#640233' }}>
        {name ? <Ionicons name={name} size={20} color="white" /> : children}
      </Pressable>
    </View>
}

export default IconButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    overflow: 'hidden'
  },
  buttonInnerContainer: {
    paddingVertical: 8,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14
  },
  pressed: {
    opacity: 0.4
  }
})