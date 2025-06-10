/**
 * Navigation.js – Documentazione
 *
 * Questo file definisce la struttura di navigazione principale dell'applicazione tramite React Navigation.
 * Utilizza uno Stack Navigator per gestire la transizione tra le varie schermate dei giochi, menu, riconoscimenti e leaderboard.
 *
 * ---
 *
 * Componenti principali:
 * - CustomHeader: Header personalizzato con menu laterale, barra di ricerca (solo in Home) e controllo della musica.
 * - Stack.Navigator: Definisce tutte le schermate navigabili dell'app, tra cui Home, menu e gioco di ogni modalità, schermate di vittoria, riconoscimenti e leaderboard.
 *
 * Schermate gestite:
 * - HomeScreen: Schermata principale con la lista dei giochi.
 * - Menu/Game/Victory per Tris, Memory, Battaglia Navale, Dama, Flappy Bird.
 * - Riconoscimenti e Leaderboard.
 *
 * Funzionalità aggiuntive:
 * - Barra di ricerca per filtrare i giochi nella Home.
 * - Menu laterale accessibile da ogni schermata per navigazione rapida, riconoscimenti e controllo musica.
 * - Gestione del contesto musicale tramite MusicContext.
 *
 * Note aggiuntive:
 * - Gli stili sono definiti in NavigationStyles.js.
 * - Tutta la logica di navigazione è centralizzata in questo file.
 * - Il componente App esportato è il punto di ingresso della navigazione dell'app.
 *
 * In sintesi:
 * Gestisce la navigazione globale dell'app, permettendo di spostarsi tra tutte le schermate di gioco e di servizio.
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//RICONOSCIMENTI
import Riconoscimenti from '../riconoscimenti/Riconoscimenti.js';
//MENU
import HomeScreen from '../home/HomeScreen';
//TRIS
import GameTris from '../tris/GameTris';
import MenuTris from '../tris/MenuTris';
import VictoryTris from '../tris/VictoryTris';
//MEMORY
import GameMemory from '../memory/GameMemory';
import MenuMemory from '../memory/MenuMemory';
import VictoryMemory from '../memory/VictoryMemory';
//BATTAGLIA NAVALE
import GameBattleship from '../battaglia navale/BattleshipGame.js';
import MenuBattleship from '../battaglia navale/BattleshipMenu.js';
import VictoryBattleship from '../battaglia navale/BattleshipVictory.js';
//DAMA
import MenuDama from '../dama/DamaMenu.js';
//FLAPPY BIRD
import GameFlappy from '../flappy-bird/FlappyGame.js';
import MenuFlappy from '../flappy-bird/FlappyMenu.js';
import Leaderboard from '../flappy-bird/FlappyScore.js';
//ALTRI IMPORT
import styles from './NavigationStyles.js';
// Importato il contesto della musica
import { MusicContext } from '../../../App';
import DamaGame from '../dama/DamaGame.js';
import DamaVictory from '../dama/DamaVictory.js';

const Stack = createStackNavigator();

function CustomHeader({ navigation, search, setSearch, routeName }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const music = useContext(MusicContext);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        style={styles.hamburgerButton}
        accessibilityLabel="Apri menu"
        accessible
      >
        <Icon name="menu" size={40} color="white" />
      </TouchableOpacity>
      {routeName === "Home" && (
        <View style={styles.searchBar}>
          <Icon name="magnify" size={24} color="#555" style={styles.searchIcon} />
          <TextInput
            placeholder="Cerca gioco"
            placeholderTextColor="#555"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            accessibilityLabel="Cerca gioco"
            accessible
            returnKeyType="search"
          />
        </View>
      )}
      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Menu
              </Text>
              <TouchableOpacity
                onPress={() => setMenuVisible(false)}
                style={styles.modalCloseButton}
                activeOpacity={0.7}
              >
                <Icon name="close" size={32} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.menuContent}>
              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Home');
                }}
                style={styles.menuItem}
                activeOpacity={0.7}
              >
                <Icon name="home" size={30} color="#1976d2" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Torna alla Home</Text>
              </TouchableOpacity>
              <View style={styles.menuSeparator} />
              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Riconoscimenti');
                }}
                style={styles.menuItem}
                activeOpacity={0.7}
              >
                <Icon name="star" size={30} color="#ffb300" style={styles.menuIcon} />
                <Text style={styles.menuItemStarText}>Riconoscimenti</Text>
              </TouchableOpacity>
              <View style={styles.menuSeparator} />
              {music && (
                <TouchableOpacity
                  onPress={music.toggleMute}
                  style={styles.menuItem}
                  activeOpacity={0.7}
                >
                  <Icon name={music.muted ? "volume-off" : "volume-high"} size={30} color="#1976d2" style={styles.menuIcon} />
                  <Text style={styles.menuItemText}>
                    {music.muted ? 'Riattiva Musica' : 'Disattiva Musica'}
                  </Text>
                </TouchableOpacity>
              )}
              <View style={styles.menuSeparator} />
              <TouchableOpacity
                onPress={() => setMenuVisible(false)}
                style={styles.menuItemExit}
                activeOpacity={0.7}
              >
                <Icon name="exit-to-app" size={26} color="#e53935" style={styles.menuIcon} />
                <Text style={styles.menuItemExitText}>Chiudi Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function App() {
  const [search, setSearch] = useState(""); 

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation, route }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              search={search}
              setSearch={setSearch}
              routeName={route.name}
            />
          ),
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} search={search} />}
        </Stack.Screen>
        <Stack.Screen name="MenuTris" component={MenuTris} />
        <Stack.Screen name="GameTris" component={GameTris} />
        <Stack.Screen name="VictoryTris" component={VictoryTris} />
        <Stack.Screen name="MenuMemory" component={MenuMemory} />
        <Stack.Screen name="GameMemory" component={GameMemory} />
        <Stack.Screen name="VictoryMemory" component={VictoryMemory} />
        <Stack.Screen name="MenuBattleship" component={MenuBattleship} />
        <Stack.Screen name="GameBattleship" component={GameBattleship} />
        <Stack.Screen name="VictoryBattleship" component={VictoryBattleship} />
        <Stack.Screen name="Riconoscimenti" component={Riconoscimenti} />
        <Stack.Screen name="MenuDama" component={MenuDama} />
        <Stack.Screen name="GameDama" component={DamaGame} />
        <Stack.Screen name="VictoryDama" component={DamaVictory} />
        <Stack.Screen name="MenuFlappy" component={MenuFlappy} />
        <Stack.Screen name="GameFlappy" component={GameFlappy} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
