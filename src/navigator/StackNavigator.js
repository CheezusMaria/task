import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DrawerNavigator from "./DrawerNavigator";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
