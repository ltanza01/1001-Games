import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

// Dati di esempio per i giochi
const games = [
  {
    id: '1',
    title: 'Gioco del Tris',
    description: 'Un classico gioco del tris per 1/2 giocatori.',
    minPlayers: 1,
    maxPlayers: 2,
    route :'Menu',
    image: 'https://images.unsplash.com/photo-1668901382969-8c73e450a1f5?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Immagine di esempio
  },
  {
    id: '2',
    title: 'Memory',
    description: 'Un gioco di memoria per tutti.',
    minPlayers: 1,
    maxPlayers: 4,
    image: 'https://images.unsplash.com/photo-1529480653440-0e5fd1af911c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNhcmRzJTIwZ2FtZXxlbnwwfHwwfHx8MA%3D%3D', // Immagine di esempio
  },
  {
    id: '3',
    title: 'Battaglia Navale',
    description: 'Un gioco strategico per due giocatori.',
    minPlayers: 2,
    maxPlayers: 2,
    image: 'https://plus.unsplash.com/premium_photo-1707911993245-273819db3431?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmF0dGFnbGlhJTIwbmF2YWxlJTIwZ2FtZXxlbnwwfHwwfHx8MA%3D%3D', // Immagine di esempio
  },
  // Aggiungi altri giochi qui
];

const HomeScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.route)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  cardPlayers: {
    fontSize: 12,
    color: '#888',
  },
});

export default HomeScreen;