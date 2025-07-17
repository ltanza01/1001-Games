import { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './FreccetteStyles';

/**
 * FreccetteGameScreen – Documentazione
 *
 * Questo componente gestisce la partita vera e propria delle freccette.
 * Supporta diversi tipi di gioco (501, 301, Cricket) e permette di:
 * - Tracciare i punteggi dei giocatori
 * - Gestire i turni
 * - Calcolare i punteggi per ogni lancio (3 dardi per turno)
 * - Validare le mosse (es. non andare sotto lo 0 nel 501/301)
 * - Determinare il vincitore
 * - Annullare l'ultimo lancio
 * 
 * Per il gioco 501/301: i giocatori iniziano con quel punteggio e devono arrivare esattamente a 0
 * Per Cricket: si gioca sui numeri 20, 19, 18, 17, 16, 15 e bull
 */

export default function FreccetteGameScreen({ route, navigation }) {
  const { players, numberOfPlayers, gameType, setsToWin } = route.params;

  // Stati del gioco
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerScores, setPlayerScores] = useState(
    players.map(() => getInitialScore(gameType))
  );
  const [playerSets, setPlayerSets] = useState(
    players.map(() => 0)
  );
  const [currentDart, setCurrentDart] = useState(0);
  const [currentThrow, setCurrentThrow] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [waitingForScore, setWaitingForScore] = useState(false);

  // Effetto per gestire la navigazione automatica alla vittoria
  useEffect(() => {
    if (gameOver) {
      const winnerIndex = playerSets.findIndex(sets => sets >= setsToWin);
      const finalWinner = players[winnerIndex];
      
      // Naviga alla schermata di vittoria
      navigation.navigate('VictoryFreccette', {
        winner: finalWinner,
        players,
        playerSets,
        gameType,
        gameStats: {
          duration: 'N/A',
          totalThrows: gameHistory.length,
          averageScore: gameHistory.length > 0 ? 
            (gameHistory.reduce((sum, h) => sum + h.totalScore, 0) / gameHistory.length).toFixed(1) : 
            'N/A'
        }
      });
    }
  }, [gameOver, playerSets, setsToWin, navigation, players, gameType, gameHistory]);

  // Funzione per renderizzare ogni giocatore
  const renderPlayer = ({ item: player, index }) => (
    <View style={[styles.playerCard, currentPlayer === index && styles.activePlayer]}>
      <Text style={styles.playerName}>{player}</Text>
      <Text style={styles.playerScore}>
        {typeof playerScores[index] === 'number' ? playerScores[index] : 'Cricket'}
      </Text>
      <Text style={styles.playerRemainingLabel}>
        {currentPlayer === index ? 'Turno corrente' : 'In attesa'}
      </Text>
    </View>
  );

  // Funzione per ottenere il punteggio iniziale basato sul tipo di gioco
  function getInitialScore(gameType) {
    switch (gameType) {
      case '501':
        return 501;
      case '301':
        return 301;
      case 'cricket':
        return { 20: 0, 19: 0, 18: 0, 17: 0, 16: 0, 15: 0, bull: 0 };
      default:
        return 501;
    }
  }

  // Punteggi disponibili per le freccette
  const dartScores = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25
  ];

  // Funzione per gestire il punteggio di un dardo
  const handleDartScore = (score, customMultiplier = null) => {
    if (currentDart >= 3) return;

    const finalMultiplier = customMultiplier || multiplier;
    const dartScore = score * finalMultiplier;
    const newThrow = [...currentThrow, dartScore];
    setCurrentThrow(newThrow);
    setCurrentDart(currentDart + 1);

    // Reset multiplier e waiting state
    setMultiplier(1);
    setWaitingForScore(false);

    // Se è il terzo dardo, applica il punteggio totale
    if (currentDart === 2) {
      applyThrowScore(newThrow);
    }
  };

  // Funzione per impostare il moltiplicatore
  const setMultiplierAndWait = (mult) => {
    setMultiplier(mult);
    setWaitingForScore(true);
  };

  // Applica il punteggio del lancio completo
  const applyThrowScore = (throwScores) => {
    const totalScore = throwScores.reduce((sum, score) => sum + score, 0);
    
    if (gameType === '501' || gameType === '301') {
      const newScore = playerScores[currentPlayer] - totalScore;
      if (newScore < 0) {
        Alert.alert('Bust!', 'Punteggio non valido. Il punteggio non può andare sotto lo 0.');
        nextPlayer();
        return;
      }
      
      // Aggiorna il punteggio del giocatore corrente
      setPlayerScores(prev => {
        const newScores = [...prev];
        newScores[currentPlayer] = newScore;
        return newScores;
      });
      
      if (newScore === 0) {
        endGame(currentPlayer);
        return;
      }
    }

    // Salva nella cronologia
    setGameHistory(prev => [...prev, {
      player: currentPlayer,
      throw: throwScores,
      totalScore,
      timestamp: new Date().toISOString()
    }]);

    nextPlayer();
  };

  // Passa al giocatore successivo
  const nextPlayer = () => {
    setCurrentPlayer((currentPlayer + 1) % numberOfPlayers);
    setCurrentDart(0);
    setCurrentThrow([]);
    setMultiplier(1);
    setWaitingForScore(false);
  };

  // Termina la partita
  const endGame = (winnerIndex) => {
    // Aggiorna i set vinti
    setPlayerSets(prev => {
      const newSets = [...prev];
      newSets[winnerIndex] += 1;
      
      if (newSets[winnerIndex] >= setsToWin) {
        setGameOver(true);
        return newSets;
      }
      
      // Ricomincia il set
      setTimeout(() => {
        setPlayerScores(players.map(() => getInitialScore(gameType)));
        setCurrentPlayer(0);
        setCurrentDart(0);
        setCurrentThrow([]);
      }, 2000);
      
      return newSets;
    });
  };

  // Annulla l'ultimo lancio
  const undoLastThrow = () => {
    if (gameHistory.length === 0) return;

    Alert.alert(
      'Conferma Annullamento',
      'Continuando resetterai la partita corrente. Vuoi davvero annullare l\'ultimo lancio?',
      [
        {
          text: 'Annulla',
          style: 'cancel',
        },
        {
          text: 'Conferma',
          style: 'destructive',
          onPress: () => {
            const lastThrow = gameHistory[gameHistory.length - 1];
            setGameHistory(prev => prev.slice(0, -1));

            // Ripristina il punteggio
            if (gameType === '501' || gameType === '301') {
              setPlayerScores(prev => {
                const newScores = [...prev];
                newScores[lastThrow.player] += lastThrow.totalScore;
                return newScores;
              });
            }

            // Ripristina il giocatore
            setCurrentPlayer(lastThrow.player);
            setCurrentDart(0);
            setCurrentThrow([]);
            setMultiplier(1);
            setWaitingForScore(false);
          },
        },
      ]
    );
  };

  // Salta il turno
  const skipTurn = () => {
    nextPlayer();
  };

  return (
    <SafeAreaView style={styles.scoreContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.scoreTitle}>
          {gameType} - Set: {playerSets.join(' - ')}
        </Text>

        {/* Punteggi dei giocatori */}
        <FlatList
          data={players}
          renderItem={renderPlayer}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.playersContainer}
        />

        {/* Lancio corrente */}
        <View style={styles.currentThrowContainer}>
          <Text style={styles.currentThrowTitle}>
            Dardo {currentDart + 1} di 3
            {waitingForScore && ` (${multiplier}x)`}
          </Text>
          <Text style={styles.currentThrowScore}>
            Punteggio: {currentThrow.reduce((sum, score) => sum + score, 0)}
          </Text>
          <View style={styles.dartsList}>
            {currentThrow.map((score, index) => (
              <View key={index} style={styles.dartScore}>
                <Text style={styles.dartScoreText}>{score}</Text>
              </View>
            ))}
            {Array.from({ length: 3 - currentThrow.length }, (_, index) => (
              <View key={`empty-${index}`} style={styles.dartScore}>
                <Text style={styles.dartScoreText}>-</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tabellone dei punteggi */}
        <View style={styles.dartBoard}>
          <Text style={styles.dartBoardTitle}>Seleziona Punteggio</Text>
          
          {/* Istruzioni per l'uso */}
          {waitingForScore && (
            <Text style={styles.instructionText}>
              Ora seleziona un numero per il {multiplier === 2 ? 'doppio' : 'triplo'}
            </Text>
          )}
          
          <View style={styles.scoreButtonsContainer}>
            {dartScores.map((score) => (
              <TouchableOpacity
                key={score}
                style={styles.scoreButton}
                onPress={() => handleDartScore(score)}
                disabled={currentDart >= 3}
              >
                <Text style={styles.scoreButtonText}>{score}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Pulsanti moltiplicatori */}
          <View style={styles.scoreButtonsContainer}>
            <TouchableOpacity
              style={[styles.scoreButton, styles.doubleButton, waitingForScore && multiplier === 2 && styles.activeMultiplier]}
              onPress={() => setMultiplierAndWait(2)}
              disabled={currentDart >= 3}
            >
              <Text style={styles.scoreButtonText}>x2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.scoreButton, styles.tripleButton, waitingForScore && multiplier === 3 && styles.activeMultiplier]}
              onPress={() => setMultiplierAndWait(3)}
              disabled={currentDart >= 3}
            >
              <Text style={styles.scoreButtonText}>x3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.scoreButton, styles.specialButton]}
              onPress={() => handleDartScore(0)}
              disabled={currentDart >= 3}
            >
              <Text style={styles.scoreButtonText}>Miss</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pulsanti di azione */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.undoButton]}
            onPress={undoLastThrow}
            disabled={gameHistory.length === 0}
          >
            <Text style={styles.actionButtonText}>Annulla</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.nextPlayerButton]}
            onPress={skipTurn}
          >
            <Text style={styles.actionButtonText}>Salta Turno</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
