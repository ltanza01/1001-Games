import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TestPicker() {
  const [mode, setMode] = useState('scegli-la-modalita');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modalità di</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={mode}
          onValueChange={setMode}
          mode="dialog"
          style={{ flex: 1 }}
        >
          <Picker.Item label="Scegli la Modalità" value="scegli-la-modalita" enabled={false} />
          <Picker.Item label="Giocatore vs Giocatore" value="player-vs-player" />
          <Picker.Item label="Giocatore vs Computer" value="player-vs-computer" />
        </Picker>
      </View>
      <Text>Selezionato: {mode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
  },
  pickerWrapper: {
    height: 150,
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
});
