import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 340,
    maxWidth: '90%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#0072ff',
    textShadowColor: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 4,
  },
  dropdown: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 4,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 10,
  },
  gameContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  turnIndicator: {
    fontSize: 18,
    marginBottom: 10,
    color: '#00c6ff',
  },
  scores: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#00c6ff',
    marginHorizontal: 20,
  },
  board: {
    width: '80%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tile: {
    width: '16.66%', 
    height: '16.66%', 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  tileText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
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