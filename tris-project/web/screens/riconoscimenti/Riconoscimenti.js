import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Riconoscimenti = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Riconoscimenti</Text>
    <Text style={styles.text}>
      Questa app è stata ideata, progettata e sviluppata da Tanza®.
      Grazie a tutti coloro che hanno contribuito con idee, feedback e supporto.
    </Text>
    <Text style={{bottom:10}}> <Text style={{fontWeight: 'bold'}}> Tanza®</Text> è un marchio registrato.</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.buttonText}>Torna indietro</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0072ff',
    marginBottom: 16,
    letterSpacing: 1,
  },
  text: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#0072ff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default Riconoscimenti;
