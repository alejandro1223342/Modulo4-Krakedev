import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LaptopsList } from './screens/LaptopsList'; // Asegúrate de que esta ruta sea correcta


const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen 
             name="LaptopsListNav" 
             component={LaptopsList} 
           />
         </Stack.Navigator>
       </NavigationContainer>
  );
}


