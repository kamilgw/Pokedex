import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import About from '../screens/details/about';
import Evolutions from '../screens/details/evolutions';
import Pokemon from '../../types/pokemon';
import getColorFromType from '../utilities/getColorFromType';

export interface Props {
  pokemonData: Pokemon;
}

const Tab = createMaterialTopTabNavigator();
const TabBar = ({pokemonData}: Props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      tabBarOptions={{
    indicatorStyle: { backgroundColor: getColorFromType(pokemonData.types[0].type.name) }
  }}>
        <Tab.Screen 
        name={"About"}
        children={() => <About pokemonData={pokemonData} />}
        />
        <Tab.Screen 
        name="Evolutions"
        children={() => <Evolutions pokemonID={pokemonData.id} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabBar;