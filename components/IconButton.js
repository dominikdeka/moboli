import {View, Pressable, StyleSheet} from 'react-native'
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
  },
  buttonInnerContainer: {
    paddingVertical: 8,
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