import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
const Settings = () => {
  const [search, setSearch] = useState(false);
  const [Insights, setInsights] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const sendFavorite = (logid) => {
    setFavorite(!favorite);
    // console.log(logid);
  };
  function imgsrc(item) {
    return (
      item.thumbnails["full"]?.url ||
      item.thumbnails["size-lg"]?.url ||
      item.thumbnails["size-md"]?.url
    );
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://webrazzi.com/api/v2/posts", {
        headers: undefined,
      });

      if (response.status === 200) {
        const json = await response.json();
        const insightsData = json.data.filter((item) => item.insights);
        setInsights(insightsData);
        console.log(insightsData, "sa");
        // console.log(json.data.thumbnails);
      } else {
        setInsights([]);
        // setImages([]);
      }
    }

    fetchData();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Header></Header>
        <ScrollView>
          <View
            style={{
              height: 170,
              backgroundColor: "#2c2929",
              marginBottom: -80,
            }}
          >
            <Text
              style={{
                marginLeft: 20,
                marginTop: 40,
                fontSize: 35,
                fontWeight: "bold",
              }}
            >
              <Text style={{ color: "#F3D02E" }}>W</Text>
              <Text style={{ color: "white" }}> insights</Text>
            </Text>
          </View>
          {Insights.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  height: 200,
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginHorizontal: 20,
                  marginTop: 10,

                  padding: 20,
                  marginBottom: 10,
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
                          ? require("../../assets/save.png")
                          : require("../../assets/favorite.png")
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
    </SafeAreaView>
  );
};

export default Settings;
