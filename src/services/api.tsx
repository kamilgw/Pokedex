import axios from 'axios';
import Pokemon from '../types/pokemon';
import PokemonSpecie from '../types/pokemonSpecies';

const api = axios.create();

export async function getAllPokemons({offset, amount = 14}) {
  const {
    data: {pokemon},
  } = await api.get(
    'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json',
  );

  const limit = offset + amount;
  const pokemonWithLimit = pokemon.slice(offset, limit);

  const data = pokemonWithLimit.map((item) => {
    const id = item.id;
    const type = item.type[0];
    return {
      id,
      name: item.name,
      type,
    };
  });

  return {data};
}

export const getPokemonById = async (id: string) => {
  const {data} = await api.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return {
    ...data,
    type: data.types[0].type.name,
    height: data.height,
    weight: data.weight,
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    },
  };
};
export default api;
