import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const PADDING_TOP = width * 0.12;
const MENU_WIDTH = width * 0.92;
const MENU_PADDING = width * 0.07;
const TITLE_FONT = width * 0.09;
const LABEL_FONT = width * 0.045;
const INPUT_FONT = width * 0.04;
const BOARD_SIZE = width * 0.96;
const CELL_SIZE = BOARD_SIZE / 3;
const CELL_FONT = width * 0.18;
const BUTTON_FONT = width * 0.045;
const BUTTON_PADDING = width * 0.035;
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
    paddingTop: PADDING_TOP,
    backgroundColor: '#87CEEB',
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
    maxWidth: '90%',
  },
  title: {
    fontSize: TITLE_FONT,
    fontWeight: 'bold',
    marginBottom: MENU_PADDING * 0.8,
    color: '#0072ff',
    textShadowColor: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: MENU_PADDING * 0.5,
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
    padding: MENU_PADDING * 0.4,
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
    zIndex: 1000,
  },
  gameContainer: {
    flex: 1,
    padding: MENU_PADDING,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  turnIndicator: {
    fontSize: LABEL_FONT,
    marginBottom: MENU_PADDING * 0.5,
    color: '#555',
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: MENU_PADDING,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cellText: {
    fontSize: CELL_FONT,
  },
  textX: {
    color: '#c2061f',
  },
  textO: {
    color: '#0297e9',
  },
  button: {
    padding: BUTTON_PADDING * 1.2,
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
    backgroundColor: '#fff',
    padding: MENU_PADDING,
  },
  victoryMessage: {
    fontSize: VICTORY_FONT,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: MENU_PADDING,
  },
  fireworks: {
    width: FIREWORKS_SIZE,
    height: FIREWORKS_SIZE,
    marginBottom: MENU_PADDING,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  victoryButton: {
    padding: BUTTON_PADDING * 1.2,
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