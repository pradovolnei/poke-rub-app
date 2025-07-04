import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, SafeAreaView } from 'react-native';
import api from '../api/pokeapi';
import PokemonCard from '../components/PokemonCard';

export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadPokemons() {
      const res = await api.get('pokemon?limit=1000');
      setPokemonList(res.data.results);
    }

    loadPokemons();
  }, []);

  const filtered = pokemonList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView>
      <TextInput
        style={{ margin: 10, padding: 10, borderWidth: 1, borderRadius: 8 }}
        placeholder="Buscar Pokémon"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            onPress={() => navigation.navigate('Detalhes', { name: item.name })}
          />
        )}
      />
    </SafeAreaView>
  );
}
