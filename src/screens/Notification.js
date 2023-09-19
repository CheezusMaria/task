import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
const Notification = () => {
  const date = new Date().toLocaleString();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header></Header>
      <View
        style={{
          height: 200,
          width: "100%",
          backgroundColor: "#808080",
          paddingLeft: 30,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 35,
            marginTop: 40,
            textDecorationLine: "underline",
            textDecorationColor: "#F3D02E",
          }}
        >
          Bildirimlerim
        </Text>
      </View>
      <View>
        <View
          style={{
            marginTop: -30,
            marginLeft: 20,
            width: "90%",
            height: 140,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginVertical: 30,
              marginHorizontal: 15,
            }}
          >
            {" "}
            Whatsapp kanallar özelliği Türkiye'deki kullanıcılara açılıyor |
            Webrazzi'nin kanalına abone olabilirsiniz!
          </Text>
          <Text style={{ color: "gray" }}>{date}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
