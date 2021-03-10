interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name:
      | 'hp'
      | 'attack'
      | 'defense'
      | 'special-attack'
      | 'special-defense'
      | 'speed';
    url: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Move {
  move: {
    name: string;
    url: string;
  };
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Pokemon {
  id: string;
  name: string;
  img: string;
  description: string;
  height: number;
  weight: number;
  num: string;
  stats: Array<Stats>;
  types: Array<Type>;
  moves: Array<Move>;
  abilities: Array<Ability>;
}
export default Pokemon;
