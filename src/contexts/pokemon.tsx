import React, {createContext, useContext, useState} from 'react';
import {getAllPokemons, getPokemonById} from '../services/api';
import {chekMarkedAs} from '../store/asyncStorage';

const PokemonContext = createContext({});

export function PokemonProvider({children}) {
  const [markedAs, setMarkedAs] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState({
    abilities: [],
    markAs: 'none',
  });

  async function listPokemon({offset}) {
    if (offset === 0) {
      setPokemons([]);
      const {data} = await getAllPokemons({offset});
      setPokemons([...data]);
    } else {
      const {data} = await getAllPokemons({offset});
      setPokemons([...pokemons, ...data]);
    }
  }

  async function listPokemonById(id) {
    const results = await getPokemonById(id);
    const markAs = await getMarkPokemon(id);

    setMarkedAs(markAs ?? 'none');
    setPokemon({...results, markAs: markAs ?? 'none'});
  }

  async function getMarkPokemon(id) {
    const {markAs} = await chekMarkedAs(id);

    return markAs;
  }

  function searchPokemon(array, value) {
    if (!value) {
      return array;
    }

    const regexp = new RegExp(value, 'i');
    return array.filter(({name}) => regexp.test(name));
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemon,
        pokemon,
        setPokemons,
        listPokemon,
        listPokemonById,
        markedAs,
        setMarkedAs,
        searchPokemon,
      }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const {
    pokemons,
    setPokemons,
    pokemon,
    setPokemon,
    listPokemon,
    listPokemonById,
    markedAs,
    setMarkedAs,
    searchPokemon,
  } = useContext(PokemonContext);
  return {
    pokemons,
    setPokemons,
    pokemon,
    setPokemon,
    listPokemon,
    listPokemonById,
    markedAs,
    setMarkedAs,
    searchPokemon,
  };
}
