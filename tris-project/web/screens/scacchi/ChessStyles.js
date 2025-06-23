import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const PADDING_TOP = width * 0.12;
const MENU_WIDTH = width * 0.92;
const MENU_PADDING = width * 0.07;
const TITLE_FONT = width * 0.09;
const LABEL_FONT = width * 0.045;
const INPUT_FONT = width * 0.04;
const BOARD_SIZE = width * 0.96;
const CELL_SIZE = BOARD_SIZE / 8;
const PIECE_FONT = width * 0.07;
const INFO_MARGIN_TOP = width * 0.04;
const TURN_FONT = width * 0.045;
const TURN_PADDING = width * 0.025;
const VICTORY_FONT = width * 0.08;
const FIREWORKS_SIZE = width * 0.6;
const BUTTON_FONT = width * 0.042;
const BUTTON_PADDING = width * 0.035;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: PADDING_TOP,
    backgroundColor: '#87CEEB',
  },
  // --- MENU STYLES ---
  wrapper: {
    flex: 1,
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
    maxWidth: '98%',
  },
  formGroup: {
    width: '100%',
    marginBottom: MENU_PADDING * 0.6,
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
  // --- FINE MENU STYLES ---

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
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    borderWidth: 3,
    borderColor: "#636e72",
    backgroundColor: "#222f3e",
    padding: 4,
    marginBottom: MENU_PADDING * 0.6,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  darkCell: {
    backgroundColor: "#636e72",
  },
  lightCell: {
    backgroundColor: "#f1f2f6",
  },
  cellSelected: {
    borderWidth: 2,
    borderColor: "#00b894",
  },
  cellUnselected: {
    borderWidth: 1,
    borderColor: "#b2bec3",
  },
  pieceW: {
    fontSize: PIECE_FONT,
    color: "#fff",
    textShadowColor: "#636e72",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pieceB: {
    fontSize: PIECE_FONT,
    color: "#222f3e",
    textShadowColor: "#636e72",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  info: {
    marginTop: INFO_MARGIN_TOP,
    alignItems: "center",
  },
  turn: {
    fontSize: TURN_FONT,
    fontWeight: "bold",
    color: "#222f3e",
    backgroundColor: "#dfe6e9",
    padding: TURN_PADDING,
    borderRadius: 8,
    textAlign: "center",
  },
  turnBoxBlue: {
    backgroundColor: "#a5b1c2",
    color: "#222f3e",
  },
  cellHighlight: {
    backgroundColor: "#00e676",
    opacity: 0.5,
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
    marginBottom: MENU_PADDING * 0.7,
  },
  fireworks: {
    width: FIREWORKS_SIZE,
    height: FIREWORKS_SIZE,
    marginBottom: MENU_PADDING * 0.7,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  victoryButton: {
    padding: BUTTON_PADDING,
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
});

export default styles;