import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface SpecieData {
  evolution_chain: {
    url: string;
  };
}

interface EvolutionData {
  evolution_details: {
    min_level: number;

    item: {
      name: string;
    };

    trigger: {
      name: string;
    };
  }[];

  evolves_to: EvolutionData[];

  species: {
    name: string;
    url: string;
  };
}

interface EvolutionChain {
  chain: EvolutionData;
}

interface Evolution {
  id: number;
  species_name: string;
  min_level: number | null;
  trigger_name: string | null;
  item_name: string | null;
}

export interface Props {
  pokemonID: number;
}

const getIDFromUrl = (url: string): number => {
  const re = /https:\/\/pokeapi\.co\/api\/v\d+\/[\w-]+\/(\d+)\/?/;
  const matches = url.match(re);
  return matches ? parseInt(matches[1]) || 0 : 0;
};

const Evolutions = ({pokemonID}: Props) => {
  const [mounted, setMounted] = useState(true);
  const [evolutions, setEvolutions] = useState<Evolution[]>();
  const pokeball = require('../../assets/pokeball.png');

  const fetchData = useCallback(async () => {
    const specieRequest = await fetch(
      'https://pokeapi.co/api/v2/' + `pokemon-species/${pokemonID}`,
    );
    const specieData = (await specieRequest.json()) as SpecieData;
    const chainRequest = await fetch(specieData.evolution_chain.url);
    const chainData = (await chainRequest.json()) as EvolutionChain;

    const evoChain: Evolution[] = [];
    let evoData = chainData.chain;

    do {
      let numberOfEvolutions = evoData.evolves_to.length;

      evoChain.push({
        id: getIDFromUrl(evoData.species.url),
        species_name: evoData.species.name,
        min_level: evoData.evolution_details[0]?.min_level,
        trigger_name: evoData.evolution_details[0]?.trigger.name,
        item_name: evoData.evolution_details[0]?.item?.name,
      });

      if (numberOfEvolutions > 1) {
        for (let i = 1; i < numberOfEvolutions; i++) {
          evoChain.push({
            id: getIDFromUrl(evoData.evolves_to[i]?.species.url),
            species_name: evoData.evolves_to[i]?.species.name,
            min_level: evoData.evolves_to[i]?.evolution_details[0]?.min_level,
            trigger_name:
              evoData.evolves_to[i]?.evolution_details[0]?.trigger.name,
            item_name: evoData.evolves_to[i]?.evolution_details[0]?.item?.name,
          });
        }
      }

      evoData = evoData.evolves_to[0];
    } while (mounted && !!evoData && evoData.evolves_to);

    setEvolutions(evoChain);
  }, []);

  useEffect(() => {
    fetchData();
    return () => setMounted(false);
  }, []);

  return (
    <View style={styles.container}>
      {evolutions?.map((data, index) => (
        <View style={styles.evolution} key={index}>
          <Image
            style={styles.pokemon}
            source={{
              uri:
                'https://raw.githubusercontent.com/' +
                'PokeAPI/sprites/master/sprites/pokemon/' +
                `other/official-artwork/${data.id}.png`,
            }}
          />
          <Text style={styles.id}>#{String(data.id).padStart(3, '0')}</Text>
          <Text style={styles.name}>{data.species_name}</Text>
          {data.min_level && (
            <Text style={styles.detail}>(Level {data.min_level})</Text>
          )}
          {data.item_name && (
            <Text style={styles.detail}>({data.item_name})</Text>
          )}
          <Image style={styles.pokeballPos} source={pokeball} />
        </View>
      ))}
    </View>
  );
};

export default Evolutions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  evolution: {
    alignItems: 'center',
    marginBottom: 35,
  },
  pokemon: {
    width: 150,
    height: 150,
  },
  id: {
    color: '#747476',
    marginTop: 30,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    color: '#000',
    fontSize: 12,
  },
  pokeballPos: {
    width: 150,
    height: 150,
    position: 'absolute',
    zIndex: -1,
    opacity: 0.035,
  },
});
