import { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './FreccetteStyles';

/**
 * FreccetteMenuScreen – Documentazione
 *
 * Questo componente React Native rappresenta il menu iniziale per la modalità "Freccette".
 * Permette di configurare la partita scegliendo:
 * - Il tipo di gioco (501, 301, Cricket)
 * - Il numero di giocatori (1-10)
 * - I nomi dei giocatori
 * - Il numero di set da vincere
 * 
 * Dopo la validazione dei dati, avvia la partita navigando verso la schermata di gioco.
 *
 * Stati principali:
 * - players: Array con i nomi dei giocatori
 * - numberOfPlayers: Numero di giocatori selezionato
 * - gameType: Tipo di gioco (501, 301, Cricket)
 * - setsToWin: Numero di set per vincere
 * - Vari stati per i dropdown
 */

export default function FreccetteMenuScreen({ navigation }) {
  const [numberOfPlayers, setNumberOfPlayers] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gameType, setGameType] = useState(null);
  const [setsToWin, setSetsToWin] = useState(null);

  // Stati per i dropdown
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeItems, setTypeItems] = useState([
    { label: '501', value: '501' },
    { label: '301', value: '301' },
    { label: 'Cricket', value: 'cricket' },
  ]);

  const [playersOpen, setPlayersOpen] = useState(false);
  const [playersItems, setPlayersItems] = useState([
    { label: '1 Giocatore', value: 1 },
    { label: '2 Giocatori', value: 2 },
    { label: '3 Giocatori', value: 3 },
    { label: '4 Giocatori', value: 4 },
    { label: '5 Giocatori', value: 5 },
    { label: '6 Giocatori', value: 6 },
    { label: '7 Giocatori', value: 7 },
    { label: '8 Giocatori', value: 8 },
    { label: '9 Giocatori', value: 9 },
    { label: '10 Giocatori', value: 10 },
  ]);

  const [setsOpen, setSetsOpen] = useState(false);
  const [setsItems, setSetsItems] = useState([
    { label: 'Prima a 1', value: 1 },
    { label: 'Prima a 3', value: 3 },
    { label: 'Prima a 5', value: 5 },
  ]);

  // Callbacks per gestire l'apertura dei dropdown
  const onTypeOpen = useCallback(() => {
    setPlayersOpen(false);
    setSetsOpen(false);
  }, []);

  const onPlayersOpen = useCallback(() => {
    setTypeOpen(false);
    setSetsOpen(false);
  }, []);

  const onSetsOpen = useCallback(() => {
    setTypeOpen(false);
    setPlayersOpen(false);
  }, []);

  // Effetto per aggiornare l'array dei giocatori quando cambia il numero
  useEffect(() => {
    if (numberOfPlayers && players.length !== numberOfPlayers) {
      setPlayers(prev => {
        const newPlayers = Array.from({ length: numberOfPlayers }, (_, index) => 
          prev[index] || ''
        );
        return newPlayers;
      });
    }
  }, [numberOfPlayers, players.length]);

  // Funzione per aggiornare il nome di un giocatore specifico
  const updatePlayerName = (index, name) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const handleSubmit = () => {
    if (!gameType) {
      Alert.alert('Errore', 'Per favore, scegli il tipo di gioco.');
      return;
    }
    if (!numberOfPlayers) {
      Alert.alert('Errore', 'Per favore, seleziona il numero di giocatori.');
      return;
    }
    
    // Controlla che tutti i giocatori abbiano un nome
    const emptyPlayers = players.filter((name, index) => 
      index < numberOfPlayers && name.trim() === ''
    );
    if (emptyPlayers.length > 0) {
      Alert.alert('Errore', 'Per favore, inserisci il nome di tutti i giocatori.');
      return;
    }
    
    if (!setsToWin) {
      Alert.alert('Errore', 'Per favore, scegli il numero di set.');
      return;
    }

    // Prendi solo i nomi dei giocatori effettivi
    const activePlayers = players.slice(0, numberOfPlayers);

    navigation.navigate('GameFreccette', {
      players: activePlayers,
      numberOfPlayers,
      gameType,
      setsToWin,
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.menu}>
              <Text style={styles.title}>Freccette</Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Tipo di Gioco</Text>
                <DropDownPicker
                  open={typeOpen}
                  value={gameType}
                  items={typeItems}
                  setOpen={setTypeOpen}
                  setValue={setGameType}
                  setItems={setTypeItems}
                  placeholder="Scegli il Tipo"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  zIndex={4000}
                  zIndexInverse={1000}
                  onOpen={onTypeOpen}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Numero di Giocatori</Text>
                <DropDownPicker
                  open={playersOpen}
                  value={numberOfPlayers}
                  items={playersItems}
                  setOpen={setPlayersOpen}
                  setValue={setNumberOfPlayers}
                  setItems={setPlayersItems}
                  placeholder="Scegli il Numero"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  zIndex={3000}
                  zIndexInverse={2000}
                  onOpen={onPlayersOpen}
                />
              </View>

              {gameType && numberOfPlayers && (
                <>
                  {/* Input per i nomi dei giocatori */}
                  {Array.from({ length: numberOfPlayers }, (_, index) => (
                    <View key={index} style={styles.formGroup}>
                      <Text style={styles.label}>Nome Giocatore {index + 1}</Text>
                      <TextInput
                        style={styles.input}
                        value={players[index] || ''}
                        onChangeText={(text) => updatePlayerName(index, text)}
                        placeholder={`Nome Giocatore ${index + 1}`}
                      />
                    </View>
                  ))}

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Set per Vincere</Text>
                    <DropDownPicker
                      open={setsOpen}
                      value={setsToWin}
                      items={setsItems}
                      setOpen={setSetsOpen}
                      setValue={setSetsToWin}
                      setItems={setSetsItems}
                      placeholder="Scegli i Set"
                      style={styles.dropdown}
                      dropDownContainerStyle={styles.dropdownContainer}
                      zIndex={1000}
                      zIndexInverse={4000}
                      onOpen={onSetsOpen}
                    />
                  </View>

                  <Button
                    title="Inizia la Partita"
                    onPress={handleSubmit}
                    color="#E74C3C"
                  />
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}