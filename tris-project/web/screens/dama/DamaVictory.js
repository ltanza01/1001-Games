import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './DamaStyles.js';

export default function DamaVictory({ route, navigation }) {
  const { winner, player1, player2, mode, difficulty } = route.params;

  const handleNewGame = () => {
    navigation.navigate('MenuDama');
  };

  const handleRestartGame = () => {
    navigation.navigate('GameDama', {
      player1,
      player2,
      mode,
      difficulty,
      restart: true
    });
  };

  return (
    <View style={styles.victoryContainer}>
      <Text style={styles.victoryMessage}>{winner} ha Vinto!</Text>
      <Image
        source={require('../../assets/becede1008e8717f7c021f46a285fd58.gif')}
        style={styles.fireworks}
        alt="Fuochi d'artificio"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.victoryButton} onPress={handleNewGame}>
          <Text style={styles.victoryButtonText}>Inizia una Nuova Partita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.victoryButton} onPress={handleRestartGame}>
          <Text style={styles.victoryButtonText}>Riavvia la Partita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}