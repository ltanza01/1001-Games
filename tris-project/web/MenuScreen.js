import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';

export default function MenuScreen({ navigation }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameMode, setGameMode] = useState('scegli-la-modalita');
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    console.log(gameMode);
    if(gameMode === undefined) {
      alert('Per favore, scegli la modalità di gioco.');
      return;
    }
  
}, [gameMode]);

  const handleSubmit = () => {
    if (player1 === '' && gameMode) {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 1.');
      return;
    }

    if (player2 === '' && gameMode === 'player-vs-player') {
      Alert.alert('Errore', 'Per favore, inserisci il nome del Giocatore 2.');
      return;
    }

    const player2Name = gameMode === 'player-vs-computer' ? 'Computer' : player2;

    if (gameMode === 'player-vs-computer' && difficulty === 'scegli-la-difficolta') {
      Alert.alert('Errore', 'Per favore, scegli la difficoltà.');
      return;
    }
    
    navigation.navigate('Game', { player1, player2: player2Name, mode: gameMode, difficulty });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.menu}>
            <Text style={styles.title}>Gioco del Tris</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Modalità di Gioco</Text>
              <RNPickerSelect
                selectedValue={gameMode}
                style={styles.picker}
                placeholder={{ label: 'Scegli la Modalità', value: 'scegli-la-modalita' }}
                onValueChange={(itemValue) => setGameMode(itemValue)}
                items={[
                  {label:"Giocatore vs Giocatore", value:"player-vs-player"  },
                  {label:"Giocatore vs Computer", value:"player-vs-computer"  },
                ]}
              >
              </RNPickerSelect>
            </View>
            { gameMode !== 'scegli-la-modalita' && (
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
                      placeholder={{ label: 'Scegli la Difficoltà', value: 'scegli-la-difficolta' }}

                      items={[
                        {label:"Facile", value:"easy"  },
                        {label:"Medio", value:"medium"  },
                        {label:"Difficile", value:"hard"  },
                      ]}
                    >
                                          </RNPickerSelect>
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
    backgroundColor: 'linear-gradient(to right, #00c6ff, #0072ff)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  menu: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
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
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  picker: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
