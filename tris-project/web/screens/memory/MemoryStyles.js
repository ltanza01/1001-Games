import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const PADDING = width * 0.06;
const MENU_WIDTH = width * 0.92;
const MENU_PADDING = width * 0.07;
const TITLE_FONT = width * 0.09;
const LABEL_FONT = width * 0.045;
const INPUT_FONT = width * 0.04;
const BUTTON_FONT = width * 0.042;
const VICTORY_FONT = width * 0.08;
const FIREWORKS_SIZE = width * 0.6;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: PADDING,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: MENU_PADDING,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: MENU_WIDTH,
    maxWidth: '98%',
  },
  title: {
    fontSize: TITLE_FONT,
    fontWeight: 'bold',
    marginBottom: PADDING * 0.5,
    color: '#0072ff',
    textShadowColor: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: PADDING * 0.3,
  },
  label: {
    fontSize: LABEL_FONT,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: PADDING * 0.3,
    fontSize: INPUT_FONT,
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
    padding: PADDING * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  turnIndicator: {
    fontSize: LABEL_FONT,
    marginBottom: 10,
    color: '#00c6ff',
  },
  scores: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: LABEL_FONT,
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
    fontSize: width * 0.075,
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    padding: PADDING * 0.35,
    marginTop: 10,
    backgroundColor: '#0072ff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: BUTTON_FONT,
    textAlign: 'center',
  },
  victoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB', // gradiente non supportato nativamente
    padding: PADDING,
  },
  victoryMessage: {
    fontSize: VICTORY_FONT,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: PADDING * 0.5,
  },
  fireworks: {
    width: FIREWORKS_SIZE,
    height: FIREWORKS_SIZE,
    marginBottom: PADDING * 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  victoryButton: {
    padding: PADDING * 0.35,
    margin: 10,
    backgroundColor: '#0072ff',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  victoryButtonText: {
    color: '#fff',
    fontSize: BUTTON_FONT,
  }
});

export default styles;