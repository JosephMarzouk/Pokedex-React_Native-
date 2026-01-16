import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  type: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

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
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10"
      );
      const data = await response.json();
      console.log(data);

      // Fetch Pokemin details
      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            type: details.types,
          };
        })
      );
      setPokemondataData(detailedPokemon);
    } catch (e) {
      console.log(e);
    }
  }
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
          href={"/details"}
          style={{
            //@ts-ignore
            backgroundColor: colorsByType[pokemon.type[0].type.name] + 50,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.type[0].type.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 100, height: 100 }}
              ></Image>
              <Image
                source={{ uri: pokemon.imageBack }}
                style={{ width: 100, height: 100 }}
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
