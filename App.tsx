import React, {Component, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';

import {PokemonProvider, MarkProvider} from './src/contexts';
import Routes from './src/routes';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <PokemonProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </PokemonProvider>
  );
}
