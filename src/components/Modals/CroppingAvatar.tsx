import { View, StyleSheet, Dimensions } from "react-native";
import Crop from "react-native-avatar-crop";
import React, { useState } from "react";
import {
  manipulateAsync,
  FlipType,
  SaveFormat,
  ActionCrop,
} from "expo-image-manipulator";
import { Modal } from "../ui/Modal";
import Button from "../ui/Button";
import { t } from "i18next";

export function CroppingAvatar({
  visible,
  setVisible,
  setAvatar,
  uri,
  width,
}: any) {
  let crop: any;

  const croppingImage = async () => {
    const cropped = await crop();
    const result: any = await manipulateAsync(
      uri,
      [
        {
          crop: {
            height: cropped.displaySize.height,
            width: cropped.displaySize.width,
            originX: cropped.offset.x,
            originY: cropped.offset.y,
          },
        },
      ],
      { format: SaveFormat.JPEG }
    );
    setAvatar(result.uri);
    setVisible(false);
  };

  return (
    <Modal visible={visible} setVisible={() => {}} animationType="fade" full>
      <View style={styles.container}>
        <Crop
          source={{ uri }}
          cropShape={"circle"}
          width={width - 35}
          height={width - 50}
          cropArea={{ width: width - 35, height: width - 50 }}
          onCrop={(cropCallback) => (crop = cropCallback)}
          backgroundColor={"#ffffff"}
          maxZoom={3}
          opacity={0.7}
          resizeMode={"contain"}
        />
        <Button
          title={t("buttons.crop")}
          onPress={() => croppingImage()}
          style={{ marginTop: 10, marginBottom: 12 }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#1F2325",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 16,
    alignSelf: "center",
    justifySelf: "center",
    borderRadius: 24,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    opacity: 0.6,
    marginBottom: 22,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
});
