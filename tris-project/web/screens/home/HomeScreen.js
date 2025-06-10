import { Alert, FlatList, Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import styles from './HomeStyles.js';

/**
 * HomeScreen – Documentazione
 *
 * Questo componente React Native rappresenta la schermata principale dell'applicazione,
 * mostrando una lista di giochi disponibili con immagini, descrizione e numero di giocatori supportati.
 * Permette la ricerca dei giochi tramite una stringa di ricerca e la navigazione verso il menu di ciascun gioco.
 *
 * ---
 *
 * Stati e dati principali:
 * - games: Array di oggetti che rappresentano i giochi disponibili (id, titolo, descrizione, giocatori, route, immagine).
 * - search: Stringa di ricerca per filtrare i giochi (prop opzionale).
 *
 * Funzioni principali:
 * - renderItem(): Renderizza la card di ciascun gioco con immagine, titolo, descrizione e numero di giocatori.
 * - Se il gioco è selezionabile (route presente), naviga al menu corrispondente; altrimenti mostra un alert.
 *
 * UI:
 * - FlatList: Visualizza la lista dei giochi in una griglia a due colonne.
 * - Card: Ogni gioco è rappresentato da una card con immagine e dettagli.
 * - Messaggio personalizzato se nessun gioco corrisponde alla ricerca, con link per suggerire nuovi giochi via email.
 *
 * Navigazione:
 * - Utilizza la prop navigation per spostarsi tra le schermate dei menu dei giochi.
 *
 * Note aggiuntive:
 * - Gli stili sono definiti in HomeStyles.js.
 * - Il componente è pensato per essere la schermata di ingresso dell'app.
 *
 * In sintesi:
 * Gestisce la visualizzazione e la selezione dei giochi disponibili, offrendo una panoramica interattiva e la possibilità di suggerire nuovi giochi.
 */

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
    route: 'MenuDama',
    image: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Dama.png?raw=true', 

  },
  {
    id: '5',
    title: 'Schacchi',
    description: 'Un gioco di scacchi per 2 giocatori.',
    minPlayers: 1,
    maxPlayers: 2,
    route: 'MenuScacchi',
    image: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Chess.png?raw=true'
  },
  {
    id: '6',
    title: 'Flappy Bird',
    description: 'Un gioco di abilità ispirato al famoso Flappy Bird.', 
    minPlayers: 1,
    maxPlayers: 1,
    route: 'MenuFlappy',
    image: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Flappy-bird.png?raw=true',
  }
];

const HomeScreen = ({ navigation, search = "" }) => {
    const filteredGames = games.filter(game =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );

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
        {filteredGames.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 18, color: '#555', textAlign: 'center', marginBottom: 12 }}>
              Nessun gioco trovato.
            </Text>
            <Text style={{ fontSize: 16, color: '#555', textAlign: 'center' }}>
              Hai idee per nuovi giochi? Scrivimi a{" "}
              <Text
                style={{ color: '#1976d2', textDecorationLine: 'underline' }}
                onPress={() => {
                  Linking.openURL('mailto:tanzarellalorenzo24@gmail.com?subject=Nuovo gioco per il portale');
                }}
              >
                tanzarellalorenzo24@gmail.com
              </Text>
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredGames}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
    );
  };

export default HomeScreen;