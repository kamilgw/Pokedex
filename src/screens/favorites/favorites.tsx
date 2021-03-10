import React, {useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {loadPokemonsCaptured} from '../../store/asyncStorage';
import {usePokemon} from '../../contexts';
import PokemonCard from '../../components/pokemonCard';
import {RectButton} from 'react-native-gesture-handler';

const Pokedex = () => {
  const {navigate} = useNavigation();
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltered, setPokemonFiltered] = useState([]);
  const [searching, setSearch] = useState(false);
  const {listPokemonById, searckPokemon} = usePokemon();

  async function loadPokedex() {
    setPokemons(await loadPokemonsCaptured());
  }

  async function goToPageShow(id) {
    await listPokemonById(id);
    navigate('Show');
  }

  function filterPokemonByName(value) {
    setSearch(true);
    setPokemonFiltered(searckPokemon(pokemons, value));
  }

  useFocusEffect(
    React.useCallback(() => {
      loadPokedex();
    }, []),
  );
  return (
    <View style={styles.container}>
      <Text style={styles.titlePokedex}>My Pokedex</Text>

      {/* <styles.InputSearchContainer>
        <styles.InputSearch
          onChangeText={filterPokemonByName}
          placeholder="Filter pokemon"
        />
      </styles.InputSearchContainer> */}

      <FlatList
        data={searching ? pokemonsFiltered : pokemons}
        renderItem={({item}) => (
          <RectButton onPress={() => goToPageShow(item.id)}>
            <PokemonCard pokemon={item} />
          </RectButton>
        )}
        keyExtractor={(item) => item.name}
        numColumns="2"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Pokedex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 30,
  },
  titlePokedex: {
    fontSize: 22,
    marginBottom: 15,
  },
});
