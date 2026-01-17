const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemonList(limit: number = 10) {
  const res = await fetch(`${BASE_URL}?limit=${limit}`);
  const data = await res.json();
  return data.results;
}

export async function fetchPokemonByName(name: string) {
  const res = await fetch(`${BASE_URL}/${name}`);
  const details = await res.json();

  return {
    name: details.name,
    height: details.height,
    weight: details.weight,
    stats: details.stats,
    image: details.sprites.front_default,
    imageBack: details.sprites.back_default,
    type: details.types,
    heldItems: details.held_items,
  };
}
