import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../tris/TrisStyles';

const FlappyMenu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.title}>Flappy Bird</Text>
          <Text
            style={{
              color: '#b71c1c',
              backgroundColor: '#fff3cd',
              borderRadius: 8,
              padding: 10,
              marginBottom: 20,
              fontSize: 15,
              textAlign: 'center',
              borderWidth: 1,
              borderColor: '#ffeeba',
            }}
          >
            Attenzione: il gioco è ancora in fase di sviluppo e potrebbe non funzionare come dovuto.
            Tutte le funzionalità del gioco non sono ancora state realizzate.
          </Text>
          <View style={{ width: '100%' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('GameFlappy')}
            >
              <Text style={styles.buttonText}>Gioca</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Leaderboard')}
            >
              <Text style={styles.buttonText}>Classifica</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FlappyMenu;