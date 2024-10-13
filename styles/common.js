import {StyleSheet} from 'react-native';
export const COLORS = {
    BLACK: 'black',
    WHITE: 'white',
    ERROR: '#ff7777',
    RED: '#dd2222',
    GREEN: 'green'
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
  screenOuterContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  screenContainer: {
    justifyContent: 'center',
    padding: 16,
    marginHorizontal:20,
    backgroundColor: '#4e0329',
    opacity: 0.8,
    borderRadius: 8,
    elevation: 4,
    flex: 0.9
  }, 
  loading: {
    opacity: 0.6
  }
});