import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const ListaRegistros = ({ registros }) => {
  return (
    <FlatList
      data={registros}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>Quantidade: {item.qtd}</Text>
          <Text>Produto: {item.produto}</Text>
          <Text>Valor: {item.valor}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ListaRegistros;
