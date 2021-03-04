interface Pokemon {
  id: string;
  name: string;
  img: string;
  description: string;
  height: number;
  weight: number;
  types: string[];
  num: string;

  stats: {
    hp: number[];
    attack: number[];
    defence: number[];
    specialAttack: number[];
    specialDefence: number[];
    speed: number[];
  };
}
export default Pokemon;
