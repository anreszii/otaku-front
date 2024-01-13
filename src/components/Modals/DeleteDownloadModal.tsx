import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal } from "../ui/Modal";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import Hr from "../ui/Hr";
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function DeleteDownloadModal({
  visible,
  setVisible,
  deleteItem,
  flag,
  setFlag,
  setLoading,
}: any) {
  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleDelete = async () => {
    handleVisible();
    setLoading(true);
    await FileSystem.deleteAsync(deleteItem.video_url);
    const downloads: any = await AsyncStorage.getItem("downloadsArray");
    const downloadsWithoutDeleteItem = JSON.parse(downloads).filter(
      (el: any) => el.video_url !== deleteItem.video_url
    );
    await AsyncStorage.setItem(
      "downloadsArray",
      JSON.stringify(downloadsWithoutDeleteItem)
    );
    setFlag(!flag);
  };

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      animationType="slide"
      full
      close={true}
    >
      <View style={styles.modal}>
        <View style={styles.content}>
          <Typography style={styles.title} type="title">
            Delete
          </Typography>
          <Hr />
          <Typography type="title" style={styles.subtitle}>
            Are you sure you want to delete this download?
          </Typography>
          {deleteItem && (
            <View style={styles.deleteItem}>
              <Image
                source={{ uri: deleteItem.image }}
                style={styles.downloadImage}
              />
              <View style={styles.downloadContent}>
                <Typography style={styles.downloadTitle} type="title">
                  {deleteItem.title.substring(0, 25) + "..."}
                </Typography>
                <View style={styles.downloadDataContent}>
                  <Typography
                    style={styles.episodeTitle}
                  >{`Episode ${deleteItem.episode}`}</Typography>
                  <View style={styles.voiceContent}>
                    <Typography style={styles.voiceTitle} gradient={true}>
                      {deleteItem.voice}
                    </Typography>
                  </View>
                </View>
                <View style={styles.bottomContent}>
                  <View style={styles.memoryContent}>
                    <Typography
                      style={styles.memoryTitle}
                      gradient={true}
                    >{`${deleteItem.memory} MB`}</Typography>
                  </View>
                </View>
              </View>
            </View>
          )}
          <Hr />
          <View style={styles.buttonContent}>
            <Button
              title="Cancel"
              gradient={false}
              style={styles.buttonCancel}
              onPress={() => handleVisible()}
            />
            <Button
              title="Yes, Delete"
              style={styles.buttonDelete}
              onPress={() => handleDelete()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#FFF",
    marginTop: "auto",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingBottom: 40,
    borderColor: "#373D42",
    borderWidth: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
    color: "#F75555",
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    width: "80%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  buttonCancel: {
    width: "40%",
    marginRight: 12,
  },
  buttonDelete: {
    width: "40%",
  },
  deleteItem: {
    width: "80%",
    flexDirection: "row",
    marginBottom: 24,
  },
  downloadItem: {
    flexDirection: "row",
    marginTop: 24,
  },
  downloadContent: {
    width: "55%",
    justifyContent: "space-between",
  },
  downloadDataContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  downloadImage: {
    width: "45%",
    height: 113,
    borderRadius: 10,
    marginRight: 20,
  },
  downloadTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  episodeTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginRight: 12,
    letterSpacing: 0.2,
  },
  voiceTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
    padding: 4,
  },
  voiceContent: {
    backgroundColor: "rgba(114, 16, 255, 0.08)",
    borderRadius: 10,
  },
  memoryTitle: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 10,
  },
  memoryContent: {
    width: "50%",
    borderRadius: 10,
    backgroundColor: "rgba(114, 16, 255, 0.08)",
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignItems: "center",
  },
});
