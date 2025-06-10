import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../tris/TrisStyles';

const scores = [
  { id: '1', name: 'Tanza', score: 120 },
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
                  backgroundColor: index === 0 ? '#FFD700' : '#1976d2', // oro per il primo
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
                <Text style={{
                  color: index === 0 ? '#b8860b' : '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                  width: 30
                }}>
                  {index + 1}.
                </Text>
                <Text style={{
                  color: index === 0 ? '#b8860b' : '#fff',
                  fontSize: 18,
                  flex: 1,
                  marginLeft: 10,
                  fontWeight: index === 0 ? 'bold' : 'normal'
                }}>
                  {index === 0 ? '👑 ' : ''}
                  {item.name}
                </Text>
                <Text style={{
                  color: index === 0 ? '#b8860b' : '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                  width: 50,
                  textAlign: 'right'
                }}>
                  {item.score}
                </Text>
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