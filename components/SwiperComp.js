import { Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SwiperComp = ({ news, searchState }) => {
  const navigation = useNavigation();
  function imgsrc(news) {
    return news.thumbnails["full"].url;
  }

  const onItemPressed = (newsId) => {
    navigation.navigate("NewsDetail", { newsId });
  };
  return !searchState ? (
    <View style={{ height: 380, backgroundColor: "#F3D02E", paddingLeft: 30 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 15,
        }}
      >
        Öne Çıkanlar
      </Text>
      {/* list */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View
              key={index}
              style={{
                height: 300,
                width: 350,
                borderRadius: 10,
                marginRight: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  maxHeight: 170,
                  minHeight: 170,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <TouchableOpacity onPress={() => onItemPressed(item.id)}>
                  <Image
                    source={{
                      uri: imgsrc(item),
                    }}
                    resizeMode="cover"
                    style={{
                      width: "100%",
                      height: 170,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  paddingHorizontal: 15,
                  paddingTop: 10,
                  backgroundColor: "white",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <TouchableOpacity onPress={() => onItemPressed(item.id)}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 14,
                    marginVertical: 15,
                  }}
                >
                  {item.author.full_name}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  ) : null;
};

export default SwiperComp;
