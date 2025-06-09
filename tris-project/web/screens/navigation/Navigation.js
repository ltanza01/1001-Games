import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//RICONOSCIMENTI
import Riconoscimenti from '../riconoscimenti/Riconoscimenti.js';
//MENU
import HomeScreen from '../home/HomeScreen';
//TRIS
import MenuTris from '../tris/MenuTris';
import GameTris from '../tris/GameTris';
import VictoryTris from '../tris/VictoryTris';
//MEMORY
import MenuMemory from '../memory/MenuMemory';
import GameMemory from '../memory/GameMemory';
import VictoryMemory from '../memory/VictoryMemory';
//BATTAGLIA NAVALE
import MenuBattleship from '../battaglia navale/BattleshipMenu.js'
import GameBattleship from '../battaglia navale/BattleshipGame.js'
import VictoryBattleship from '../battaglia navale/BattleshipVictory.js';
//ALTRI IMPORT
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './NavigationStyles.js';
// Importa il contesto della musica
import { MusicContext } from '../../../App';

const Stack = createStackNavigator();

const CustomHeader = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const routeNames = ['Home'];
  const currentRouteName = useNavigationState(state => state.routes[state.index]?.name);

  const music = useContext(MusicContext);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        style={{ padding: 10 }}
      >
        <Icon name="menu" size={40} color="white" />
      </TouchableOpacity>
      {routeNames.map((routeName) => (
        <TouchableOpacity
          key={routeName}
          onPress={() => navigation.navigate(routeName)}
          style={[
            styles.headerButton,
            currentRouteName === routeName && styles.activeButton
          ]}
        >
          <Text
            style={[
              styles.headerText,
              currentRouteName === routeName && styles.activeText
            ]}
          >
            <Icon name="home-circle" size={60} color="white" />
          </Text>
          <Text style={styles.headerTextLabel}>
            {routeName}
          </Text>
        </TouchableOpacity>
      ))}
      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
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
            {/* Menu Items */}
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
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
