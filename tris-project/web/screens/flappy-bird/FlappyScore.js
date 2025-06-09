import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './FlappyStyles.js';

const scores = [
  { id: '1', name: 'Lorenzo', score: 120 },
  { id: '2', name: 'Giulia', score: 95 },
  { id: '3', name: 'Marco', score: 80 },
  { id: '4', name: 'Sara', score: 60 },
  { id: '5', name: 'Anna', score: 45 },
];

const sortedScores = [...scores].sort((a, b) => b.score - a.score);

const FlappyScore = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.scoreTitle}>Classifica Flappy Bird</Text>
      <FlatList
        data={sortedScores}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.position}>{index + 1}.</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {
            paddingVertical: 14,
            paddingHorizontal: 40,
            borderRadius: 25,
            marginTop: 10,
            marginBottom: 100,
          },
        ]}
        onPress={() => navigation.navigate('MenuFlappy')}
      >
        <Text style={[styles.buttonText, { fontSize: 20 }]}>Torna al Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlappyScore;