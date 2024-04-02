import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { CroppingAvatar } from "features/modals";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";

interface PickAvatarProps {
  avatar: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
}

export const PickAvatar = ({ avatar, setAvatar }: PickAvatarProps) => {
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
      setUri(result.assets[0].uri);
    }
  };

  return (
    <>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={pickImage}>
          <View style={[styles.avatar, avatar ? { overflow: "hidden" } : {}]}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <Image
                source={require("assets/avatar.png")}
                style={styles.avatarImage}
              />
            )}
          </View>
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
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#23292E",
    width: 140,
    height: 140,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});
