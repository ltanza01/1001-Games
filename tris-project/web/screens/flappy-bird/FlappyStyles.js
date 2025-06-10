import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60, 
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 60,
    color: '#87CEEB', 
    textShadowColor: '#333',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  scoreTitle: {
    fontSize: 32, 
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textShadowColor: '#333',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 18, 
    paddingHorizontal: 60, 
    borderRadius: 30,
    marginVertical: 15,
    elevation: 3,
    paddingVerticalScore: 14,
    paddingHorizontalScore: 40,
    borderRadiusScore: 25,
    marginTopScore: 30,
  },
  buttonText: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#333',

    fontSizeScore: 20,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginVertical: 8,
    alignItems: 'center',
    width: 300,
    justifyContent: 'space-between',
    elevation: 2,
  },
  position: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    width: 30,
  },
  name: {
    fontSize: 20,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    width: 50,
    textAlign: 'right',
  },
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
  },
  menuButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginVertical: 12,
    elevation: 2,
  },
  menuButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default styles;