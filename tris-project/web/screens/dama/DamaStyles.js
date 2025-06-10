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
    aspectRatio: 1,
    width: '98%',
    maxWidth: 380,
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
    width: 44,
    height: 44,
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
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "#232946", // grigio/blu notte
    borderWidth: 2,
    borderColor: "#b8c1ec",    // bordo chiaro
    alignItems: "center", justifyContent: "center",
    shadowColor: "#232946",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 2,
  },
  pieceB: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "#fff",   // bianco puro
    borderWidth: 2,
    borderColor: "#b8c1ec",    // bordo chiaro
    alignItems: "center", justifyContent: "center",
    shadowColor: "#b8c1ec",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 3,
    elevation: 2,
  },
  pieceNK: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "#232946",
    borderWidth: 2,
    borderColor: "#f6c177",    // bordo oro per dama nera
    alignItems: "center", justifyContent: "center",
    shadowColor: "#232946",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,
  },
  pieceBK: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#f6c177",    // bordo oro per dama bianca
    alignItems: "center", justifyContent: "center",
    shadowColor: "#b8c1ec",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  pieceNKText: {
    color: "#f6c177", fontSize: 18, fontWeight: "bold"
  },
  pieceBKText: {
    color: "#f6c177", fontSize: 18, fontWeight: "bold"
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