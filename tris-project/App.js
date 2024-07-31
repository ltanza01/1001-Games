import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './web/MenuScreen';
import GameScreen from './web/GameScreen';
import VictoryScreen from './web/VictoryScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Gioco del Tris' }} />
        <Stack.Screen name="Victory" component={VictoryScreen} options={{ title: 'Vittoria' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}