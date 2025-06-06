
import React, { useState } from 'react';
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
import styles from './BattleshipStyles.js';   

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
