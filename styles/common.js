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
  },
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 16,
    marginHorizontal:24,
    backgroundColor: '#4e0329',
    opacity: 0.8,
    borderRadius: 8,
    elevation: 4,
    flex: 0.9
  }
});