import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {ConsolaForm } from "./screens/ConsolaForm"
import { ConsolaList } from "./screens/ConsolaList";

export default function App() {
  //F2
  const StackConsolas = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackConsolas.Navigator initialRouteName="ConsolaListNav">
          <StackConsolas.Screen
            name="ConsolaListNav"
            component={ConsolaList}
          />
          <StackConsolas.Screen
            name="ConsolaFormNav"
            component={ConsolaForm}
          />
        </StackConsolas.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
