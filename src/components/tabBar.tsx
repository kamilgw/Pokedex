import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import About from '../screens/details/about';
import Evolutions from '../screens/details/evolutions';
import getColorFromType from '../utilities/getColorFromType';
import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter';

const Tab = createMaterialTopTabNavigator();
const TabBar = ({pokemonData}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: getColorFromType(
            capitalizeFirstLetter(pokemonData.type),
          ),
        },
      }}>
      <Tab.Screen
        name={'About'}
        children={() => <About pokemonData={pokemonData} />}
      />
      <Tab.Screen
        name="Evolutions"
        children={() => <Evolutions pokemonID={pokemonData.id} />}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
