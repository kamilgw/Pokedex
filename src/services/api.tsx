import axios from 'axios';

export default axios.create({
  baseURL:
    'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json',
});
