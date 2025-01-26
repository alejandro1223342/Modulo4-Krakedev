import { View, Text, StyleSheet, FlatList } from "react-native"
import { Button, ListItem } from "@rneui/base"
import { getAllLaptops } from "../rest_laptops/laptops"
import { useState } from "react"

export const LaptopsList = () => {

    const [laptopsList, setLaptopsList] = useState([]);

    const LaptopItem = ({ laptops }) => {
        return <ListItem>
            <ListItem.Content>
                <ListItem.Title>{laptops.marca} {laptops.procesador}</ListItem.Title>
                <ListItem.Subtitle>{laptops.memoria}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    }

    const fnRefreshList = (laptops) => {
        setLaptopsList(laptops);
    }

    return <View>
        <Text>LISTA DE CONTACTOS</Text>
        <Button
            title="Consultar"
            onPress={() => {
                getAllLaptops(fnRefreshList);
            }}
        />
        <FlatList
            data={laptopsList}
            renderItem={({ item }) => {
                return <LaptopItem laptops={item} />
            }}
            keyExtractor={(item) => item.id.toString()} // Añadir keyExtractor

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