import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokemonCard from '../components/PokemonCard';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    setFavorites(stored ? JSON.parse(stored) : []);
  };

  const removeFavorite = async (name) => {
    Alert.alert(
      'Remover favorito',
      `Deseja remover ${name.toUpperCase()} dos favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            const updated = favorites.filter((item) => item !== name);
            await AsyncStorage.setItem('favorites', JSON.stringify(updated));
            setFavorites(updated);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PokemonCard
              name={item}
              onPress={() => navigation.navigate('Detalhes', { name: item })}
            />
            <Button title="❌" onPress={() => removeFavorite(item)} />
          </View>
        )}
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Text style={{ textAlign: 'center' }}>Nenhum favorito salvo.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
