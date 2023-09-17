import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import {
  HTMLElementModel,
  CustomRendererProps,
} from "react-native-render-html";
import HTML from "react-native-render-html";
import Header from "../../components/Header";
import { WebView } from "react-native-webview";

const StartupDetail = ({ route }) => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  const { newsId } = route.params;
  const [New, setNew] = useState({});

  const customHTMLElementModels = {
    iframe: new HTMLElementModel({
      tagName: "iframe",
      mixedUAStyles: { display: "none" }, // iframe processing
    }),
  };
  const renderers = {
    img: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
      if (_htmlAttribs.src && _htmlAttribs.src.startsWith("http")) {
        return (
          <Image
            source={{ uri: _htmlAttribs.src }}
            style={{ width: 100, height: 100 }}
          />
        );
      } else {
        console.log(
          "Attempted to render image with invalid or non-http src: ",
          _htmlAttribs.src
        );
      }
      return null;
    },

    iframe: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
      if (_htmlAttribs.src && _htmlAttribs.src.startsWith("http")) {
        return (
          <WebView
            source={{ uri: _htmlAttribs.src }}
            style={{ width: 350, height: 200 }}
          />
        );
      } else {
        console.log(
          "Attempted to render iframe with invalid or non-http src: ",
          _htmlAttribs.src
        );
      }
      return null;
    },
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://webrazzi.com/api/v2/posts/${newsId}`,
          {
            headers: undefined,
          }
        );

        if (response.status === 200) {
          const json = await response.json();
          console.log(json, "nunu");

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header></Header>
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            resizeMode="contain"
            source={{
              uri:
                New.author && New.author.avatar
                  ? New.author.avatar
                  : "https://via.placeholder.com/300",
            }}
          />
          <Text>{New.author && New.author.full_name}</Text>
          <View style={{ width: width }}>
            <Text>SA</Text>
            {/* {New.content && (
              <HTML
                customHTMLElementModels={customHTMLElementModels}
                renderers={renderers}
                source={{ html: New.content }}
                contentWidth={width}
                ignoredDomNode={(domNode) => domNode.name === "iframe"}
              />
            )} */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
