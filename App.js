import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {stackNavigator} from 'react-navigation-stack';
import Pokemons from './src/components/Pokemons';
import Details from './src/components/Details';
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

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;