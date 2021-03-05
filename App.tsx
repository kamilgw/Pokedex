import React, {Component, useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from 'react-native-splash-screen';
import Animated from 'react-native-reanimated';
import Pokemons from './src/screens/home/home';
import Details from './src/screens/details/details';
const appNavigator = createStackNavigator(
  {
    Home: {
      screen: Pokemons,
    },
    Details: {
      screen: Details,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(appNavigator);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return <AppContainer />;
};

export default App;
