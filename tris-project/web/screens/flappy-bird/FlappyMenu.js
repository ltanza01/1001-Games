import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './FlappyStyles';

const FlappyMenu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.title}>Flappy Bird</Text>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('GameFlappy')}
          >
            <Text style={styles.menuButtonText}>Gioca</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Leaderboard')}
          >
            <Text style={styles.menuButtonText}>Classifica</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FlappyMenu;