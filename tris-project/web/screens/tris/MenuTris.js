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
import styles from './TrisStyles';

/**
 * MenuTris – Documentazione
 *
 * Questo componente React Native rappresenta il menu iniziale per la modalità "Tris".
 * Permette di configurare la partita scegliendo la modalità di gioco (Giocatore vs Giocatore o Giocatore vs Computer),
 * inserendo i nomi dei giocatori e selezionando la difficoltà contro il computer.
 * Dopo la validazione dei dati, avvia la partita navigando verso la schermata di gioco, passando i parametri necessari.
 *
 * ---
 *
 * Stati principali:
 * - player1: Nome del primo giocatore.
 * - player2: Nome del secondo giocatore (o "Computer" se contro CPU).
 * - gameMode: Modalità di gioco selezionata.
 * - difficulty: Difficoltà selezionata per la CPU.
 * - modeOpen, modeItems: Stato e opzioni del menu a tendina per la modalità.
 * - difficultyOpen, difficultyItems: Stato e opzioni del menu a tendina per la difficoltà.
 *
 * Funzioni principali:
 * - handleSubmit(): Valida i dati inseriti e, se corretti, naviga verso la schermata di gioco passando i parametri.
 *
 * UI:
 * - DropDownPicker: Per la selezione della modalità e della difficoltà.
 * - TextInput: Per l’inserimento dei nomi dei giocatori.
 * - Button: Per avviare la partita.
 * - Alert: Mostra messaggi di errore se i dati non sono validi.
 *
 * Navigazione:
 * - Utilizza la prop navigation per passare a 'GameTris' con i parametri raccolti.
 *
 * Note aggiuntive:
 * - Tutta la logica di stato è gestita tramite React hooks.
 * - Il componente è pensato per l’uso locale su un unico dispositivo.
 *
 * In sintesi:
 * Gestisce la schermata di configurazione iniziale della modalità Tris, raccogliendo i dati dei giocatori e le impostazioni prima di iniziare la partita.
 */

export default function MenuTris({ navigation }) {
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

  // Chiudi dropdown se l'altro si apre
  const onModeOpen = useCallback(() => {
    setDifficultyOpen(false);
  }, []);

  const onDifficultyOpen = useCallback(() => {
    setModeOpen(false);
  }, []);

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
    navigation.navigate('GameTris', {
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
            <Text style={styles.title}>Gioco del Tris</Text>

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

                <Button title="Inizia il Gioco" onPress={handleSubmit} color="#0072ff" />
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
