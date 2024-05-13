import {View, Text, Pressable, StyleSheet} from 'react-native'
function PrimaryButton({gpioPin, onPress, state, children}) {
  function pressHandler() {
    if (onPress) {
      onPress(gpioPin);
    }
  }
  return <View style={styles.buttonOuterContainer}>
      <Pressable style={state ? [styles.buttonOn, styles.buttonInnerContainer] : [styles.buttonOff, styles.buttonInnerContainer]} onPress={pressHandler} android_ripple={{ color: '#640233' }}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden'
  },
  buttonInnerContainer: {
    paddingVertical: 8,
    elevation: 2,
  },
  buttonOn: {
    backgroundColor: 'green',
  },
  buttonOff: {
    backgroundColor: '#dd2222',
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