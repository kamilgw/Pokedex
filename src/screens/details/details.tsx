import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../styles';
import Evolutions from './evolutions';
import About from './about';
import Pokemon from '../../types/pokemons';
import Tabbar from '../../components/tabBar';
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
            {details.types.map((type, key) => console.log(type))}
          </View>
          <Text>{details.types[0].type.name}</Text>
          <View style={styles.teste}>
            <Image
              style={styles.image}
              source={{
                uri: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
                  details.id,
                ).padStart(3, '0')}.png`,
              }}
            />
            <Image style={styles.pokeballPos} source={pokeball} />
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.main}>
        <Tabbar
          tabs={[
            {
              name: 'About',
              component: <About pokemonData={pokemonData} />,
            },
            {
              name: 'Evolutions',
              component: <Evolutions pokemonID={pokemonData.id} />,
            },
          ]}
        />
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
    flexDirection: 'row',
  },
  name: {
    fontSize: 30,
    color: '#303943',
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
  types: {
    flexDirection: 'row',
    marginTop: 5,
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
