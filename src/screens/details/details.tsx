import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
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

  return pokemon.name ? (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getColorFromType(
            capitalizeFirstLetter(pokemon.type),
          ),
        },
      ]}>
      <View style={styles.header}>
        <SafeAreaView style={styles.container}>
          <View style={styles.roundSquare} />
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

          <View style={styles.headerShow}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {capitalizeFirstLetter(pokemon.name)}
              </Text>
              <View style={styles.types}>
                <TypeCard type={pokemon.type} />
              </View>
            </View>
            <Text style={styles.id}>
              #{String(pokemon.id).padStart(3, '0')}
            </Text>
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
            <FastImage
              tintColor={'#fff'}
              style={styles.pokeballPos}
              source={pokeball}
            />
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.main} />
      <View style={{paddingHorizontal: 20, flex: 1, backgroundColor: '#fff'}}>
        <TabBar style={styles.nav} pokemonData={pokemon} />
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
    height: Dimensions.get('screen').height * 0.425,
  },
  headerShow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  heartContainer: {
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
    fontSize: 22,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    marginRight: 20,
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
  image: {
    height: 220,
    width: 220,
    zIndex: 1,
    bottom: -30,
  },
  teste: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    height: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: -1,
  },
  nav: {
    paddingHorizontal: 0,
    paddingVertical: 20,
    borderRadius: 20,
  },
  pokeballPos: {
    width: 200,
    height: 200,
    position: 'absolute',
    zIndex: -1,
    opacity: 0.2,
    bottom: -20,
    right: -30,
  },
  roundSquare: {
    width: 212,
    height: 212,
    borderRadius: 24,
    position: 'absolute',
    top: -95,
    left: -110,
    backgroundColor: '#fff',
    opacity: 0.1,
    transform: [{rotate: '-13deg'}],
  },
});
