import React from 'react';
import Pokemon from '../../types/pokemon';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import getColorFromType from '../../utilities/getColorFromType';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';
import BaseStats from './baseStats';
export interface Props {
  pokemonData: Pokemon;
}

const About = ({pokemonData}) => {
  return (
    <ScrollView style={styles.scrollContainer}>
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
        <BaseStats pokemon={pokemonData} />
      </View>
    </ScrollView>
  );
};

export default About;
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
  },
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
  stat: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#4C91B2',
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
