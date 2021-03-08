import {db} from '../database/connection';
import {Pokemon} from '../types/Pokemon';

const table = 'favorites';

const insertQuery = `INSERT INTO ${table} (id, pokemon) VALUES(?, ?)`;
const deleteQuery = `DELETE FROM ${table} WHERE id = ?`;
const selectQuery = `SELECT * FROM ${table}`;

export interface Props {
  favoriteData: Pokemon;
}

export const addFavorite = ({pokemonData}: Props) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertQuery,
        [favoriteData.id, JSON.stringify(favoriteData)],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
};

export const removeFavorite = (pokemonId: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      deleteQuery,
      [pokemonId],
      () => {},
      (_, err) => {
        reject(err);
      },
    );
  });
};


export const listFavorites = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        selectQuery,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
};
