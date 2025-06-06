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
    image: 'https://images.unsplash.com/photo-1668901382969-8c73e450a1f5?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Immagine di esempio
  },
  {
    id: '2',
    title: 'Memory',
    description: 'Un gioco di memoria per tutti.',
    minPlayers: 1,
    maxPlayers: 2,
    route :'MenuMemory',
    image: 'https://images.unsplash.com/photo-1529480653440-0e5fd1af911c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNhcmRzJTIwZ2FtZXxlbnwwfHwwfHx8MA%3D%3D', // Immagine di esempio
  },
  {
    id: '3',
    title: 'Battaglia Navale',
    description: 'Un gioco strategico per due giocatori.',
    minPlayers: 2,
    maxPlayers: 2,
    route :'MenuBattleship',
    image: 'https://plus.unsplash.com/premium_photo-1707911993245-273819db3431?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmF0dGFnbGlhJTIwbmF2YWxlJTIwZ2FtZXxlbnwwfHwwfHx8MA%3D%3D', // Immagine di esempio
  },
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
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 999,
          }}
          pointerEvents="auto"
        >
          <TouchableOpacity onPress={() => navigation.navigate('Riconoscimenti')}>
            <Text
              style={{
                fontSize: 16,
                color: '#0072ff',
                fontWeight: 'bold',
                letterSpacing: 1,
                textShadowColor: '#fff',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
                opacity: 0.85,
              }}
            >
              Riconoscimenti
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  export default HomeScreen;