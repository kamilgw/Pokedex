import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import api from '../services/api';
import getIDFromUrl from '../utilities/getIDFromUrl';
import getColorFromType from '../utilities/getColorFromType';

export interface Props {
  name: string;
  url: string;
}
const PokemonCard = ({name, url, navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', {pokemon: name})}>
      <View style={styles.container}>
        <View style={styles.pokemonImageContainer}>
          <FastImage
            style={{width: 85, height: 85}}
            source={{
              uri:
                'https://raw.githubusercontent.com/' +
                'PokeAPI/sprites/master/sprites/pokemon/' +
                `other/official-artwork/${getIDFromUrl(url)}.png`,
            }}
          />
          <Text style={styles.pokemonName}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 120,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pokemonImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  pokemonImage: {
    width: 85,
    height: 85,
  },
});
