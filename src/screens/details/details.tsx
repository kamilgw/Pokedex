import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image'

import {colors} from '../../styles';
import Evolutions from './evolutions';
import About from './about';
import Pokemon from '../../types/pokemons';
import TabBar from '../../components/tabBar';
import TypeCard from '../../components/typeCard';

const Details = ({navigation}) => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = () => {
    const {state} = navigation;
    fetch(`https://pokeapi.co/api/v2/pokemon/${state.params.pokemon}`)
      .then((res) => res.json())
      .then((details) => setDetails(details));
  };

  const pokemonData = details as Pokemon;
  const pokeball = require('../../assets/pokeball.png');
  const Tab = createMaterialTopTabNavigator();

  return details.name ? (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          ...styles.header,
          backgroundColor: colors[details.types[0].type.name],
        }}>
        <View style={styles.info}>
          <Text style={styles.name}>{details.name}</Text>
          <Text style={styles.id}>#{String(details.id).padStart(3, '0')}</Text>
          <View style={styles.types}>
              <TypeCard type={details.types[0].type.name} />
          </View>
          <View style={styles.teste}>
            <FastImage
              style={styles.image}
              source={{
                uri: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
                  details.id,
                ).padStart(3, '0')}.png`,
              }}
            />
            <FastImage style={styles.pokeballPos} source={pokeball} />
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.main}>
        <TabBar pokemonData={pokemonData} />
      </View>
    </View>
  ) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#E63F34" />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  header: {
    height: 250,
  },
  container: {
    flex: 1,
  },
  id: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  types: {
    flexDirection: 'column',
    marginTop: 5,
  },
  name: {
    fontSize: 30,
    color: '#fff',
    lineHeight: 42,
    fontWeight: 'bold',
  },
  info: {
    marginLeft: 15,
    height: '100%',
  },
  image: {
    height: 200,
    width: 200,
  },
  teste: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pokeballPos: {
    width: 245,
    height: 245,
    position: 'absolute',
    zIndex: -1,
    opacity: 0.07,
    transform: [{rotate: '45deg'}],
  },
});
