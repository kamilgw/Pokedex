import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {colors} from '../../styles';
import {ProgressBar} from 'react-native-paper';
import Evolutions from './evolutions';
const Details = (props) => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = () => {
    const {state} = props.navigation;
    fetch(`https://pokeapi.co/api/v2/pokemon/${state.params.pokemon}`)
      .then((res) => res.json())
      .then((details) => setDetails(details));
  };

  return details.name ? (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          ...styles.header,
          backgroundColor: colors[details.types[0].type.name],
        }}>
        <View style={styles.info}>
          <Text style={styles.name}>{details.name}</Text>
          <View style={styles.teste}>
            <Image
              style={styles.image}
              source={{
                uri: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
                  details.id,
                ).padStart(3, '0')}.png`,
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <Fragment>
          <Text style={styles.title}>About</Text>
          <Text style={styles.description}>
            <Text style={styles.description}>
              Type: {details.types[0].type.name}
              {'\n'}
              Ability: {details.abilities[0].ability.name}
            </Text>
          </Text>

          <View style={styles.viewHeightWeight}>
            <View style={styles.dataHeightWeight}>
              <Text style={styles.titleHeightWeight}>Height</Text>
              <Text>{details.height}</Text>
            </View>
            <View style={styles.dataHeightWeight}>
              <Text style={styles.titleHeightWeight}>Weight</Text>
              <Text>{details.weight}</Text>
            </View>
          </View>
          <Text style={styles.title}>Stats</Text>
          <View style={{}}>
            {details.stats.map((item, index) => {
              return (
                <View key={index}>
                  <Text>{item.stat.name}</Text>
                  <ProgressBar
                    style={{height: 20}}
                    progress={parseInt(item.base_stat) / 100}
                    color={colors[details.types[0].type.name]}
                  />
                </View>
              );
            })}
          </View>
          <Evolutions pokemonID={String(details.id)} />
        </Fragment>
      </View>
    </ScrollView>
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
  body: {
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    color: '#303943',
    lineHeight: 42,
    fontWeight: 'bold',
  },
  container: {},
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
  type: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    fontSize: 11,
    color: 'white',
    padding: 3,
    borderRadius: 15,
    marginRight: 5,
    textAlign: 'center',
    width: 50,
  },
  teste: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  description: {
    marginRight: 15,
  },
  card: {
    flexDirection: 'row',
  },
  viewHeightWeight: {
    flexDirection: 'row',
  },
  dataHeightWeight: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
    fontSize: 14,
  },
  titleHeightWeight: {
    color: '#acb0b4',
    marginBottom: 5,
  },
});
