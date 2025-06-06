import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

const Stack = createStackNavigator();

const CustomHeader = ({ navigation }) => {
  const routeNames = ['Home']; 
  const currentRouteName = useNavigationState(state => state.routes[state.index]?.name);

  return (
    <View style={styles.headerContainer}>
      <SafeAreaView style={styles.headerContainer}> 
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
      </SafeAreaView>
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
      </Stack.Navigator>
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: 999,
        }}
        pointerEvents="none"
      >
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
          App pensata e sviluppata da Tanza®
        </Text>
      </View>
    </NavigationContainer>
  );
}
