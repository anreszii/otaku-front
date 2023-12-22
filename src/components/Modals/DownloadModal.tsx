import { View, StyleSheet } from "react-native";
import React from "react";
import { Modal } from "../ui/Modal";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { ProgressBar } from "react-native-paper";

export default function DownloadModal({ visible, setVisible, mb, allMB }: any) {
  return (
    <Modal visible={visible} setVisible={setVisible} animationType="fade" full>
      <View style={styles.container}>
        <Typography type="title" gradient={true} style={styles.title}>
          Download
        </Typography>
        <Typography style={styles.subtitle}>
          Episode 1 is still downloading... Please wait or hide the process
        </Typography>
        <View>
          <Typography style={styles.subtitle}>
            {mb} / {allMB} MB
          </Typography>
          <Typography style={styles.subtitle}>{(mb / allMB) * 100}%</Typography>
          <ProgressBar progress={mb / allMB} color="#7210FF" />
        </View>
        <View style={{ width: 200, height: 60 }}>
          <Button
            title="Спрятать"
            gradient={false}
            onPress={() => setVisible(false)}
          />
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
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 32,
  },
});
