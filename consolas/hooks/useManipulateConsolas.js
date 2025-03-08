import { useState } from "react";
import { Alert } from "react-native";
import { saveConsolasRest, updateConsolasRest, deleteConsolasRest } from "../rest_client/consolas";

export const useManipulateConsolas = (onSuccess, consolas = null) => {

    const [con_nombre, setCon_Nombre] = useState(consolas?.con_nombre || "");
    const [con_almacenamiento, setCon_Almacenamiento] = useState(consolas?.con_almacenamiento || "");
    const [con_cantidad, setCon_Cantidad] = useState(consolas?.con_cantidad.toString() || "");


    const showMessage = () => {
        Alert.alert("ÉXITO", consolas ? "Consola Actualizada" : "Consola guardada.");
    }

    const saveConsolas = async () => {
        if (!con_nombre || !con_almacenamiento || !con_cantidad) {
            Alert.alert("ERROR", "Todos los campos son obligatorios.");
            return
        }

        try {
            saveConsolasRest({ con_nombre, con_almacenamiento, con_cantidad }, showMessage);
            if (onSuccess) onSuccess();

        } catch (error) {
            Alert.alert("Error", "Hubo un problema al guardar la consola.");
        }
    };

    const updateConsolas = async () => {
        try {
            updateConsolasRest(
                { id: consolas.con_id, con_nombre, con_almacenamiento, con_cantidad },
                showMessage
            );
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al actualizar la consola.");
        }
    }

    const deleteConsolas = async ({ con_id, con_nombre }) => {
        Alert.alert(
            "Confirmación",
            `¿Estás seguro de que deseas eliminar la consola "${con_nombre}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            const result = await deleteConsolasRest(con_id);
                            if (result.message) {
                                const isError = result.message.toLowerCase().includes("no encontrada");
                                Alert.alert(isError ? "Error" : "Éxito", result.message);
                            }
                            if (onSuccess) onSuccess();
                        } catch (error) {
                            console.log(error);
                            Alert.alert("Error", "No se pudo eliminar la consola.");
                        }
                    },
                },
            ]
        );
    };


    return {
        con_nombre,
        con_almacenamiento,
        con_cantidad,
        setCon_Nombre,
        setCon_Almacenamiento,
        setCon_Cantidad,
        saveConsolas,
        updateConsolas,
        deleteConsolas
    }
}