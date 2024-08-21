import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//MENU
import HomeScreen from './web/screens/home/HomeScreen';
//TRIS
import MenuTris from './web/screens/tris/MenuTris';
import GameTris from './web/screens/tris/GameTris';
import VictoryTris from './web/screens/tris/VictoryTris';
//MEMORY
import MenuMemory from './web/screens/memory/MenuMemory';
import GameMemory from './web/screens/memory/GameMemory';
import VictoryMemory from './web/screens/memory/VictoryMemory';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const CustomHeader = ({ navigation }) => {
  const routeNames = ['Home']; // Lista dei nomi delle route
  const currentRouteName = useNavigationState(state => state.routes[state.index]?.name);

  return (
    <View style={styles.headerContainer}>
      <SafeAreaView style={styles.headerContainer}> 
      {routeNames.map((routeName) => (
        <TouchableOpacity
          key={routeName}
          onPress={() => navigation.navigate(routeName)}
          style={[styles.headerButton, currentRouteName === routeName]}
        >
          <Text style={[styles.headerText, currentRouteName === routeName]}>
            <Icon name="home-circle" size={60} color="white" />

          </Text>
         <Text style={[styles.headerTextLabel]}>      
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
            backgroundColor: '#f8f9fa', // Colored dello sfondo dell'header
          },
          headerTitleStyle: {
            fontWeight: 'bold', // Testo in grassetto
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: '#007bff', // Colore dello sfondo dell'header
  },
  headerButton: {
    padding: 10,
    paddingBottom:0,
  },
  headerText: {
    color: '#ffffff', // Colore del testo
    textAlign: 'center',
  },
  headerTextLabel: {
    color: '#fff', // Colore del testo
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff', // Colore della linea sottostante l'elemento attivo
  },
  activeText: {
    fontWeight: 'bold', // Testo in grassetto per l'elemento attivo
  },
});
