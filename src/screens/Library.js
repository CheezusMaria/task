import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { theme } from "../../core/theme";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";
const Library = () => {
  const { userToken, setUserToken } = useContext(AuthContext);
  console.log(userToken, "selam token");
  const [Warning, setWarning] = useState(false);
  const [WarningCred, setWarningCred] = useState(false);
  const [UserFullName, setUserFullName] = useState("");
  const [UserEmailAdress, setUserEmailAdress] = useState("");

  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Lütfen şifre giriniz")
      .min(8, "Şifre en az 8 karakter olmalı"),

    email: Yup.string()
      .required("Lütfen e-posta adresi giriniz")
      .email("E-posta adresi geçersiz"),
  });
  // const checkUserCookie = async () => {
  //   let userCookie;
  //   try {
  //     userCookie = await AsyncStorage.getItem("cookie");
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   setCookie(userCookie === "true" ? "true" : "false");
  // };
  useFocusEffect(
    React.useCallback(() => {
      const loadUserToken = async () => {
        try {
          const storedUserToken = await AsyncStorage.getItem("userToken");
          if (storedUserToken) {
            setUserToken(storedUserToken);
          }
        } catch (e) {
          console.error("Failed to load the user token from storage", e);
        }
      };

      loadUserToken();
    }, [])
  );

  // useEffect(() => {
  //   checkUserCookie();
  // }, []);
  const onSignInPressed = async (values) => {
    const { email, password } = values;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response._tokenResponse.email);
      const userToken = response._tokenResponse.idToken;
      setUserToken(userToken);
      console.log(userToken, "userToken Saved");
      setUserEmailAdress(response._tokenResponse.email);
      setShowProfile(true);

      try {
        await AsyncStorage.setItem("userToken", userToken); // storing the token in AsyncStorage
      } catch (e) {
        console.error("Failed to save the user token to storage", e);
      }
    } catch (err) {
      setWarningCred(true);
      console.log(err.message, "error");
    }
  };
  return (
    <SafeAreaView>
      <Header></Header>
      <ScrollView>
        <View
          style={{
            height: 170,
            backgroundColor: "#2c2929",
            marginBottom: -90,
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
            <Text
              style={{
                color: "white",
                textDecorationLine: "underline",
                textDecorationColor: "#F3D02E",
              }}
            >
              {" "}
              Koleksiyonlarım
            </Text>
          </Text>
        </View>

        {userToken ? (
          <View>
            <Image
              source={require("../../assets/noUnread.png")}
              resizeMode="contain"
              style={{
                borderRadius: 40,
                marginTop: -50,
                width: 350,
                height: 350,
              }}
            />
            <Text style={{ textAlign: "center" }}>
              Henüz koleksiyonlarınıza eklediğiniz bir içerik yok.
            </Text>
          </View>
        ) : (
          <View>
            <View
              style={{
                height: 250,
                backgroundColor: "#2c2929",
                marginBottom: -80,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    marginLeft: 20,
                    marginTop: 30,
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  Koleksiyonlarınızı görmek için lütfen{" "}
                  <Text
                    style={{
                      color: "white",
                      textDecorationLine: "underline",
                      textDecorationColor: "#F3D02E",
                    }}
                  >
                    giriş yapın.
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "white",
                width: "90%",
                marginHorizontal: 20,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Giriş Yap
              </Text>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                }}
                onSubmit={onSignInPressed}
                validationSchema={validationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View>
                    <Text
                      style={{
                        marginTop: 15,
                        color: "gray",
                        fontWeight: 400,
                        marginBottom: 5,
                      }}
                    >
                      E-posta Adresiniz <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      selectionColor={theme.colors.primary}
                      underlineColor="transparent"
                      mode="outlined"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={{ color: "red" }}>{errors.email}</Text>
                    )}
                    <Text
                      style={{
                        marginTop: 10,
                        color: "gray",
                        fontWeight: 400,
                        marginBottom: 5,
                      }}
                    >
                      Şifreniz<Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      selectionColor={theme.colors.primary}
                      underlineColor="transparent"
                      mode="outlined"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry
                    />
                    {touched.password && errors.password && (
                      <Text style={{ color: "red", marginTop: 5 }}>
                        {errors.password}
                      </Text>
                    )}

                    <View style={{ width: 100, marginTop: 10 }}>
                      <Button
                        onPress={handleSubmit}
                        style={{ backgroundColor: "#F3D02E" }}
                      >
                        Giriş Yap
                      </Button>
                    </View>
                  </View>
                )}
              </Formik>
              <View>
                <Text style={{ color: "gray", marginTop: 10 }}>
                  Henüz Webrazzi üyesi değil misiniz? Üyeliğinizi başlatın.
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  onPress={() => navigation.navigate("SignUp")}
                  style={{
                    backgroundColor: "gray",
                    width: "30%",
                    height: 35,
                  }}
                >
                  <Text style={{ color: "white" }}>Üye Ol</Text>
                </Button>
                {Warning ? (
                  <Text style={{ color: "red" }}>Kullanıcı bulunamadı</Text>
                ) : null}
                {WarningCred ? (
                  <Text style={{ color: "red" }}>
                    Hatalı şifre veya kullanıcı adı
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 6,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
});
export default Library;
