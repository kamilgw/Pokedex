import React from 'react';
import Pokemon from '../../types/pokemon';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles';
import {ProgressBar} from 'react-native-paper';

export interface Props {
  pokemonData: Pokemon;
}

const About = ({pokemonData}: Props) => {
  return (
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
          <Text>{pokemonData.height/10}m</Text>
        </View>
        <View style={styles.dataHeightWeight}>
          <Text style={styles.titleHeightWeight}>Weight</Text>
          <Text>{pokemonData.weight/10}kg</Text>
        </View>
      </View>
      <Text style={styles.title}>Stats</Text>
      <View style={{}}>
        {pokemonData.stats.map((item, index) => {
          return (
            <View key={index}>
              <Text>{item.stat.name}</Text>
              <ProgressBar
                style={{height: 20}}
                progress={parseInt(item.base_stat) / 100}
                color={colors[pokemonData.types[0].type.name]}
              />
            </View>
          );
        })}
      </View>
    </View>
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
