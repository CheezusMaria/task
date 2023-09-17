import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsDetail from "./src/screens/[id]";
import ContactUs from "./src/screens/ContactUs";
import EntApplication from "./src/screens/EntApplication";
import BottomMenu from "./src/screens/BottomMenu";
import Profile from "./src/screens/Profile";
import Insights from "./src/screens/Insights";
import HomeScreen from "./src/screens/HomeScreen";
import Library from "./src/screens/Library";
import SignUp from "./src/screens/SignUp";
import NotificationScreen from "./src/screens/Notification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  function BottomMenu() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeScreen") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "account" : "account-box-outline";
            } else if (route.name === "Insights") {
              iconName = focused ? "star" : "star-outline";
            } else if (route.name === "Library") {
              iconName = focused ? "book" : "book-outline";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#F3D02E",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [{ display: "flex" }],
        })}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Insights" component={Insights} />
        <Tab.Screen name="Library" component={Library} />
      </Tab.Navigator>
    );
  }

  function StackNav() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={BottomMenu}
        />

        <Stack.Screen name="NewsDetail" component={NewsDetail} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ContactUs"
          component={ContactUs}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EntApplication"
          component={EntApplication}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Navigator>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Haberler" component={StackNav} />
          <Drawer.Screen name="İletişim" component={ContactUs} />
          <Drawer.Screen name="Girişim Başvurusu" component={EntApplication} />
          <Drawer.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
        </Drawer.Navigator>
        {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={BottomMenu} />
          <Stack.Screen name="NewsDetail" component={NewsDetail} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="EntApplication" component={EntApplication} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </GestureHandlerRootView>
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
