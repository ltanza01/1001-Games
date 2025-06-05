import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function VictoryTris({ route, navigation }) {
  const { winner, player1, player2, mode, difficulty } = route.params;

  const handleNewGame = () => {
    navigation.navigate('Menu');
  };

  const handleRestartGame = () => {
    navigation.navigate('Game', {
      player1,
      player2,
      mode,
      difficulty,
      restart: true // Indica che questa è una richiesta di riavvio del gioco
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.victoryMessage}>{winner} ha Vinto!</Text>
      <Image
        source={require('../../assets/becede1008e8717f7c021f46a285fd58.gif')}
        style={styles.fireworks}
        alt="Fuochi d'artificio"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNewGame}>
          <Text style={styles.buttonText}>Inizia una Nuova Partita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRestartGame}>
          <Text style={styles.buttonText}>Riavvia la Partita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to right, #00c6ff, #0072ff)',
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
  button: {
    padding: 14,
    margin: 10,
    backgroundColor: '#0072ff',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});