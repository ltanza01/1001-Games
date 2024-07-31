import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Schermate di esempio
import MenuScreen from './web/screens/tris/MenuScreen';
import GameScreen from './web/screens/tris/GameScreen';
import HomeScreen from './web/screens/home/HomeScreen';
import VictoryScreen from './web/screens/tris/VictoryScreen';
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
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Victory" component={VictoryScreen} />
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
