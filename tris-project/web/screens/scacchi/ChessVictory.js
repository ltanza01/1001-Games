/**
 * ChessVictory.js
 * -----------------------------------------------------------------------------
 * Schermata di vittoria per il gioco degli scacchi.
 * 
 * Funzionalità:
 * - Mostra il risultato della partita: vittoria per scacco matto o stallo.
 * - Visualizza il nome del vincitore o un messaggio di stallo.
 * - Mostra un'animazione di fuochi d'artificio.
 * - Permette di iniziare una nuova partita o riavviare la partita appena conclusa.
 * 
 * Stato e variabili:
 * - winner: stringa, nome del vincitore o "Stallo".
 * - player1, player2: stringhe, nomi dei giocatori.
 * - mode: modalità di gioco selezionata.
 * - checkmate: booleano, true se la vittoria è per scacco matto, false se stallo.
 * 
 * Funzioni principali:
 * - handleNewGame(): naviga al menu principale degli scacchi.
 * - handleRestartGame(): riavvia la partita con gli stessi giocatori e modalità.
 * 
 * UI:
 * - Messaggio di vittoria o stallo.
 * - Animazione GIF di fuochi d'artificio.
 * - Due pulsanti: "Nuova Partita" e "Riavvia la Partita".
 * 
 * Dipendenze:
 * - React, React Native, ChessStyles.js per gli stili.
 * - L'animazione utilizza una GIF locale.
 * 
 * Personalizzazione:
 * - Puoi cambiare la GIF modificando il path in <Image>.
 * - Gli stili sono definiti in ChessStyles.js.
 * 
 * -----------------------------------------------------------------------------
 */

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