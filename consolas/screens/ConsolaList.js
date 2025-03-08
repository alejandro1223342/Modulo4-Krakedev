import { View, StyleSheet, Text, FlatList } from "react-native";
import { useConsolas } from "../hooks/useConsolas";
import { FAB } from "@rneui/base";
import { useEffect } from "react";
import { ConsolaItem } from "./ConsolaItem";

export const ConsolaList = ({ navigation }) => {
    const { data, loadConsolas } = useConsolas();

    // Carga inicial y en Navegación
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", loadConsolas);
        return unsubscribe;
    }, [navigation, loadConsolas]);

    const handleSuccess = () => {
        loadConsolas(); // Recarga la lista después de eliminar una consola
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>LISTA DE CONSOLAS</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.con_id.toString()}
                renderItem={({ item }) => (
                    <ConsolaItem item={item} navigation={navigation} onSuccess={handleSuccess} />
                )}
                style={styles.list}
            />
            <FAB
                title="+"
                placement="right"
                onPress={() => navigation.navigate("ConsolaFormNav", {})}
                buttonStyle={styles.fab}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
    },
    header: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    list: {
        width: "100%",
    },
    fab: {
        backgroundColor: "#007bff",
    },
});