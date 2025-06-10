import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../tris/TrisStyles';

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
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.title}>Classifica Flappy Bird</Text>
          <FlatList
            data={sortedScores}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: '#1976d2',
                  borderRadius: 16,
                  paddingVertical: 14,
                  paddingHorizontal: 24,
                  marginVertical: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 260,
                  alignSelf: 'center',
                  elevation: 2,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, width: 30 }}>{index + 1}.</Text>
                <Text style={{ color: '#fff', fontSize: 18, flex: 1, marginLeft: 10 }}>{item.name}</Text>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, width: 50, textAlign: 'right' }}>{item.score}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MenuFlappy')}
          >
            <Text style={styles.buttonText}>Torna al Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FlappyScore;