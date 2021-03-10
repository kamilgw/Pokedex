import React from 'react';
import Pokemon from '../../types/pokemon';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import getColorFromType from '../../utilities/getColorFromType';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';

export interface Props {
  pokemonData: Pokemon;
}

const About = ({pokemonData}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.description}>
          <Text style={styles.description}>
            Type: {pokemonData.types[0].type.name}
            {'\n'}
            Ability: {pokemonData.abilities[0].ability.name}
          </Text>
        </Text> */}

        <View style={styles.viewHeightWeight}>
          <View style={styles.dataHeightWeight}>
            <Text style={styles.titleHeightWeight}>Height</Text>
            <Text>{pokemonData.height / 10}m</Text>
          </View>
          <View style={styles.dataHeightWeight}>
            <Text style={styles.titleHeightWeight}>Weight</Text>
            <Text>{pokemonData.weight / 10}kg</Text>
          </View>
        </View>
        <Text style={styles.title}>Stats</Text>
        <View style={{}}>
          <Text>Hp</Text>
          <ProgressBar
            style={{height: 20}}
            progress={pokemonData?.stats?.hp / 100}
            color={getColorFromType(capitalizeFirstLetter(pokemonData.type))}
          />
          <Text>Attack</Text>
          <ProgressBar
            style={{height: 20}}
            progress={pokemonData?.stats?.attack / 100}
            color={getColorFromType(capitalizeFirstLetter(pokemonData.type))}
          />
          <Text>Defense</Text>
          <ProgressBar
            style={{height: 20}}
            progress={pokemonData?.stats?.defense / 100}
            color={getColorFromType(capitalizeFirstLetter(pokemonData.type))}
          />
          <Text>Special-attack</Text>
          <ProgressBar
            style={{height: 20}}
            progress={pokemonData?.stats?.specialAttack / 100}
            color={getColorFromType(capitalizeFirstLetter(pokemonData.type))}
          />
          <Text>Special-defense</Text>
          <ProgressBar
            style={{height: 20}}
            progress={pokemonData?.stats?.specialDefense / 100}
            color={getColorFromType(capitalizeFirstLetter(pokemonData.type))}
          />
          <Text>Speed</Text>
          <ProgressBar
            style={{height: 20}}
            progress={pokemonData?.stats?.speed / 100}
            color={getColorFromType(capitalizeFirstLetter(pokemonData.type))}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default About;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 410,
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 10,
  },
  description: {
    color: '#747476',
    fontSize: 12,
    lineHeight: 14,
  },
  title: {
    fontSize: 20,
    color: '#303943',
    lineHeight: 42,
    fontWeight: 'bold',
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
