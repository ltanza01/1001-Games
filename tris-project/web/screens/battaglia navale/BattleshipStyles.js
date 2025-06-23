import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const PADDING_TOP = width * 0.12;
const MENU_WIDTH = width * 0.92;
const MENU_PADDING = width * 0.07;
const TITLE_FONT = width * 0.09;
const SUBTITLE_FONT = width * 0.045;
const LABEL_FONT = width * 0.045;
const INPUT_FONT = width * 0.04;
const BUTTON_FONT = width * 0.045;
const BUTTON_PADDING = width * 0.035;
const VICTORY_FONT = width * 0.08;
const FIREWORKS_SIZE = width * 0.6;
const CELL_SIZE = width * 0.08;
const CELL_SIZE_SMALL = width * 0.065;
const BOARD_MARGIN = width * 0.025;

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
  marginBottom: {
    marginBottom: MENU_PADDING * 0.5,
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
  subtitle: {
    fontSize: SUBTITLE_FONT,
    color: '#222',
    textAlign: 'center',
    marginBottom: MENU_PADDING * 0.5,
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
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellSmall: {
    width: CELL_SIZE_SMALL,
    height: CELL_SIZE_SMALL,
    margin: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    marginVertical: BOARD_MARGIN,
  },
  waitContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: MENU_PADDING,
    alignItems: 'center',
    elevation: 10,
  },
  modalBoard: {
    marginBottom: MENU_PADDING * 0.5,
  },
});

export default styles;