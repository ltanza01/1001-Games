/**
 * ChessMenu.js
 * -----------------------------------------------------------------------------
 * Schermata di selezione e configurazione partita per il gioco degli scacchi.
 * 
 * Funzionalità:
 * - Permette di scegliere la modalità di gioco: Giocatore vs Giocatore o Giocatore vs Computer.
 * - Permette di inserire i nomi dei giocatori.
 * - Se si sceglie la modalità contro il computer, permette di selezionare la difficoltà.
 * - Valida i dati inseriti e mostra messaggi di errore se mancano informazioni obbligatorie.
 * - Avvia la partita passando i parametri necessari alla schermata di gioco.
 * 
 * Stato e variabili:
 * - player1: stringa, nome del primo giocatore.
 * - player2: stringa, nome del secondo giocatore (o "Computer" se contro CPU).
 * - gameMode: stringa, modalità selezionata ('player-vs-player' o 'player-vs-computer').
 * - difficulty: stringa, livello di difficoltà selezionato per la CPU.
 * - modeOpen/difficultyOpen: booleani, gestiscono l'apertura dei menu a tendina.
 * - modeItems/difficultyItems: array di oggetti, opzioni per i menu a tendina.
 * 
 * Funzioni principali:
 * - handleSubmit(): valida i dati e naviga alla schermata di gioco passando i parametri.
 * - onModeOpen/onDifficultyOpen(): assicurano che solo un menu a tendina sia aperto alla volta.
 * 
 * UI:
 * - Utilizza DropDownPicker per la selezione delle modalità e della difficoltà.
 * - Utilizza TextInput per l'inserimento dei nomi.
 * - Il pulsante "Inizia il Gioco" è abilitato solo dopo aver inserito tutte le informazioni richieste.
 * 
 * Navigazione:
 * - Alla conferma, naviga verso la schermata 'GameScacchi' passando player1, player2, mode e difficulty.
 * 
 * Dipendenze:
 * - React, React Native, DropDownPicker, react-native-safe-area-context, ChessStyles.js per gli stili.
 * 
 * Personalizzazione:
 * - Puoi modificare le opzioni delle modalità e delle difficoltà cambiando modeItems e difficultyItems.
 * - Gli stili sono definiti in ChessStyles.js.
 * 
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from 'react';
import {
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ChessStyles';

export default function ChessMenu({ navigation }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const [modeOpen, setModeOpen] = useState(false);
  const [modeItems, setModeItems] = useState([
    { label: 'Giocatore vs Giocatore', value: 'player-vs-player' },
    { label: 'Giocatore vs Computer', value: 'player-vs-computer' },
  ]);

  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const [difficultyItems, setDifficultyItems] = useState([
    { label: 'Facile', value: 'easy' },
    { label: 'Medio', value: 'medium' },
    { label: 'Difficile', value: 'hard' },
  ]);

  // Chiudi un dropdown se l'altro si apre
  const onModeOpen = useCallback(() => setDifficultyOpen(false), []);
  const onDifficultyOpen = useCallback(() => setModeOpen(false), []);

  const handleSubmit = () => {
    if (player1.trim() === '') {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 1.');
      return;
    }
    if (gameMode === '') {
      Alert.alert('Errore', 'Per favore, scegli la modalità di gioco.');
      return;
    }
    if (gameMode === 'player-vs-player' && player2.trim() === '') {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 2.');
      return;
    }
    if (gameMode === 'player-vs-computer' && difficulty === '') {
      Alert.alert('Errore', 'Per favore, scegli la difficoltà.');
      return;
    }

    const player2Name = gameMode === 'player-vs-computer' ? 'Computer' : player2;
    navigation.navigate('GameScacchi', {
      player1,
      player2: player2Name,
      mode: gameMode,
      difficulty,
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View style={styles.container}>
          <View style={styles.menu}>
            <Text style={styles.title}>Scacchi</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Modalità di Gioco</Text>
              <DropDownPicker
                open={modeOpen}
                value={gameMode}
                items={modeItems}
                setOpen={setModeOpen}
                setValue={setGameMode}
                setItems={setModeItems}
                placeholder="Scegli la Modalità"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                zIndex={3000}
                zIndexInverse={1000}
                onOpen={onModeOpen}
              />
            </View>

            {gameMode !== '' && (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Nome Giocatore 1</Text>
                  <TextInput
                    style={styles.input}
                    value={player1}
                    onChangeText={setPlayer1}
                    placeholder="Nome Giocatore 1"
                  />
                </View>

                {gameMode === 'player-vs-player' && (
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome Giocatore 2</Text>
                    <TextInput
                      style={styles.input}
                      value={player2}
                      onChangeText={setPlayer2}
                      placeholder="Nome Giocatore 2"
                    />
                  </View>
                )}

                {gameMode === 'player-vs-computer' && (
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Difficoltà</Text>
                    <DropDownPicker
                      open={difficultyOpen}
                      value={difficulty}
                      items={difficultyItems}
                      setOpen={setDifficultyOpen}
                      setValue={setDifficulty}
                      setItems={setDifficultyItems}
                      placeholder="Scegli la Difficoltà"
                      style={styles.dropdown}
                      dropDownContainerStyle={styles.dropdownContainer}
                      zIndex={2000}
                      zIndexInverse={1000}
                      onOpen={onDifficultyOpen}
                    />
                  </View>
                )}

                <Button title="Inizia il Gioco" onPress={handleSubmit} color="#1976d2" />
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}