import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Typography from "../components/ui/Typography";
import HeaderBack from "../components/Layouts/HeaderBack";
import { Image } from "expo-image";

export default function Nofitication() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title="Notification" />
      <View style={styles.imageContent}>
        <Image
          source={require("../../assets/notifNone.png")}
          style={styles.noneImage}
        />
        <View style={styles.noneTextContent}>
          <Typography gradient={true} type="title" style={styles.noneTitle}>
            Your Notification is Empty
          </Typography>
          <Typography style={styles.noneSubtitle}>
            They will be here very soon
          </Typography>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  imageContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  noneImage: {
    width: "80%",
    height: 380,
  },
  noneTextContent: {
    width: "80%",
  },
  noneTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  noneSubtitle: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 16,
  },
});
