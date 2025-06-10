import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './BattleshipStyles.js';

/**
 * BattleshipVictory – Documentazione
 *
 * Questo componente React Native mostra la schermata di vittoria al termine di una partita di Battaglia Navale.
 * Visualizza il nome del vincitore, un'animazione celebrativa e offre due opzioni:
 * - Iniziare una nuova partita (torna al menu principale della modalità Battaglia Navale)
 * - Riavviare la partita con gli stessi giocatori e dimensioni di tabellone
 *
 * ---
 *
 * Props principali:
 * - route.params: Oggetto che contiene winner (nome vincitore), player1, player2, boardSize.
 * - navigation: Oggetto di navigazione per cambiare schermata.
 *
 * Funzioni principali:
 * - handleNewGame(): Naviga al menu principale della modalità Battaglia Navale.
 * - handleRestartGame(): Riavvia la partita con gli stessi parametri.
 *
 * UI:
 * - Messaggio di vittoria con il nome del vincitore.
 * - Animazione di fuochi d'artificio.
 * - Due pulsanti: "Inizia una Nuova Partita" e "Riavvia la Partita".
 *
 * Note aggiuntive:
 * - Il componente utilizza gli stili definiti in BattleshipStyles.js.
 * - Pensato per l'uso locale su un unico dispositivo.
 *
 * In sintesi:
 * Gestisce la schermata finale della partita, permettendo di ricominciare o tornare al menu.
 */

export default function BattleshipVictory({ route, navigation }) {
  const { winner, player1, player2, boardSize } = route.params;

  const handleNewGame = () => {
    navigation.navigate('MenuBattleship');
  };

  const handleRestartGame = () => {
    navigation.navigate('GameBattleship', {
      player1,
      player2,
      boardSize,
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
