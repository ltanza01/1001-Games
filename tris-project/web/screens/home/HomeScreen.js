import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from './HomeStyles.js';
const games = [
  {
    id: '1',
    title: 'Gioco del Tris',
    description: 'Un classico gioco del tris per 1/2 giocatori.',
    minPlayers: 1,
    maxPlayers: 2,
    route :'MenuTris',
    image: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Tictactoe.png?raw=true', 
  },
  {
    id: '2',
    title: 'Memory',
    description: 'Un gioco di memoria per tutti.',
    minPlayers: 1,
    maxPlayers: 2,
    route :'MenuMemory',
    image: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Memory.png?raw=true',
  },
  {
    id: '3',
    title: 'Battaglia Navale',
    description: 'Un gioco strategico per due giocatori.',
    minPlayers: 2,
    maxPlayers: 2,
    route :'MenuBattleship',
    image: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Battleship.png?raw=true', 
  },
  {
    id: '4',
    title: 'Dama',
    description: 'Un classico gioco di dama per 2 giocatori.',
    minPlayers: 1,
    maxPlayers: 2,
    route: null,
    image: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Dama.png?raw=true', 

  },
  {
    id: '5',
    title: 'Schacchi',
    description: 'Un gioco di scacchi per 2 giocatori.',
    minPlayers: 1,
    maxPlayers: 2,
    route: null,
    image: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Chess.png?raw=true'
  },
  {
    id: '6',
    title: 'Flappy Bird',
    description: 'Un gioco di abilità ispirato al famoso Flappy Bird.', 
    minPlayers: 1,
    maxPlayers: 1,
    route: null,
    image: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Flappy-bird.png?raw=true',
  }
];

const HomeScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (item.route) {
            navigation.navigate(item.route);
          } else {
            Alert.alert('Gioco ancora in fase di sviluppo');
          }
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardPlayers}>
            {item.minPlayers} - {item.maxPlayers} giocatori
          </Text>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={games}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    );
  };

  export default HomeScreen;