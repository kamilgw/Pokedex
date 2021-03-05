import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import PokemonCard from '../../components/pokemonCard';
import api from '../../services/api';
import PokemonList from '../../types/pokemonList';
import getIDFromUrl from '../../utilities/getIDFromUrl';

const itemsPerPage = 40;

const Pokemons = ({navigation}) => {
  const [pokemons, setPokemons] = useState(null);
  const [searchfeild, setSearchfeild] = useState('');
  const [loading, setLoading] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState(itemsPerPage);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await api.get(
        `/pokemon?offset=${0}&limit=${itemsPerPage}`,
      );
      setPokemons(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  async function loadMorePokemons() {
    if (loading) return;

    setLoading(true);
    const response = await api.get(
      `/pokemon?offset=${itemsLoaded}&limit=${itemsPerPage}`,
    );

    setPokemons([...pokemons, ...response.data.results]);
    console.log(itemsLoaded);
    setItemsLoaded(parseInt(itemsLoaded + itemsPerPage));
    setLoading(false);
  }

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    {/* <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfeild}
          placeholder="Search Pokemons"
          onChangeText={(value) => setSearchfeild(value)}
          value={searchfeild}
        />
      </View> */}
      <View style={styles.pokemonList}>
        <FlatList
          data={pokemons}
          numColumns={2}
          onEndReached={() => loadMorePokemons()}
          onEndReachedThreshold={0}
          keyExtractor={(item) => item.name}
          ListFooterComponent={renderFooter()}
          renderItem={({item}) => (
            <PokemonCard
              navigation={navigation}
              name={item.name}
              url={item.url}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Pokemons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pokemonList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchCont: {
    position: 'absolute',
    marginBottom: 70,
    left: '20%',
    zIndex: 1,
    marginTop: 10,
  },
  searchfeild: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    width: 250,
    borderRadius: 50,
  },
  footer: {
    height: 40,
  },
});
