import { useState } from 'react';
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
import styles from './BattleshipStyles.js';

/**
 * BattleshipMenuScreen – Documentazione
 *
 * Questo componente React Native rappresenta il menu iniziale della modalità "Battaglia Navale" (Giocatore vs Giocatore).
 * Permette agli utenti di inserire i nomi dei due giocatori e selezionare la dimensione del tabellone tramite un menu a tendina.
 * Dopo la validazione dei dati, avvia la partita navigando verso la schermata di gioco, passando i parametri necessari.
 *
 * ---
 *
 * Stati principali:
 * - player1: Nome del primo giocatore.
 * - player2: Nome del secondo giocatore.
 * - boardSize: Dimensione selezionata per il tabellone di gioco.
 * - sizeOpen, sizeItems: Gestione dello stato del menu a tendina per la selezione della dimensione.
 *
 * Funzioni principali:
 * - handleSubmit(): Valida i dati inseriti e, se corretti, naviga verso la schermata di gioco passando i parametri.
 *
 * UI:
 * - TextInput: Per l’inserimento dei nomi dei giocatori.
 * - DropDownPicker: Per la selezione della dimensione del tabellone.
 * - Button: Per avviare la partita.
 * - Alert: Mostra messaggi di errore se i dati non sono validi.
 *
 * Navigazione:
 * - Utilizza la prop navigation per passare a 'GameBattleship' con i parametri raccolti.
 *
 * Note aggiuntive:
 * - Tutta la logica di stato è gestita tramite React hooks.
 * - Il componente è pensato per l’uso locale su un unico dispositivo.
 *
 * In sintesi:
 * Questo componente gestisce la schermata di configurazione iniziale della modalità Battaglia Navale, raccogliendo i dati dei giocatori e la dimensione del tabellone prima di iniziare la partita.
 */

export default function BattleshipMenuScreen({ navigation }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [boardSize, setBoardSize] = useState(null);

  const [sizeOpen, setSizeOpen] = useState(false);
  const [sizeItems, setSizeItems] = useState([
    { label: '8 × 8 (Compatto)',   value: 8 },
    { label: '10 × 10 (Classico)', value: 10 },
    { label: '12 × 12 (Esteso)',   value: 12 },
  ]);

  const handleSubmit = () => {
    if (player1.trim() === '') {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 1.');
      return;
    }
    if (player2.trim() === '') {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 2.');
      return;
    }
    if (!boardSize) {
      Alert.alert('Errore', 'Per favore, scegli la dimensione del tabellone.');
      return;
    }

    navigation.navigate('GameBattleship', {
      player1,
      player2,
      boardSize,
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
            <Text style={styles.title}>Battaglia Navale</Text>
            <Text style={[styles.subtitle, styles.marginBottom]}>Modalità: Giocatore vs Giocatore</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome Giocatore 1</Text>
              <TextInput
                style={styles.input}
                value={player1}
                onChangeText={setPlayer1}
                placeholder="Nome Giocatore 1"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome Giocatore 2</Text>
              <TextInput
                style={styles.input}
                value={player2}
                onChangeText={setPlayer2}
                placeholder="Nome Giocatore 2"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Dimensione Tabellone</Text>
              <DropDownPicker
                open={sizeOpen}
                value={boardSize}
                items={sizeItems}
                setOpen={setSizeOpen}
                setValue={setBoardSize}
                setItems={setSizeItems}
                placeholder="Scegli la Dimensione"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                zIndex={2000}
                zIndexInverse={1000}
              />
            </View>

            <Button
              title="Inizia la Partita"
              onPress={handleSubmit}
              color="#0072ff"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
