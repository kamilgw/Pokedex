import Axios from 'axios';
import Pokemon from '../types';
const axios = Axios.create();

export default {
    pokemonList: async (): Promise<Pokemon[]>
}
