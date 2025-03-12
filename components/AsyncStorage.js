import React, { useEffect, useState} from "react";
import { StyleSheet, Text, View, TextInput,FlatList, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Produto from "./Produto";
import ListaRegistros from "./ListaRegistros";

export default function Storage(){
    const [registros, setRegistros] = useState([]);
    const [telaAtual, setTelaAtual] = useState('produto'); // Estado para controlar a tela

    const salvarNoAsyncStorage = async (qtd, produto, valor) => {
        try{
            const registro = {
                qtd,
                produto,
                valor,
            };
            //Recupera os registros anteriores do AsyncStorage
            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];

            //Adiciona o novo registro
            registros.push(registro);

            // Armazena novamente no AsyncStorage
            await AsyncStorage.setItem('registros', JSON.stringify(registros));

            Alert.alert('Sucesso', 'Registro salvo com sucesso!');
            carregarRegistros(); // Atualiza a lista após salvar

        } catch(error) {
            console.error('Erro ao salvar no AsyncStorage', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados');
        }
    };

    const apagarRegistros = async () => {
        try {
            await AsyncStorage.removeItem('registros');
            setRegistros([]);
            Alert.alert('Sucesso', 'Todos os registros foram apagados.');
        } catch (error) {
            console.error('Erro ao apagar registros:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao apagar os registros.');
        }
    };

    const apagarRegistroIndividual = async (index) => {
        try {
            const registrosExistentes = await AsyncStorage.getItem('registros');
            let registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];
            registros.splice(index, 1);
            await AsyncStorage.setItem('registros', JSON.stringify(registros));
            setRegistros(registros);
            Alert.alert('Sucesso', 'Registro apagado.');
        } catch (error) {
            console.error('Erro ao apagar registro:', error);
            Alert.alert('Erro', 'Não foi possível apagar o registro.');
        }
    };


    const carregarRegistros = async () => {
        try{
            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];
            setRegistros(registros); // Atualiza o estado com os registros recuperados
        } catch (error) {
            console.error('Erro ao carregar registros:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados.')
        }
    };

    useEffect(() => {
        carregarRegistros(); // Carrega os registros ao montar o componente
    },[])

    return (
        <View style={styles.container}>
            {telaAtual === 'produto' ? (
                <>
                    <Produto onSalvarDados={salvarNoAsyncStorage}
                    telaAtual={telaAtual}
                    setTelaAtual={setTelaAtual}
                    onApagarRegistros={apagarRegistros}/>
                </>
            ):(
                <>
                    <Text style={styles.titulo}>Registros Salvos:</Text>
                    <ListaRegistros registros={registros}
                    onApagarRegistro={apagarRegistroIndividual}/>
                    <Button
                    title= "Voltar para Cadastro"
                    onPress={() => setTelaAtual('produto')}/>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    item: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
  });  