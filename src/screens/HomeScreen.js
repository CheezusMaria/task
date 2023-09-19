import { StyleSheet, Text, View, Platform, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";
import { StatusBar } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Header from "../../components/Header";
import SwiperComp from "../../components/SwiperComp";
import NewsListComp from "../../components/NewsListComp";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState(false);

  const onSignUpPressed = (newsId) => {
    navigation.navigate("NewsDetail", { newsId });
  };

  const [News, setNews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://webrazzi.com/api/v2/posts", {
        headers: undefined,
      });

      if (response.status === 200) {
        const json = await response.json();
        setNews(json.data);
        console.log(News[0], "sa");
        // console.log(json.data.thumbnails);
      } else {
        setNews([]);
      }
    }

    fetchData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {Platform.OS === "ios" ? (
        <ExpoStatusBar backgroundColor="white" style="auto" />
      ) : (
        <StatusBar backgroundColor="white" barStyle={"dark-content"} />
      )}

      {/* <Header></Header> */}
      <ScrollView>
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
            source={require("../../assets/logo.png")}
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
              width: "30%",
            }}
          >
            <TouchableOpacity onPress={() => setSearch(!search)}>
              <Image
                source={require("../../assets/search.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "NotificationScreen" }],
                });
              }}
            >
              <Image
                source={require("../../assets/noti.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Image
                source={require("../../assets/Menu.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <SwiperComp searchState={search} news={News.slice(0, 7)}></SwiperComp>

        <View>
          <NewsListComp
            searchState={search}
            NewsList={News.slice(7)}
          ></NewsListComp>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
