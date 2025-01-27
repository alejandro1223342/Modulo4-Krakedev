import { View, Text, StyleSheet, FlatList, TouchableHighlight } from "react-native"
import { Button, ListItem } from "@rneui/base"
import { getAllLaptops } from "../rest_laptops/laptops"
import { useState,useEffect } from "react"
import { FAB } from '@rneui/themed';

export const LaptopsList = ({ navigation }) => {

    const [laptopsList, setLaptopsList] = useState([]);
    useEffect(()=>{
        console.log("Ejecuto useEfeect")
        getAllLaptops(fnRefreshList);

    },[]);
    const LaptopItem = ({ laptops }) => {
        return <TouchableHighlight onPress={() => {
            navigation.navigate("LaptopsFormNav",{laptopsParam:laptops});
        }}>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{laptops.marca} {laptops.procesador}</ListItem.Title>
                    <ListItem.Subtitle>{laptops.memoria}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem></TouchableHighlight>
    }

    const fnRefreshList = (laptops) => {
        setLaptopsList(laptops);
    }

    return <View style={styles.container}>
        
        <FlatList
            data={laptopsList}
            renderItem={({ item }) => {
                return <LaptopItem laptops={item} />
            }}
            keyExtractor={(item) => item.id.toString()} // Añadir keyExtractor

        />
        <FAB
            title="+"
            onPress={() => {
                navigation.navigate("LaptopsFormNav",{})
            }}
        />
    </View>


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
});