import React, { useState } from "react";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../core/theme";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
const Profile = () => {
  const [Warning, setWarning] = useState(false);

  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Lütfen şifre giriniz")
      .min(8, "Şifre en az 8 karakter olmalı"),
    fullName: Yup.string().required("Lütfen ad-soyad giriniz"),
    email: Yup.string()
      .required("Lütfen e-posta adresi giriniz")
      .email("E-posta adresi geçersiz"),
    passwordConfirmation: Yup.string()
      .required("Lütfen şifre onaylaması giriniz")
      .oneOf([Yup.ref("password"), null], "Şifreler uyuşmalı"),
  });

  const onSignUpPressed = async (values) => {
    const { email, password, fullName } = values;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await AsyncStorage.setItem("full_name", fullName);
      setTimeout(() => {
        navigation.navigate("Profile");
      }, 0);
    } catch (e) {
      setWarning(true);
      console.log(e, "error");
    }
    // user signup done with locastorage
    // try {
    //   await AsyncStorage.setItem("user_email", email);
    //   await AsyncStorage.setItem("user_password", password);
    //   await AsyncStorage.setItem("full_name", fullName);
    //   console.log("User successfully signed up");
    //   setTimeout(() => {
    //     navigation.navigate("Profile");
    //   }, 0);
    // } catch (e) {
    //   console.log(e, "Failed to save the data to the storage");
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
        <View
          style={{
            height: 300,
            backgroundColor: "#2c2929",
            marginBottom: -80,
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              marginTop: 40,
              fontSize: 35,
              fontWeight: "bold",
            }}
          >
            <Text style={{ color: "white" }}>Webrazzi dünyasına adım atın</Text>
            <View>
              <Text style={{ marginTop: 20, fontSize: 18, color: "gray" }}>
                Webrazzi ailesine katılmak için üye olun veya sosyal medya
                hesabınızla giriş yapın.
              </Text>
            </View>
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 10,
            marginBottom: 40,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Üye Ol</Text>
          <Formik
            initialValues={{
              password: "",
              passwordConfirmation: "",
              email: "",
              fullName: "",
            }}
            onSubmit={onSignUpPressed}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
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
                  Adı Soyadı <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  selectionColor={theme.colors.primary}
                  underlineColor="transparent"
                  mode="outlined"
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={{ color: "red" }}>{errors.fullName}</Text>
                )}
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
                <Text
                  style={{
                    marginTop: 10,
                    color: "gray",
                    fontWeight: 400,
                    marginBottom: 5,
                  }}
                >
                  Şifrenizi Tekrarlayın<Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  selectionColor={theme.colors.primary}
                  underlineColor="transparent"
                  mode="outlined"
                  onChangeText={handleChange("passwordConfirmation")}
                  onBlur={handleBlur("passwordConfirmation")}
                  value={values.passwordConfirmation}
                  secureTextEntry
                />
                {touched.passwordConfirmation &&
                  errors.passwordConfirmation && (
                    <Text style={{ color: "red", marginTop: 5 }}>
                      {errors.passwordConfirmation}
                    </Text>
                  )}

                <View style={{ width: 100, marginTop: 10 }}>
                  <Button
                    onPress={handleSubmit}
                    style={{ backgroundColor: "#F3D02E" }}
                    disabled={!isValid}
                  >
                    Üye Ol
                  </Button>
                </View>
                {Warning ? (
                  <Text style={{ color: "red" }}>Kayıtlı E-posta Adresi</Text>
                ) : null}
              </View>
            )}
          </Formik>
        </View>
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
