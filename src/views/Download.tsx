import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React from "react";
import Typography from "../components/ui/Typography";
import Header from "../components/Layouts/Header";
import { Search } from "../icons";

export default function Download() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Download" icon={<Search color="#000" />} />
      <View style={styles.imageContent}>
        <Image
          source={require("../../assets/downlNone.png")}
          style={styles.noneImage}
        />
        <View style={styles.noneTextContent}>
          <Typography gradient={true} type="title" style={styles.noneTitle}>
            Your Download is Empty
          </Typography>
          <Typography style={styles.noneSubtitle}>
            Looks like you haven't downloaded anime at all
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
