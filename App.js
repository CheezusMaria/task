import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "./src/navigator/StackNavigator";
import NewsDetail from "./src/screens/[id]";
import ContactUs from "./src/screens/ContactUs";
import EntApplication from "./src/screens/EntApplication";
import BottomMenu from "./src/screens/BottomMenu";
export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={StackNavigator} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="EntApplication" component={EntApplication} />
        <Stack.Screen name="BottomMenu" component={BottomMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
