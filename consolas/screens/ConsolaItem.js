import { Icon, ListItem } from "@rneui/base";
import { TouchableHighlight, StyleSheet } from "react-native";
import { useManipulateConsolas } from "../hooks/useManipulateConsolas";

export const ConsolaItem = ({ item, navigation, onSuccess}) => {
    const { deleteConsolas } = useManipulateConsolas(onSuccess);
    return (
        <TouchableHighlight
            onPress={() => {
                navigation.navigate("ConsolaFormNav", { itemParam: item });
            }}
            underlayColor="#ddd"
        >
            <ListItem bottomDivider containerStyle={styles.listItem}>
                <ListItem.Content>
                    <ListItem.Title style={styles.title}>
                        {item.con_nombre}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitle}>
                        {item.con_almacenamiento} - {item.con_cantidad}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                    name="delete"
                    type="material"
                    color="red"
                    style={{ width: 40, height: 40 }}
                    size={40}
                    onPress={() => deleteConsolas(item)}
                />
            </ListItem>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    listItem: {
        paddingVertical: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
    },
});