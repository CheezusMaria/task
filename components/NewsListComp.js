import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Platform } from "react-native";
import { Image } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NewsListComp = ({ NewsList, searchState }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredList = NewsList.filter((item) =>
    item.categories[0].title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  function imgsrc(item) {
    return (
      item.thumbnails["full"]?.url ||
      item.thumbnails["size-lg"]?.url ||
      item.thumbnails["size-md"]?.url
    );
  }

  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(false);
  const sendFavorite = async (logid) => {
    // try {
    //   let favorites = await AsyncStorage.getItem("@favorite");
    //   favorites = favorites == null ? [] : JSON.parse(favorites);
    //   if (favorites.includes(logid)) {
    //     const index = favorites.indexOf(logid);
    //     if (index > -1) {
    //       favorites.splice(index, 1);
    //     }
    //   } else {
    //     favorites.push(logid);
    //   }
    //   await AsyncStorage.setItem("@favorite", JSON.stringify(favorites));
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const onItemPressed = (newsId) => {
    navigation.navigate("NewsDetail", { newsId });
  };

  return (
    <View>
      {searchState && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TextInput
            placeholder="   Webrazzi'de arayın..."
            style={{
              height: 40,
              width: "75%",
              borderColor: "gray",
              borderWidth: 3,
              borderRadius: 10,
            }}
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
      )}

      <View>
        <ScrollView>
          {filteredList.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  height: 200,
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginHorizontal: 20,

                  padding: 20,
                  marginBottom: 20,
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
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.categories[0].title}
                  </Text>

                  {item.insights && (
                    <Text style={{ marginLeft: 20, color: "gray" }}>
                      WEBRAAZI INSIGHTS
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    marginTop: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    overflow: "hidden",
                  }}
                >
                  <Text style={{ width: "60%", fontSize: 14 }}>
                    {item.excerpt}
                  </Text>

                  <Image
                    source={{
                      uri: imgsrc(item),
                    }}
                    style={{
                      width: 100,
                      height: 70,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {item.author.full_name}
                    </Text>
                    <View style={{ width: 10 }} />
                    <Text>{item.published_at.split(" ")[0]}</Text>
                  </View>
                  <TouchableOpacity onPress={() => sendFavorite(item.id)}>
                    <Image
                      source={
                        favorite
                          ? require("../assets/save.png")
                          : require("../assets/favorite.png")
                      }
                      resizeMode="cover"
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default NewsListComp;
