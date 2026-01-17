export interface Pokemon {
  name: string;
  image: string;
  height: number;
  weight: number;
  imageBack: string;

  type: PokemonType[];

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}
