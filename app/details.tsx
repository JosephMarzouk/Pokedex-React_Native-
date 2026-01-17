import { Pokemon } from "@/src/models/PokemonModel";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function DetailsScreen() {
  
  const params = useLocalSearchParams();
  console.log(params.name);
  useEffect(() => {}, []);
    const [pokemons, setPokemondataData] = useState<Pokemon[]>([]);
  

  return (
    <>
      <Stack.Screen
        options={{
         
          title: params.name as string,
         
        }}
      />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 10,
          margin : 10
        }}
      >
<Text>{params.name}</Text>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
