import { Pokemon } from "@/src/models/PokemonModel";
import { fetchPokemonByName } from "@/src/Service/APIService";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const colorsByType: Record<string, string> = {
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

export default function DetailsScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemon, setPokemondataData] = useState<Pokemon>();
  const params = useLocalSearchParams();
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const result = await fetchPokemonByName(params.name as string);
      setPokemondataData(result);
    } catch (err) {
      setError("Failed to load Pokémon");
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <View>
        <Text>Loading Pokémon...</Text>
      </View>
    );
  } else {
    return (
      <>
        <Stack.Screen options={{ title: pokemon!.name }} />

        <ScrollView>
          <View
            style={[
              styles.header,
              {
                backgroundColor: colorsByType[pokemon!.type[0].type.name] + 90,
              },
            ]}
          >
            <View style={styles.imageRow}>
              <Image source={{ uri: pokemon!.image }} style={styles.image} />
              <Image
                source={{ uri: pokemon!.imageBack }}
                style={styles.image}
              />
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.name}>{pokemon!.name}</Text>

            <Text style={styles.description}>
              A mysterious Pokémon with unique abilities.
            </Text>

            <View style={styles.infoRow}>
              <View
                style={[
                  styles.infoBox,
                  {
                    backgroundColor:
                      colorsByType[pokemon!.type[0].type.name] + 50,
                  },
                ]}
              >
                <Text style={styles.infoLabel}>Height</Text>
                <Text style={styles.infoValue}>{pokemon!.height / 10} m</Text>
              </View>

              <View
                style={[
                  styles.infoBox,
                  {
                    backgroundColor:
                      colorsByType[pokemon!.type[0].type.name] + 50,
                  },
                ]}
              >
                <Text style={styles.infoLabel}>Weight</Text>
                <Text style={styles.infoValue}>{pokemon!.weight / 10} kg</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 260,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    textTransform: "capitalize",
    justifyContent: "center",
  },

  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },

  image: {
    width: 120,
    height: 120,
  },

  content: {
    padding: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  description: {
    color: "#555",
    marginVertical: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  infoBox: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "grey",
  },

  infoLabel: {
    fontSize: 12,
    color: "darkgrey",
    fontWeight: 600,
  },

  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
