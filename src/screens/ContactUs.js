import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/Header";
import { Linking } from "react-native";

const ContactUs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header showSearchBar={false} />
      <ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Webrazzi'ye ulaşın</Text>
          <Text style={styles.bannerText}>
            Tüm soru ve önerileriniz için bizimle iletişime geçebilirsiniz
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            Crenvo Bilişim Danışmanlık Reklam ve Tic. A.Ş.
          </Text>

          <View style={styles.contactLine}>
            <View style={styles.labelContainer}>
              <Text style={styles.contactLabel}>Telefon</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.contactInfo}>0 (216) 3385603</Text>
            </View>
          </View>
          <View style={styles.contactLine}>
            <Text style={styles.contactLabel}>Fax</Text>
            <Text style={styles.contactInfo}>0 (216) 3385602</Text>
          </View>
          <View style={styles.contactLine}>
            <Text style={styles.contactLabel}>Adres</Text>
            <Text style={styles.contactInfo}>Fenerbahçe Mah.</Text>
          </View>
          <View style={styles.contactLine}>
            <Text style={styles.contactLabel}>E-Posta</Text>
            <Text style={styles.contactInfo}>iletisim@webrazzi.com</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://www.google.com/maps/place/Webrazzi/@40.9734759,29.0428831,17z/data=!3m1!4b1!4m6!3m5!1s0x14cac7043a03fc05:0xe3b41c363268bec4!8m2!3d40.973476!4d29.047754!16s%2Fg%2F1hc50974r?entry=ttu"
            )
          }
        >
          <Image
            source={require("../../assets/webrazziLocation.png")}
            resizeMode="contain"
            style={{
              width: "100%",
              height: 300,
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: 200,
    backgroundColor: "#F3D02E",
    padding: 30,
  },
  bannerTitle: {
    fontSize: 30,
    marginVertical: 15,
    color: "white",
    fontWeight: "bold",
  },
  bannerText: {
    fontSize: 18,
    color: "white",
  },
  infoBox: {
    margin: 30,
  },
  infoTitle: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 15,
  },
  contactLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  contactLabel: {
    width: 100,
    color: "gray",
    fontWeight: "800",
    marginVertical: 3,
  },
  contactInfo: {
    fontWeight: "800",
  },
  contactLine: {
    flexDirection: "row",
    marginBottom: 8,
  },
  labelContainer: {
    width: "30%",
  },
  infoContainer: {
    width: "70%",
  },
});
export default ContactUs;
