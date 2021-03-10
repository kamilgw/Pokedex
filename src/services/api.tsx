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
  const {data: pokemonData} = await api.get<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
  );
  const pokemonStatsFormatted = pokemonData.stats.map((stat) => {
    let name = '';

    if (stat.stat.name === 'hp') {
      name = 'HP';
    } else if (stat.stat.name === 'attack') {
      name = 'Attack';
    } else if (stat.stat.name === 'defense') {
      name = 'Defense';
    } else if (stat.stat.name === 'special-attack') {
      name = 'Sp. Atk';
    } else if (stat.stat.name === 'special-defense') {
      name = 'Sp. Def';
    } else if (stat.stat.name === 'speed') {
      name = 'Speed';
    }

    return {
      base_stat: stat.base_stat,
      name,
      url: stat.stat.url,
    };
  });
  return {
    ...pokemonData,
    type: pokemonData.types[0].type.name,
    height: pokemonData.height,
    weight: pokemonData.weight,
    stats: pokemonStatsFormatted,
  };
};
export default api;
