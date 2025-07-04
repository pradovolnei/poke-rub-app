import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import api from '../api/pokeapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const typeColors = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  bug: '#A8B820',
  normal: '#A8A878',
  poison: '#A040A0',
  ground: '#E0C068',
  fairy: '#EE99AC',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  ice: '#98D8D8',
  fighting: '#C03028',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0',
};

export default function PokemonDetailScreen({ route, navigation }) {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`pokemon/${name}`);
      setPokemon(res.data);

      const speciesRes = await api.get(`pokemon-species/${name}`);
      const evoRes = await fetch(speciesRes.data.evolution_chain.url);
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

  if (!pokemon) {
    return <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />;
  }

  const primaryType = pokemon.types[0].type.name;
  const backgroundColor = typeColors[primaryType] || '#ccc';

  const nextEvolutionIndex = evolutions.indexOf(name) + 1;
  const nextEvolution = evolutions[nextEvolutionIndex];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>

      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
      />

      <Text style={styles.label}>Altura: {pokemon.height}</Text>
      <Text style={styles.label}>Peso: {pokemon.weight}</Text>

      <Text style={styles.sectionTitle}>Tipo(s):</Text>
      <View style={styles.badgeContainer}>
        {pokemon.types.map((t) => (
          <Text key={t.type.name} style={styles.badge}>
            {t.type.name}
          </Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Habilidades:</Text>
      <View style={styles.badgeContainer}>
        {pokemon.abilities.map((a) => (
          <Text key={a.ability.name} style={styles.badge}>
            {a.ability.name}
          </Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Linha de Evolução:</Text>
      <Text style={styles.label}>{evolutions.join(' → ')}</Text>

      {nextEvolution && (
        <Button
          title={`Ver evolução: ${nextEvolution.toUpperCase()}`}
          onPress={() => navigation.push('Detalhes', { name: nextEvolution })}
        />
      )}

      <View style={{ marginTop: 10 }}>
        <Button title="Favoritar" onPress={handleFavorite} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#ffffff80',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 4,
    fontSize: 14,
  },
});
