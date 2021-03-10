import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import TypeCard from './typeCard';
import getColorFromType from '../utilities/getColorFromType';
export interface Props {
  name: string;
  url: string;
}
const PokemonCard = ({pokemon}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: getColorFromType(pokemon.type)},
      ]}>
      <Text style={styles.pokemonName}>{pokemon.name}</Text>
      <TypeCard type={pokemon.type} />
      <View style={styles.pokemonImageContainer}>
        <FastImage
          style={{width: 60, height: 60}}
          source={{
            uri:
              'https://raw.githubusercontent.com/' +
              'PokeAPI/sprites/master/sprites/pokemon/' +
              `other/official-artwork/${pokemon.id}.png`,
          }}
        />
      </View>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 120,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  pokemonImageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  types: {
    flexDirection: 'column',
  },
});
