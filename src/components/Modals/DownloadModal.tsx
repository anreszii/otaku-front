import { View, StyleSheet } from "react-native";
import React from "react";
import { Modal } from "../ui/Modal";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { ProgressBar } from "react-native-paper";
import Hr from "../ui/Hr";

export default function DownloadModal({
  visible,
  setVisible,
  mb = 0,
  allMB = 0,
  episodeNumber,
}: any) {
  return (
    <Modal visible={visible} setVisible={setVisible} animationType="fade" full>
      <View style={styles.container}>
        <Typography type="title" gradient={true} style={styles.title}>
          Download
        </Typography>
        <Typography style={styles.subtitle}>
          Episode {episodeNumber} is still downloading... Please wait the
          process
        </Typography>
        <Hr />
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <Typography style={styles.subtitle} type="button">
              {Math.min(mb, allMB).toFixed(2)} / {allMB.toFixed(2)} MB
            </Typography>
            <Typography style={styles.subtitle} gradient={true}>
              {Math.min((mb / allMB) * 100, 100).toFixed(2)}%
            </Typography>
          </View>
          <View>
            <ProgressBar
              progress={mb / allMB}
              color="#7210FF"
              style={{ marginBottom: 32 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 32,
    alignSelf: "center",
    justifySelf: "center",
    borderColor: "#373D42",
    borderWidth: 1,
    borderRadius: 40,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    textAlign: "center",
    marginBottom: 32,
  },
  content: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
  },
  wrapper: {
    width: "100%",
  },
});
