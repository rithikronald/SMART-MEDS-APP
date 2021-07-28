import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ScannerScreen from "./screens/ScannerScreen";
import PharmacyScannerScreen from "./screens/PharmacyScannerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrescriptionScreen from "./screens/PrescriptionScreen";
import ViewPrescription from "./screens/ViewPrescription";
import PharmacyPrescription from "./screens/PharmacyPrescription";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="ScannerScreen"
      >
        <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
        <Stack.Screen
          name="PharmacyScannerScreen"
          component={PharmacyScannerScreen}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="PrescriptionScreen"
          component={PrescriptionScreen}
        />
        <Stack.Screen name="ViewPrescription" component={ViewPrescription} />
        <Stack.Screen
          name="PharmacyPrescription"
          component={PharmacyPrescription}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
