import { Button, Input } from "@rneui/base";
import { View, StyleSheet } from "react-native"
import { useManipulateConsolas } from "../hooks/useManipulateConsolas";

export const ConsolaForm = ({ navigation, route }) => {
    let consolaRetrieved = route.params?.itemParam;
    const { con_nombre,con_almacenamiento,con_cantidad,setCon_Nombre,setCon_Almacenamiento,setCon_Cantidad,saveConsolas,updateConsolas } = useManipulateConsolas(() => navigation.goBack(), consolaRetrieved);
    return (
        <View style={styles.container}>
            <Input
                value={con_nombre}
                placeholder="Nombre"
                onChangeText={setCon_Nombre}
            />
            <Input
                value={con_almacenamiento}
                placeholder="Almacenamiento"
                onChangeText={setCon_Almacenamiento}
            />
            <Input
                value={con_cantidad}
                placeholder="Cantidad"
                onChangeText={setCon_Cantidad}
            />
            
            <Button
                title="GUARDAR"
                onPress={consolaRetrieved ? updateConsolas : saveConsolas}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
});