import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#e6f2ff',
  },
  menu: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 5,
    width: '90%',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  dropdown: {
  borderColor: '#ccc',
  height: 48,
  marginTop: 8,
  },
  dropdownContainer: {
  borderColor: '#ccc',
  zIndex: 1000,
  },
  gameContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to right, #00c6ff, #0072ff)',
  },
  turnIndicator: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  board: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cellText: {
    fontSize: 32,
  },
  textX: {
    color: '#c2061f',
  },
  textO: {
    color: '#0297e9',
  },
  button: {
    padding: 14,
    marginTop: 10,
    backgroundColor: '#0072ff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
    victoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to right, #00c6ff, #0072ff)',
    padding: 20,
  },
  victoryMessage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  fireworks: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  victoryButton: {
    padding: 14,
    margin: 10,
    backgroundColor: '#0072ff',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  victoryButtonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default styles;