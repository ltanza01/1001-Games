import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FlappyMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flappy Bird</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GameFlappy')}
      >
        <Text style={styles.buttonText}>Gioca</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Leaderboard')}
      >
        <Text style={styles.buttonText}>Classifica</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 60,
    color: '#fff',
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
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FlappyMenu;