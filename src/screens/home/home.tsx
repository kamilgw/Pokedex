import React, {useCallback, useState, useEffect} from 'react';
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
  const [pokemons, setPokemons] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [loading, setLoading] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState(itemsPerPage);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await api.get(
        `/pokemon?offset=${0}&limit=${itemsPerPage}`,
      );
      setPokemons(response.data.results);
    } catch (error) {
      console.error(error);
    }
  });

  const loadMorePokemons = async (shouldRefresh = false) => {
    if (loading) return;

    setLoading(true);
    const response = await api.get(
      `/pokemon?offset=${itemsLoaded}&limit=${itemsPerPage}`,
    );

    setPokemons(shouldRefresh ? data : [...pokemons, ...response.data.results]);
    setItemsLoaded(parseInt(itemsLoaded + itemsPerPage));
    setLoading(false);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerBox}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={searchField}
          // onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={styles.headerText}
        />
      </View>
    );
  };


  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pokemonList}>
        <FlatList
          data={pokemons}
          numColumns={2}
          onEndReached={() => loadMorePokemons()}
          onEndReachedThreshold={0}
          keyExtractor={(item) => item.name}
          onScroll = {(e)=>{
            e.nativeEvent.contentOffset.y
          }}
          ListHeaderComponent={renderHeader}
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
  headerBox: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  headerText: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  searchCont: {
    position: 'absolute',
    marginBottom: 70,
    left: '20%',
    zIndex: 1,
    marginTop: 10,
  },
  footer: {
    height: 40,
  },
});
