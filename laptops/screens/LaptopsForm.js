import { View, Text, StyleSheet,Alert } from "react-native"
import { Input, Button } from '@rneui/base'
import { useState } from "react"
import {saveLaptopRest} from '../rest_laptops/laptops'
import {updateLaptopRest} from '../rest_laptops/laptops'

export const LaptopsForm = ({navigation,route}) => {

    let laptopRetrieved = route.params.laptopsParam;
   let isNew = true;
    if(laptopRetrieved!=null){
        isNew=false;
    }
    
    const [marca, setMarca] = useState(isNew?null:laptopRetrieved.marca);
    const [procesador, setProcesador] = useState(isNew?null:laptopRetrieved.procesador);
    const [memoria, setMemoria] = useState(isNew?null:laptopRetrieved.memoria);
    const [disco, setDisco] = useState(isNew?null:laptopRetrieved.disco);
    const showMessage = () => {
        Alert.alert("Confirmacion",isNew?"Se creo la laptop":"Contacto Actualizado")
        navigation.goBack();
    }
    const saveLaptop = () =>{

        saveLaptopRest(
            {
                marca:marca,
                procesador:procesador,
                memoria:memoria,
                disco:disco
            },
            //Segundo Parametro
            showMessage
        );
       
    }
    const updateLaptop = ()=>{
        console.log("actualizando contacto"),
        {
            id:laptopRetrieved.id,
            marca:marca,
            procesador:procesador,
            memoria:memoria,
            disco:disco
        },
        updateLaptopRest({},showMessage)
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
        onPress={isNew?saveLaptop:updateLaptop}
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