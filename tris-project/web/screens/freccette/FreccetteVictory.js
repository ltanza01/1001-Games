import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './FreccetteStyles';

/**
 * FreccetteVictoryScreen – Documentazione
 *
 * Questo componente mostra la schermata di vittoria per il gioco delle freccette.
 * Visualizza il vincitore, i punteggi finali e fornisce opzioni per:
 * - Tornare al menu principale
 * - Iniziare una nuova partita con le stesse impostazioni
 * - Visualizzare statistiche della partita
 */

export default function FreccetteVictoryScreen({ route, navigation }) {
  const { winner, players, playerSets, gameType, gameStats } = route.params;

  const handleNewGame = () => {
    // Torna al menu per una nuova configurazione
    navigation.navigate('MenuFreccette');
  };

  const handleRematch = () => {
    // Ricomincia con le stesse impostazioni
    navigation.navigate('GameFreccette', route.params);
  };

  const handleBackToMenu = () => {
    // Torna al menu principale
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.victoryContainer}>
      <View style={styles.victoryContent}>
        {/* Animazione di vittoria */}
        <Image
          source={require('../../assets/becede1008e8717f7c021f46a285fd58.gif')}
          style={styles.fireworks}
          resizeMode="contain"
        />

        {/* Messaggio di vittoria */}
        <Text style={styles.victoryMessage}>
          🎯 {winner} ha vinto! 🎯
        </Text>

        {/* Punteggi finali */}
        <View style={styles.finalScoresContainer}>
          <Text style={styles.finalScoresTitle}>
            Punteggi Finali - {gameType}
          </Text>
          <View style={styles.finalScoresColumn}>
            {players.map((player, index) => (
              <Text key={index} style={styles.finalScoreText}>
                {player}: {playerSets[index]} set
              </Text>
            ))}
          </View>
        </View>

        {/* Statistiche di gioco */}
        {gameStats && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Statistiche Partita</Text>
            <Text style={styles.statsText}>
              Durata: {gameStats.duration || 'N/A'}
            </Text>
            <Text style={styles.statsText}>
              Lanci totali: {gameStats.totalThrows || 'N/A'}
            </Text>
            <Text style={styles.statsText}>
              Media punteggio: {gameStats.averageScore || 'N/A'}
            </Text>
          </View>
        )}

        {/* Pulsanti di azione */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.victoryButton, styles.primaryButton]}
            onPress={handleNewGame}
          >
            <Text style={styles.victoryButtonText}>Nuova Partita</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.victoryButton, styles.secondaryButton]}
            onPress={handleRematch}
          >
            <Text style={styles.victoryButtonText}>Rivincita</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.victoryButton, styles.backButton]}
            onPress={handleBackToMenu}
          >
            <Text style={styles.victoryButtonText}>Menu Principale</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
