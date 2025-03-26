import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

export default function ModalComponent({ modalVisible, setModalVisible, onConfirm }) {
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Você tem certeza?</Text>
                <View style={styles.modalButtons}>
                    <Button title="Sim" onPress={() => { 
                        onConfirm(); // Apaga os registros
                        setModalVisible(false); // Fecha o modal
                    }} />
                    <Button title="Não" onPress={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});
