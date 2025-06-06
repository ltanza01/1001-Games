import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './MemoryStyles';

export default function MemoryMenuScreen({ navigation }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  const [modeOpen, setModeOpen] = useState(false);
  const [modeItems, setModeItems] = useState([
    { label: 'Giocatore vs Giocatore', value: 'player-vs-player' },
    { label: 'Giocatore vs Computer', value: 'player-vs-computer' },
  ]);

  const [diffOpen, setDiffOpen] = useState(false);
  const [diffItems, setDiffItems] = useState([
    { label: 'Facile', value: 'easy' },
    { label: 'Medio', value: 'medium' },
    { label: 'Difficile', value: 'hard' },
  ]);

  const onModeOpen = useCallback(() => setDiffOpen(false), []);
  const onDiffOpen  = useCallback(() => setModeOpen(false), []);

  const handleSubmit = () => {
    if (player1.trim() === '') {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 1.');
      return;
    }
    if (!gameMode) {
      Alert.alert('Errore', 'Per favore, scegli la modalità di gioco.');
      return;
    }
    if (gameMode === 'player-vs-player' && player2.trim() === '') {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 2.');
      return;
    }
    if (gameMode === 'player-vs-computer' && !difficulty) {
      Alert.alert('Errore', 'Per favore, scegli la difficoltà.');
      return;
    }

    const player2Name =
      gameMode === 'player-vs-computer' ? 'Computer' : player2;

    navigation.navigate('GameMemory', {
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
            <Text style={styles.title}>Gioco del Memory</Text>

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

            {gameMode && (
              <>
                {/* Giocatore 1 */}
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
                      open={diffOpen}
                      value={difficulty}
                      items={diffItems}
                      setOpen={setDiffOpen}
                      setValue={setDifficulty}
                      setItems={setDiffItems}
                      placeholder="Scegli la Difficoltà"
                      style={styles.dropdown}
                      dropDownContainerStyle={styles.dropdownContainer}
                      zIndex={2000}
                      zIndexInverse={1000}
                      onOpen={onDiffOpen}
                    />
                  </View>
                )}

                <Button
                  title="Inizia il Gioco"
                  onPress={handleSubmit}
                  color="#0072ff"
                />
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
