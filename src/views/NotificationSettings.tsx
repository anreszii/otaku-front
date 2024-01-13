import { View, Text, SafeAreaView, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";
import HeaderBack from "../components/Layouts/HeaderBack";
import Typography from "../components/ui/Typography";

export default function NotificationSettings() {
  const [generalNotif, setGeneralNotif] = useState(false);
  const [newEpisodeNotif, setNewEpisodeNotif] = useState(false);
  const [newMovieNotif, setNewMovieNotif] = useState(false);
  const [appUpdateNotif, setAppUpdateNotif] = useState(false);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBack title="Notification" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Typography style={styles.contentTitle}>
            General Notification
          </Typography>
          <Switch
            trackColor={{ false: "#EEEEEE", true: "#7210FF" }}
            ios_backgroundColor={"#EEEEEE"}
            value={generalNotif}
            onValueChange={() => setGeneralNotif(!generalNotif)}
          />
        </View>
        <View style={styles.content}>
          <Typography style={styles.contentTitle}>New Arrival</Typography>
          <Switch
            trackColor={{ false: "#EEEEEE", true: "#7210FF" }}
            ios_backgroundColor={"#EEEEEE"}
            value={newEpisodeNotif}
            onValueChange={() => setNewEpisodeNotif(!newEpisodeNotif)}
          />
        </View>
        <View style={styles.content}>
          <Typography style={styles.contentTitle}>
            New Releases Movie
          </Typography>
          <Switch
            trackColor={{ false: "#EEEEEE", true: "#7210FF" }}
            ios_backgroundColor={"#EEEEEE"}
            value={newMovieNotif}
            onValueChange={() => setNewMovieNotif(!newMovieNotif)}
          />
        </View>
        <View style={styles.content}>
          <Typography style={styles.contentTitle}>App Updates</Typography>
          <Switch
            trackColor={{ false: "#EEEEEE", true: "#7210FF" }}
            ios_backgroundColor={"#EEEEEE"}
            value={appUpdateNotif}
            onValueChange={() => setAppUpdateNotif(!appUpdateNotif)}
          />
        </View>
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
  contentTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 25.2,
    letterSpacing: 0.2,
  },
});
