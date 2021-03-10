import React, {useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {loadPokemonsCaptured} from '../../store/asyncStorage';
import {usePokemon} from '../../contexts';
import PokemonCard from '../../components/pokemonCard';
import {RectButton} from 'react-native-gesture-handler';

const Pokedex = () => {
  const {navigate} = useNavigation();
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltered, setPokemonFiltered] = useState([]);
  const [searching, setSearch] = useState(false);
  const {listPokemonById, searchPokemon} = usePokemon();

  async function loadPokedex() {
    setPokemons(await loadPokemonsCaptured());
  }

  async function goToPageShow(id) {
    await listPokemonById(id);
    navigate('Details');
  }

  function filterPokemonByName(value) {
    setSearch(true);
    setPokemonFiltered(searchPokemon(pokemons, value));
  }

  useFocusEffect(
    React.useCallback(() => {
      loadPokedex();
    }, []),
  );
  return (
    <SafeAreaView>
      <View style={styles.pokemonlist}>
        <Text style={styles.titlePokedex}>My Pokedex</Text>
        <FlatList
          style={{marginLeft: 30}}
          data={searching ? pokemonsFiltered : pokemons}
          numColumns={2}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.name}
          renderItem={({item}) => (
            <RectButton onPress={() => goToPageShow(item.id)}>
              <PokemonCard pokemon={item} />
            </RectButton>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Pokedex;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },

  pokemonList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlePokedex: {
    fontSize: 22,
    marginBottom: 15,
    marginLeft: 40,
  },
});
