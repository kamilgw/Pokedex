import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pokemons from '../screens/home/home';
import Pokedex from '../screens/favorites/favorites';
// import colors from '../styles/colors'

const {Navigator, Screen} = createBottomTabNavigator();

export default () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 30,
          shadowOpacity: 2,
          height: 64,
          backgroundColor: '#f1f2f6',
        },
        tabStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        labelStyle: {
          fontSize: 11,
        },
        iconStyle: {
          flex: 0,
          width: 25,
          height: 25,
        },
        activeTintColor: '#ff6348',
        keyboardHidesTabBar: true,
      }}>
      <Screen
        name="Pokemons"
        component={Pokemons}
        options={{
          tabBarLabel: 'Pokemons',
        }}
      />
      <Screen
        name="Pokedex"
        component={Pokedex}
        options={{
          tabBarLabel: 'Pokedex',
          // tabBarIcon: () => <Icon name="pokeball" size={25} color="#900" />,
        }}
      />
    </Navigator>
  );
};
