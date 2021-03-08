import {addFavorite, removeFavorite, listFavorites} from '../services/database';
import {
  TypeKeys,
  AddFavoriteAction,
  RemoveFavoriteAction,
  GetFavoritesAction,
} from './favoritesTypes';
import {Pokemon} from '../types/pokemon';

export const getStoredFavorites = () => {
  return async (dispatch) => {
    let storedFavorites: Array<Pokemon> = [];

    const response = (await listFavorites()).rows;

    for (let index = 0; index < response.length; index++) {
      const storedPokemon: {id: number; pokemon: string} = response.item(index);
      const parsedPokemon = JSON.parse(storedPokemon['pokemon']) as Pokemon;

      storedFavorites.push(parsedPokemon);
    }

    return dispatch({
      type: TypeKeys.GET_FAVORITES,
      favorites: storedFavorites,
    });
  };
};

export const addFavorite = (pokemonData: Pokemon): AddFavoriteAction => {
  addFavorite(pokemonData);
  return {
    type: TypeKeys.ADD_FAVORITE,
    pokemonData: pokemonData,
  };
};

export const removeFavorite = (pokemonId: number): RemoveFavoriteAction => {
  emoveFavorite(pokemonId);
  return {
    type: TypeKeys.REMOVE_FAVORITE,
    pokemonId: pokemonId,
  };
};
