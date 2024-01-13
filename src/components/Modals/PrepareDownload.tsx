import { View, StyleSheet } from "react-native";
import React from "react";
import { Modal } from "../ui/Modal";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { ProgressBar } from "react-native-paper";
import CircleProgress from "../ui/CircleProgress";

interface PrepareDownloadProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  episodeNumber: number;
}

export default function PrepareDownload({
  visible,
  setVisible,
  episodeNumber,
}: PrepareDownloadProps) {
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      animationType="fade"
      full
      close={true}
    >
      <View style={styles.container}>
        <Typography type="title" gradient={true} style={styles.title}>
          Prepare
        </Typography>
        <Typography style={styles.subtitle}>
          Episode {episodeNumber} is being prepared for download... Please wait
          or hide the process
        </Typography>
        <View style={{ marginBottom: 24 }}>
          <CircleProgress />
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
