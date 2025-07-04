import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import api from '../api/pokeapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PokemonDetailScreen({ route }) {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`pokemon/${name}`);
      setPokemon(res.data);

      const speciesRes = await api.get(`pokemon-species/${name}`);
      const evolutionUrl = speciesRes.data.evolution_chain.url;

      const evoRes = await fetch(evolutionUrl);
      const evoData = await evoRes.json();

      const evoNames = [];
      let current = evoData.chain;

      while (current) {
        evoNames.push(current.species.name);
        current = current.evolves_to[0];
      }

      setEvolutions(evoNames);
    }

    fetchData();
  }, [name]);

  const handleFavorite = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    const favorites = stored ? JSON.parse(stored) : [];
    if (!favorites.includes(name)) {
      favorites.push(name);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  if (!pokemon) return <Text>Carregando...</Text>;

  const nextEvolutionIndex = evolutions.indexOf(name) + 1;
  const nextEvolution = evolutions[nextEvolutionIndex];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>
      <Text>Altura: {pokemon.height}</Text>
      <Text>Peso: {pokemon.weight}</Text>
      <Text>Tipo(s): {pokemon.types.map(t => t.type.name).join(', ')}</Text>
      <Text>Habilidades: {pokemon.abilities.map(a => a.ability.name).join(', ')}</Text>

      <Text style={styles.subtitle}>Linha de Evolução:</Text>
      <Text>{evolutions.join(' → ')}</Text>

      {nextEvolution && (
        <Button
          title={`Ver evolução: ${nextEvolution.toUpperCase()}`}
          onPress={() =>
            route.params.navigation.navigate('Detalhes', { name: nextEvolution })
          }
        />
      )}

      <View style={{ marginTop: 10 }}>
        <Button title="Favoritar" onPress={handleFavorite} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
});
