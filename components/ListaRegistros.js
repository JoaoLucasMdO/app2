import React from 'react';
import { FlatList, View, Text, StyleSheet, Button } from 'react-native';

const ListaRegistros = ({ registros, onApagarRegistro }) => {
  return (
    <FlatList
      data={registros}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.item}>
          <Text style={styles.label}>Quantidade: <Text style={styles.value}>{item.qtd}</Text></Text>
          <Text style={styles.label}>Produto: <Text style={styles.value}>{item.produto}</Text></Text>
          <Text style={styles.label}>Valor: <Text style={styles.value}>{item.valor}</Text></Text>
          <Button title="Apagar Registro" onPress={() => onApagarRegistro(index)}/>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#555',
  },
});

export default ListaRegistros;
