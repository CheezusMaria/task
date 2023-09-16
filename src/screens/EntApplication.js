import React, { useState } from "react";
import { View, Text } from "react-native";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native";
import { emailValidator, inputValidator } from "../../helpers/validators";
import TextInput from "../../components/TextInput";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
const EntApplication = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().min(1).required("Bu alan zorunludur"),
    email: Yup.string().min(1).required("Bu alan zorunludur"),
    entName: Yup.string().min(1).required("Bu alan zorunludur"),
    coFounders: Yup.string().min(1).required("Bu alan zorunludur"),
    categorie: Yup.string().min(1).required("Bu alan zorunludur"),
    appLink: Yup.string().min(1).required("Bu alan zorunludur"),
    shortDesc: Yup.string().min(1).required("Bu alan zorunludur"),
    releaseDate: Yup.string().min(1).required("Bu alan zorunludur"),
    details: Yup.string().min(1).required("Bu alan zorunludur"),
  });

  const sendEntApplication = async (values) => {
    try {
      console.log(values.fullName);

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
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
          paddingHorizontal: 20,
        }}
      >
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            entName: "",
            coFounders: "",
            categorie: "",
            appLink: "",
            shortDesc: "",
            releaseDate: "",
            details: "",
          }}
          onSubmit={sendEntApplication}
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
              <Text style={{ fontSize: 28, fontWeight: 700, marginTop: 20 }}>
                Girişim Formu
              </Text>
              <Text style={{ color: "gray", fontSize: 18, marginTop: 10 }}>
                Girişiminizin Webrazzi'de haber olarak değerlendirilmesini
                istiyorsanız, bu formu doldurabilirsiniz.
              </Text>
              <Text style={{ marginTop: 15, color: "gray", fontWeight: 400 }}>
                Adınız ve Soyadınız <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {errors.fullName}
                </Text>
              )}
              <Text style={{ marginTop: 15, color: "gray", fontWeight: 400 }}>
                E-posta Adresiniz <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}
              <Text style={{ marginTop: 15, color: "gray", fontWeight: 400 }}>
                Girişiminizin Adı<Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={handleChange("entName")}
                onBlur={handleBlur("entName")}
                value={values.entName}
              />
              {touched.entName && errors.entName && (
                <Text style={{ color: "red" }}>{errors.entName}</Text>
              )}

              <Text style={{ marginTop: 15, color: "gray", fontWeight: 400 }}>
                Girişimin Kurucular<Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={handleChange("coFounders")}
                onBlur={handleBlur("coFounders")}
                value={values.coFounders}
              />
              {touched.coFounders && errors.coFounders && (
                <Text style={{ color: "red" }}>{errors.coFounders}</Text>
              )}

              <Text style={{ marginTop: 15, color: "gray", fontWeight: 400 }}>
                Girişim Kategorisi (Örnek : Pazaryeri)
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={handleChange("categorie")}
                onBlur={handleBlur("categorie")}
                value={values.categorie}
              />
              {touched.categorie && errors.categorie && (
                <Text style={{ color: "red" }}>{errors.categorie}</Text>
              )}

              <Text style={{ marginTop: 15, color: "gray", fontWeight: 400 }}>
                Web sites ya da uygulama linki
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={handleChange("appLink")}
                onBlur={handleBlur("appLink")}
                value={values.appLink}
              />
              {touched.appLink && errors.appLink && (
                <Text style={{ color: "red" }}>{errors.appLink}</Text>
              )}

              <Text style={{ marginTop: 15, color: "gray", fontWeight: 400 }}>
                Girişiminizi kısaca anlatır mısınız?
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={handleChange("shortDesc")}
                onBlur={handleBlur("shortDesc")}
                value={values.shortDesc}
              />
              {touched.shortDesc && errors.shortDesc && (
                <Text style={{ color: "red" }}>{errors.shortDesc}</Text>
              )}

              <Text style={{ marginTop: 15, color: "gray", fontWeight: 400 }}>
                Girişim yayındaysa ne zaman yayına alındı?
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={handleChange("releaseDate")}
                onBlur={handleBlur("releaseDate")}
                value={values.releaseDate}
              />
              {touched.releaseDate && errors.releaseDate && (
                <Text style={{ color: "red" }}>{errors.releaseDate}</Text>
              )}

              <Text style={{ marginTop: 15, color: "gray", fontWeight: 400 }}>
                Yatırım aldıysa, detayları paylaşır mısınız?
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={handleChange("details")}
                onBlur={handleBlur("details")}
                value={values.details}
              />
              {touched.details && errors.details && (
                <Text style={{ color: "red" }}>{errors.details}</Text>
              )}

              <View style={{ width: 100, marginTop: 20 }}>
                <Button
                  style={{ backgroundColor: "#F3D02E" }}
                  mode="contained"
                  onPress={handleSubmit}
                >
                  Gönder
                </Button>
              </View>

              <Text style={{ color: "gray", fontSize: 14, marginVertical: 20 }}>
                Bu form sadece yeni girişim incelemeleri için kullanılmaktadır .
                Eğer Webrazzi yazarlarının değerlendirmesi için girişiminizle
                ilgili haber göndermek istiyorsanız, bulten@webrazzi . com
                adresinden bize ulaşabilirsiniz .
              </Text>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EntApplication;
