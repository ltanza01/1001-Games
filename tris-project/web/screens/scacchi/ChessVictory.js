import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './ChessStyles.js';

export default function ChessVictory({ route, navigation }) {
  const { winner, player1, player2, mode, checkmate } = route.params || {};

  const handleNewGame = () => {
    navigation.navigate('ChessMenu');
  };

  const handleRestartGame = () => {
    navigation.navigate('GameChess', {
      player1,
      player2,
      mode,
      restart: true
    });
  };

  return (
    <View style={styles.victoryContainer}>
      <Text style={styles.victoryMessage}>
        {winner === "Stallo"
          ? "Stallo! Nessun vincitore."
          : checkmate
            ? `${winner} ha vinto per Scacco Matto!`
            : `${winner} ha vinto!`}
      </Text>
      <Image
        source={require('../../assets/becede1008e8717f7c021f46a285fd58.gif')}
        style={styles.fireworks}
        alt="Fuochi d'artificio"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.victoryButton} onPress={handleNewGame}>
          <Text style={styles.victoryButtonText}>Nuova Partita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.victoryButton} onPress={handleRestartGame}>
          <Text style={styles.victoryButtonText}>Riavvia la Partita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}