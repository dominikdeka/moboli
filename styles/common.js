import {StyleSheet} from 'react-native';
const COLORS = {
    BLACK: 'black',
    WHITE: 'white',
    ERROR: '#ff7777'
};
export const commonStyles = StyleSheet.create({
  error: {
    fontSize: 16,
    color: COLORS.ERROR,
  },
  text: {
    fontSize: 16,
    color: COLORS.WHITE,
  }
});