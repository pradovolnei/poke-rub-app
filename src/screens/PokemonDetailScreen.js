import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import api from '../api/pokeapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PokemonDetailScreen({ route }) {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`pokemon/${name}`);
      setPokemon(res.data);
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>
      <Text>Altura: {pokemon.height}</Text>
      <Text>Peso: {pokemon.weight}</Text>
      <Text>Tipo(s): {pokemon.types.map(t => t.type.name).join(', ')}</Text>
      <Text>Habilidades: {pokemon.abilities.map(a => a.ability.name).join(', ')}</Text>

      <Button title="Favoritar" onPress={handleFavorite} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
