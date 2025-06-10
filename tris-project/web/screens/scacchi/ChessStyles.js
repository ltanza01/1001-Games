import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    backgroundColor: '#87CEEB',
  },
  // --- MENU STYLES (da TrisStyles) ---
  wrapper: {
    flex: 1,
    backgroundColor: '#87CEEB',
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
    zIndex: 1000,
  },
  // --- FINE MENU STYLES ---

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
  board: {
    borderWidth: 3,
    borderColor: "#636e72",
    backgroundColor: "#222f3e",
    padding: 4,
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 38,
    height: 38,
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
    fontSize: 28,
    color: "#fff",
    textShadowColor: "#636e72",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pieceB: {
    fontSize: 28,
    color: "#222f3e",
    textShadowColor: "#636e72",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  info: {
    marginTop: 16,
    alignItems: "center",
  },
  turn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222f3e",
    backgroundColor: "#dfe6e9",
    padding: 8,
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
});

export default styles;