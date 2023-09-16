import { StyleSheet, Text, View, Platform, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";
import { StatusBar } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

import { useNavigation } from "@react-navigation/native";

const Header = ({ showSearchIcon, showNotiIcon }) => {
  const [search, setSearch] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          paddingVertical: 15,
          paddingHorizontal: 15,
          ...Platform.select({
            ios: {
              shadowColor: "black",
              shadowOpacity: 0.3,
              shadowOffset: { width: 0, height: 5 },
              shadowRadius: 10,
            },
            android: {
              elevation: 10,
            },
          }),
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 120,
            height: 30,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: !showSearchIcon && !showNotiIcon ? "10%" : "30%",
          }}
        >
          {showSearchIcon ? (
            <TouchableOpacity onPress={() => setSearch(!search)}>
              <Image
                source={require("../assets/search.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          ) : null}
          {showNotiIcon ? (
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={require("../assets/noti.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Image
              source={require("../assets/Menu.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
