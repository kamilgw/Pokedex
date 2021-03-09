import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import {usePokemon} from '../../contexts';

import PokemonCard from '../../components/pokemonCard';

const Pokemons = () => {
  const {pokemons, listPokemon, listPokemonById} = usePokemon();
  const [refreshing] = useState(false);
  const {navigate} = useNavigation();
  const [offset, setOffset] = useState(0);

  async function goToPageShow(id) {
    await listPokemonById(id);
    navigate('Details');
  }

  function loadMore() {
    setOffset(offset + 14);
  }

  function refreshPokemons() {
    setOffset(0);
  }

  useEffect(() => {
    listPokemon({offset});
  }, [offset]);

  const renderHeader = () => {
    return (
      <View style={styles.headerBox}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={handleSearch}
          // onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={styles.headerText}
        />
      </View>
    );
  };

  const handleSearch = (text) => {};

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
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.name}
          renderItem={({item}) => (
            <RectButton onPress={() => goToPageShow(item.id)}>
              <PokemonCard pokemon={item} />
            </RectButton>
          )}
          refreshing={refreshing}
          onRefresh={refreshPokemons}
          ListFooterComponent={renderFooter()}
          showsVerticalScrollIndicator={false}

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
    marginHorizontal: 10,
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
