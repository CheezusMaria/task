import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../core/theme";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import Header from "../../components/Header";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  // const [Cookie, setCookie] = useState("false");
  const {
    userToken,
    setUserToken,
    signOut: signOutFromContext,
  } = useContext(AuthContext);
  const [Warning, setWarning] = useState(false);
  const [ShowProfile, setShowProfile] = useState(false);
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
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    if (userToken) {
      setShowProfile(true);
    }
  }, [userToken]);

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
    // try {
    //   const storedEmail = await AsyncStorage.getItem("user_email");
    //   const storedPassword = await AsyncStorage.getItem("user_password");
    //   const storedFullName = await AsyncStorage.getItem("full_name");
    //   console.log(
    //     storedEmail,
    //     storedPassword,
    //     "data coming from local storage"
    //   );
    //   if (!storedEmail || !storedPassword) {
    //     console.log("No stored data");
    //     setWarning(true);
    //     setTimeout(() => {
    //       setWarning(false);
    //     }, 2000);
    //   } else if (email === storedEmail && password === storedPassword) {
    //     // const token = Math.random().toString(36).substring(2, 15);
    //     // await AsyncStorage.setItem("@login_token", token);
    //     setCookie("true");
    //     const settedCookie = await AsyncStorage.setItem("cookie", "true");

    //     setUserFullName(storedFullName);
    //     setUserEmailAdress(storedEmail);

    //     console.log("User successfully signed in");
    //   } else {
    //     setCookie(false);
    //     console.log("Invalid login credentials.");
    //     setWarningCred(true);
    //     setTimeout(() => {
    //       setWarningCred(false);
    //     }, 2000);
    //   }
    // } catch (e) {
    //   console.log("error", e);
    // }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ececec",
      }}
    >
      <Header showNotiIcon={false} showSearchIcon={false}></Header>
      <ScrollView
        style={{
          flex: 1,
          alignSelf: "stretch",
        }}
      >
        {ShowProfile ? (
          <View>
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
                <Text style={{ color: "#F3D02E" }}>Profil Bilgileri</Text>
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 30,
                  color: "white",
                  marginTop: 10,
                }}
              >
                {UserFullName}
              </Text>
            </View>

            <View style={{ marginTop: 100, paddingHorizontal: 50 }}>
              <Text style={{ marginVertical: 3 }}>E-posta Adresi</Text>
              <TextInput
                style={styles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                value={UserEmailAdress}
                editable={false}
              />
              {/* <Text style={{ marginVertical: 3 }}>Adı Soyadı</Text>

              <TextInput
                style={styles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                value={UserFullName}
                editable={false}
              /> */}
              <Button
                onPress={async () => {
                  try {
                    await signOut(auth);

                    setUserToken(null);
                    setUserEmailAdress(null);
                    setShowProfile(false);

                    await AsyncStorage.removeItem("userToken");
                    await AsyncStorage.removeItem("cookie");
                  } catch (error) {
                    console.error("Error during sign out:", error);
                  }
                }}
                style={{ backgroundColor: "#F3D02E", marginTop: 8 }}
              >
                Çıkış Yap
              </Button>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                height: 300,
                backgroundColor: "#2c2929",
                marginBottom: -80,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    marginLeft: 10,
                    marginTop: 40,
                    fontSize: 35,
                    fontWeight: "bold",
                  }}
                >
                  Webrazzi dünyasına adım atın
                </Text>
                <View>
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 18,
                      marginLeft: 10,
                      color: "gray",
                    }}
                  >
                    Giriş yaparak etkinlik ve kampanyalarda üyelik
                    avantajlarından faydalanın, size özel gelişmelerden haberdar
                    olun.
                  </Text>
                </View>
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
                  style={{ backgroundColor: "gray", width: "30%", height: 35 }}
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
export default Profile;
