import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ContactUs from "../screens/ContactUs";
import EntApplication from "../screens/EntApplication";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Haberler" component={HomeScreen} />
      <Drawer.Screen name="İletişim" component={ContactUs} />
      <Drawer.Screen name="Girişiminizi Tanıtın" component={EntApplication} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
