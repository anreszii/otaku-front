import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import HeaderBack from "../components/Layouts/HeaderBack";
import { Trash, WiFi } from "../icons";
import Typography from "../components/ui/Typography";

export default function DownloadSettings() {
  const [wiFi, setWiFi] = useState(false);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBack title="Download" />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentData}>
            <WiFi />
            <Typography style={styles.contentTitle}>Wi-Fi Only</Typography>
          </View>
          <Switch
            trackColor={{ false: "#EEEEEE", true: "#7210FF" }}
            ios_backgroundColor={"#EEEEEE"}
            value={wiFi}
            onValueChange={() => setWiFi(!wiFi)}
          />
        </View>
        <TouchableOpacity style={styles.content}>
          <View style={styles.contentData}>
            <Trash />
            <Typography style={styles.contentTitle}>
              Delete All Downloads
            </Typography>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.content}>
          <View style={styles.contentData}>
            <Trash />
            <Typography style={styles.contentTitle}>Delete Cache</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    marginTop: 44,
    marginBottom: 72,
    marginHorizontal: 24,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
  },
  contentData: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 25.2,
    letterSpacing: 0.2,
    marginLeft: 20,
  },
});
