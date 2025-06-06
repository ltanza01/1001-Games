import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: '#007bff',
  },
  headerButton: {
    padding: 10,
    paddingBottom:0,
  },
  headerText: {
    color: '#ffffff', 
    textAlign: 'center',
  },
  headerTextLabel: {
    color: '#fff', 
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
  },
  activeText: {
    fontWeight: 'bold',
  },
});

export default styles;
