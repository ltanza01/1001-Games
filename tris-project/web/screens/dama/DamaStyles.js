import { StyleSheet } from 'react-native';

const CELL_SIZE = 44;

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
  victoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },
  boardWrapper: {
    borderWidth: 3,
    borderColor: '#636e72',
    borderRadius: 16,
    backgroundColor: '#636e72',
    width: CELL_SIZE * 8,
    alignSelf: 'center',
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },
  boardRow: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 0,
  },
  cellSelected: {
    borderWidth: 2,
    borderColor: "#00cec9",
  },
  cellUnselected: {
    borderWidth: 0,
    borderColor: "transparent",
  },
  darkCell: {
    backgroundColor: "#2d3436",
  },
  lightCell: {
    backgroundColor: "#dfe6e9",
  },
  pieceN: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: "#222",
    borderWidth: 2, borderColor: "#fdcb6e",
    alignItems: "center", justifyContent: "center"
  },
  pieceB: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: "#fff",
    borderWidth: 2, borderColor: "#0984e3",
    alignItems: "center", justifyContent: "center"
  },
  pieceNK: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: "#222",
    borderWidth: 2, borderColor: "#fdcb6e",
    alignItems: "center", justifyContent: "center"
  },
  pieceBK: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 2, borderColor: "#0984e3",
    alignItems: "center", justifyContent: "center"
  },
  pieceNKText: {
    color: "#fdcb6e", fontSize: 18, fontWeight: "bold"
  },
  pieceBKText: {
    color: "#0984e3", fontSize: 18, fontWeight: "bold"
  },
  turnBox: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    backgroundColor: "#dfe6e9",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 40,
    overflow: "hidden"
  },
  turnBoxBlue: {
    color: "#0984e3"
  },
});

export default styles;