import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import TabBar from '../../components/tabBar';
import TypeCard from '../../components/typeCard';
import {usePokemon, useMark} from '../../contexts';
import {useNavigation} from '@react-navigation/native';
import getColorFromType from '../../utilities/getColorFromType';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Details = () => {
  const {goBack} = useNavigation();
  const {showMark} = useMark();
  const {pokemon, markedAs} = usePokemon();

  const pokeball = require('../../assets/pokeball.png');
  const Tab = createMaterialTopTabNavigator();

  return pokemon.name ? (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          ...styles.header,
          backgroundColor: getColorFromType(
            capitalizeFirstLetter(pokemon.type),
          ),
        }}>
        <View style={styles.headerShow}>
          <TouchableOpacity style={styles.backContainer} onPress={goBack}>
            <Icon name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartContainer} onPress={showMark}>
            <View style={styles.heartIconContainer}>
              <Icon name="heart-outline" size={30} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.id}>#{String(pokemon.id).padStart(3, '0')}</Text>
          <View style={styles.types}>
            <TypeCard type={pokemon.type} />
          </View>
          <View style={styles.teste}>
            <FastImage
              style={styles.image}
              source={{
                uri: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
                  pokemon.id,
                ).padStart(3, '0')}.png`,
              }}
            />
            <FastImage style={styles.pokeballPos} source={pokeball} />
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.main}>
        <TabBar pokemonData={pokemon} />
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
  headerShow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  header: {
    height: 400,
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  heartIconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
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
  },
  backContainer: {
    height: '100%',
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
    height: 220,
    width: 220,
  },
  teste: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pokeballPos: {
    width: 200,
    height: 200,
    position: 'absolute',
    zIndex: -1,
    opacity: 0.07,
  },
});
