import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MemoryMenuScreen({ navigation }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  const handleSubmit = () => {
    if (player1 === '') {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 1.');
      return;
    }

    if (gameMode === 'player-vs-player' && player2 === '') {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 2.');
      return;
    }

    const player2Name = gameMode === 'player-vs-computer' ? 'Computer' : player2;

    if (gameMode === 'player-vs-computer' && difficulty === null) {
      Alert.alert('Errore', 'Per favore, scegli la difficoltà.');
      return;
    }

    navigation.navigate('GameMemory', { player1, player2: player2Name, mode: gameMode, difficulty });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.menu}>
            <Text style={styles.title}>Gioco del Memory</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Modalità di Gioco</Text>
              <RNPickerSelect
                selectedValue={gameMode}
                style={styles.picker}
                onValueChange={(itemValue) => setGameMode(itemValue)}
                items={[
                  { label: "Giocatore vs Giocatore", value: "player-vs-player" },
                  { label: "Giocatore vs Computer", value: "player-vs-computer" },
                ]}
              />
            </View>
            {gameMode && (
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
                    <RNPickerSelect
                      selectedValue={difficulty}
                      style={styles.picker}
                      onValueChange={(itemValue) => setDifficulty(itemValue)}
                      items={[
                        { label: "Facile", value: "easy" },
                        { label: "Medio", value: "medium" },
                        { label: "Difficile", value: "hard" },
                      ]}
                    />
                  </View>
                )}
                <Button title="Inizia il Gioco" onPress={handleSubmit} color="#0072ff" />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#00c6ff',
    alignItems: 'center',
    paddingVertical: 20,
  },
  menu: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: '90%',
    padding: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  picker: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderRadius: 8,
  },
  wrapper: {
    flex: 1,
  },
});
