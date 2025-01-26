import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LaptopsList } from './screens/LaptopsList'; // Asegúrate de que esta ruta sea correcta
import {LaptopsForm} from './screens/LaptopsForm'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
         <Stack.Navigator initialRouteName='LaptopsListNav'>
           <Stack.Screen 
             name="LaptopsListNav" 
             component={LaptopsList} 
           />
           <Stack.Screen 
             name="LaptopsFormNav" 
             component={LaptopsForm} 
           />
         </Stack.Navigator>
       </NavigationContainer>
  );
}


