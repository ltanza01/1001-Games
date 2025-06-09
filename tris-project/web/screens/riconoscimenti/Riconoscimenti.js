import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './RiconoscimentiStyles.js';

const Riconoscimenti = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Riconoscimenti</Text>
    <Text style={styles.text}>
      Questa app è stata ideata, progettata e sviluppata da Tanza®.
      Grazie a tutti coloro che hanno contribuito con idee, feedback e supporto.
    </Text>
    <Text style={styles.trademark}>
      <Text style={styles.trademarkBold}>Tanza®</Text> è un marchio registrato.
    </Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.buttonText}>Torna indietro</Text>
    </TouchableOpacity>
  </View>
);

export default Riconoscimenti;
