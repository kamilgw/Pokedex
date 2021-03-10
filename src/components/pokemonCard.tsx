import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import TypeCard from './typeCard';
import getColorFromType from '../utilities/getColorFromType';

const PokemonCard = ({pokemon}) => {
  const pokeball = require('../assets/pokeball.png');

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
          style={styles.pokeball}
          tintColor={'#fff'}
          source={pokeball}
        />
        <FastImage
          style={{width: 80, height: 80}}
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  pokeball: {
    opacity: 0.15,
    width: 90,
    height: 90,
    position: 'absolute',
    right: -8,
    bottom: -15,
    tintColor: '#2d3436',
  },
  pokemonImageContainer: {
    flex: 1,
    // alignItems: 'flex-end',
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  types: {
    flexDirection: 'column',
  },
});
