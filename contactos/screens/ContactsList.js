import { View, Text, StyleSheet } from "react-native"
import { Button } from "@rneui/base"
import { getAllContacts } from "../rest_client/contactos"
export const ContactsList = () => {
    return <View>
        <Text>LISTA DE CONTACTOS</Text>
        <Button
            title="Consultar"
            onPress={() => {
                getAllContacts()
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
