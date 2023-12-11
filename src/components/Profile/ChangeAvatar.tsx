import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { CroppingAvatar } from "../Modals/CroppingAvatar";
import { Edit, UserDefault } from "../../icons";

export function ChangeAvatar({ avatar, setAvatar }: any) {
  const [uri, setUri] = useState("");
  const [visible, setVisible] = useState(true);
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 0,
      base64: true,
    });

    if (!result.canceled) {
      setVisible(true);
      setAvatar(result.assets[0].uri);
      setUri(result.assets[0].uri);
    }
  };

  return (
    <>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.avatar}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <UserDefault />
            )}
          </View>
          <Edit style={styles.edit} />
        </TouchableOpacity>
      </View>
      {uri !== "" && (
        <CroppingAvatar
          visible={visible}
          setVisible={setVisible}
          setAvatar={setAvatar}
          uri={uri}
          width={SCREEN_WIDTH}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: "#23292E",
    width: 138,
    height: 138,
    borderRadius: 100,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 12,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarLabel: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
  edit: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
