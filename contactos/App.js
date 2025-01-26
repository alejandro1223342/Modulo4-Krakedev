import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContactsList } from './screens/ContactsList'; // Asegúrate de que esta ruta sea correcta

// Crear el stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="ContactsListNav" 
          component={ContactsList} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
