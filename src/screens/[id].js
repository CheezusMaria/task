import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { WebView } from "react-native-webview";
import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
const StartupDetail = ({ route }) => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  const { newsId } = route.params;
  const [New, setNew] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://webrazzi.com/api/v2/posts/${newsId}`
        );

        if (response.status === 200) {
          var json = await response.json();
          json.content = json.content.replaceAll("data-src", "src");
          setNew(json);
        } else {
          setNew({});
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ height: height, width: width, padding: 10 }}>
        <Text
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            marginLeft: 5,
            color: "gray",
            marginBottom: 3,
          }}
        >
          {New.categories?.[0]?.title && <Text>{New.categories[0].title}</Text>}
        </Text>
        {New.title ? (
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>{New.title}</Text>
        ) : null}
        <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
            resizeMode="contain"
            source={{
              uri:
                New.author && New.author.avatar
                  ? New.author.avatar
                  : "https://via.placeholder.com/300",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          >
            <Text style={{ color: "gray", fontWeight: "800" }}>
              {New.author && New.author.full_name}
            </Text>
            <Text style={{ color: "gray" }}>1 Saat önce</Text>
          </View>
        </View>
        {New.content && (
          <RenderHtml
            renderers={renderers}
            WebView={WebView}
            contentWidth={width}
            source={{ html: New.content }}
            customHTMLElementModels={customHTMLElementModels}
            renderersProps={{
              iframe: {
                scalesPageToFit: true,
                webViewProps: {
                  /* Any prop you want to pass to iframe WebViews */
                },
              },
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f16124",
    borderRadius: 10,
  },
  buttonTitle: {
    fontWeight: "bold",
  },
});

export default StartupDetail;
