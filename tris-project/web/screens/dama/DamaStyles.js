import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const PADDING_TOP = width * 0.12;
const MENU_WIDTH = width * 0.92;
const MENU_PADDING = width * 0.07;
const TITLE_FONT = width * 0.09;
const LABEL_FONT = width * 0.045;
const INPUT_FONT = width * 0.04;
const BUTTON_FONT = width * 0.045;
const BUTTON_PADDING = width * 0.035;
const VICTORY_FONT = width * 0.08;
const FIREWORKS_SIZE = width * 0.6;
const CELL_SIZE = width * 0.11;
const PIECE_SIZE = CELL_SIZE * 0.65;
const PIECE_K_SIZE = CELL_SIZE * 0.75;
const PIECE_K_FONT = width * 0.045;
const TURN_FONT = width * 0.045;
const TURN_PADDING = width * 0.025;

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
  boardWrapper: {
    aspectRatio: 1,
    width: '98%',
    maxWidth: width * 0.98,
    alignSelf: 'center',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#e5e9f2',
    borderRadius: 18,
    shadowColor: '#22223b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  boardRow: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    margin: 1.7,
    overflow: 'hidden',
  },
  cellSelected: {
    borderWidth: 2,
    borderColor: "#3bc9db",
    backgroundColor: "#e3fafc",
  },
  cellUnselected: {
    borderWidth: 0,
    borderColor: "transparent",
  },
  darkCell: {
    backgroundColor: "#22223b",
  },
  lightCell: {
    backgroundColor: "#f8f9fa",
  },
  pieceN: {
    width: PIECE_SIZE,
    height: PIECE_SIZE,
    borderRadius: PIECE_SIZE / 2,
    backgroundColor: "#232946",
    borderWidth: 2,
    borderColor: "#b8c1ec",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#232946",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 2,
  },
  pieceB: {
    width: PIECE_SIZE,
    height: PIECE_SIZE,
    borderRadius: PIECE_SIZE / 2,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#b8c1ec",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#b8c1ec",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 3,
    elevation: 2,
  },
  pieceNK: {
    width: PIECE_K_SIZE,
    height: PIECE_K_SIZE,
    borderRadius: PIECE_K_SIZE / 2,
    backgroundColor: "#232946",
    borderWidth: 2,
    borderColor: "#f6c177",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#232946",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,
  },
  pieceBK: {
    width: PIECE_K_SIZE,
    height: PIECE_K_SIZE,
    borderRadius: PIECE_K_SIZE / 2,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#f6c177",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#b8c1ec",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  pieceNKText: {
    color: "#f6c177",
    fontSize: PIECE_K_FONT,
    fontWeight: "bold"
  },
  pieceBKText: {
    color: "#f6c177",
    fontSize: PIECE_K_FONT,
    fontWeight: "bold"
  },
  turnBox: {
    marginTop: 12,
    fontSize: TURN_FONT,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    backgroundColor: "#dfe6e9",
    borderRadius: 8,
    padding: TURN_PADDING * 1.2,
    marginHorizontal: 40,
    overflow: "hidden"
  },
  turnBoxBlue: {
    color: "#0984e3"
  },
});

export default styles;