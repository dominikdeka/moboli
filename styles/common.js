import {StyleSheet} from 'react-native';
const COLORS = {
    BLACK: 'black',
    WHITE: 'white',
    ERROR: '#ff7777'
};
export const commonStyles = StyleSheet.create({
  errorContainer: {
    color: COLORS.ERROR,
    paddingVertical: 8,
    textAlign: 'center'
  },
});