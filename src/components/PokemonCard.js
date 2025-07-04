import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PokemonCard({ name, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{name.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
