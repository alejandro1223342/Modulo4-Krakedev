import { View, Text, StyleSheet, Alert } from "react-native"
import { Input, Button } from '@rneui/base'
import { useState } from "react"
import { saveLaptopRest } from '../rest_laptops/laptops'
import { updateLaptopRest } from '../rest_laptops/laptops'
import { deleteLaptopRest } from '../rest_laptops/laptops'

export const LaptopsForm = ({ navigation, route }) => {

    let laptopRetrieved = route.params.laptopsParam;
    let isNew = true;
    if (laptopRetrieved != null) {
        isNew = false;
    }

    const [marca, setMarca] = useState(isNew ? null : laptopRetrieved.marca);
    const [procesador, setProcesador] = useState(isNew ? null : laptopRetrieved.procesador);
    const [memoria, setMemoria] = useState(isNew ? null : laptopRetrieved.memoria);
    const [disco, setDisco] = useState(isNew ? null : laptopRetrieved.disco);
    const showMessage = (message) => {
        Alert.alert("Confirmacion",message)
        navigation.goBack();
    }
    const saveLaptop = () => {

        saveLaptopRest(
            {
                marca: marca,
                procesador: procesador,
                memoria: memoria,
                disco: disco
            },
            //Segundo Parametro
            showMessage
        );

    }
    const updateLaptop = () => {
        console.log("actualizando contacto"),
        {
            id: laptopRetrieved.id,
            marca: marca,
            procesador: procesador,
            memoria: memoria,
            disco: disco
        },
            updateLaptopRest({}, showMessage)
    }

    const confirmDelete = () => {
        Alert.alert("Confirmacion", "Esta seguro de que quiere eliminar", [{
            text: "Si",
            onPress: () => {
                deleteLaptops();
            } 
        },
        {
            text: "Cancelar"
        }
        ]);
    }

    const deleteLaptops = () => {
        console.log("invoca al rest de borrar")
        deleteLaptopRest({
            id:laptopRetrieved.id
        },showMessage)
    }
    return <View style={styles.container}>
        <Input
            value={marca}
            placeholder="Marca"
            onChangeText={(value) => {
                setMarca(value);
            }}
        />
        <Input
            value={procesador}
            placeholder="Procesador"
            onChangeText={(value) => {
                setProcesador(value);
            }}
        /><Input
            value={memoria}
            placeholder="Memoria"
            onChangeText={(value) => {
                setMemoria(value);
            }}
        /><Input
            value={disco}
            placeholder="Disco"
            onChangeText={(value) => {
                setDisco(value);
            }}
        />
        <Button
            title="Guardar"
            onPress={isNew ? saveLaptop : updateLaptop}
        />
        {
            isNew ? <View></View> :
                <Button
                    title="Eliminar"
                    onPress={confirmDelete}
                />
        }

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