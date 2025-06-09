import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import styles from './RiconoscimentiStyles.js';

const Riconoscimenti = ({ navigation }) => {
  const [clickCount, setClickCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTanzaPress = () => {
    if (clickCount + 1 === 10) {
      setModalVisible(true);
      setClickCount(0);
    } else {
      setClickCount(clickCount + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Image
              source={require('../../assets/Tanza.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Chiudi</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Riconoscimenti</Text>
      <Text style={styles.text}>
        Questa app è stata ideata, progettata e sviluppata da Tanza®.
        Grazie a tutti coloro che hanno contribuito con idee, feedback e supporto.
      </Text>
      <Text style={styles.trademark}>
        <Text
          style={styles.trademarkBold}
          onPress={handleTanzaPress}
        >
          Tanza®
        </Text>{' '}
        è un marchio registrato.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Torna indietro</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Riconoscimenti;
