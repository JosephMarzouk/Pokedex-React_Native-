import { Pokemon } from "@/src/models/PokemonModel";
import { fetchPokemonByName, fetchPokemonList } from "@/src/Service/APIService";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const colorsByType = {
  grass: "#74CB48",
  water: "#6493EB",
  fire: "#F57D31",
  electric: "#F9CF30",
  psychic: "#FB5584",
  poison: "#A43E9E",
  bug: "#A7B723",
  flying: "#A891EC",
  fighting: "#C12239",
  normal: "#AAA67F",
  rock: "#B69E31",
  ground: "#DEC16B",
  ghost: "#70559B",
  dark: "#75574C",
  steel: "#B7B9D0",
  fairy: "#E69EAC",
  dragon: "#7037FF",
  ice: "#9AD6DF",
  unknown: "#D8D8D8",
};

export default function Index() {
  const [pokemons, setPokemondataData] = useState<Pokemon[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const list = await fetchPokemonList(10);

    const detailed = await Promise.all(
      list.map((p: any) => fetchPokemonByName(p.name))
    );

    setPokemondataData(detailed);
  }
  //Fetching Data
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   try {
  //     const response = await fetch(
  //       "https://pokeapi.co/api/v2/pokemon/?limit=30"
  //     );
  //     const data = await response.json();
  //     console.log(data);

  //     // Fetch Pokemin details
  //     const detailedPokemon = await Promise.all(
  //       data.results.map(async (pokemon: any) => {
  //         const res = await fetch(pokemon.url);
  //         const details = await res.json();
  //         return {
  //           name: pokemon.name,
  //           height: details.height,
  //           weight: details.weight,
  //           stats: details.stats,
  //           image: details.sprites.front_default,
  //           imageBack: details.sprites.back_default,
  //           type: details.types,
  //           heldItems: details.held_items,
  //         };
  //       })
  //     );
  //     console.log(detailedPokemon);
  //     setPokemondataData(detailedPokemon);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 10,
      }}
    >
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{ pathname: "/details", params: { pokemon: pokemon.name } }}
          style={{
            //@ts-ignore
            backgroundColor: colorsByType[pokemon.type[0].type.name] + 50,
            padding: 20,
            borderRadius: 20,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.type[0].type.name}</Text>

            <View style={{ flexDirection: "row" , justifyContent: "center"}}>
              <Image
                source={{ uri: pokemon.image }}
                style={{
                  flexDirection: "row",
                  justifyContent: "center", 
                  width: 100,
                  height:100
                }}
              ></Image>
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    color: "grey",
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
  },
});
