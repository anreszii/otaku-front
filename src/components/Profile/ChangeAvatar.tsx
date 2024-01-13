import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { CroppingAvatar } from "../Modals/CroppingAvatar";
import { Edit, UserDefault } from "../../icons";
import { Image } from "expo-image";

interface ChangeAvatarProps {
  avatar: any;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
  handleChangeAvatar?: () => void;
  widthAvatar?: number;
  heightAvatar?: number;
}

export const ChangeAvatar: FC<ChangeAvatarProps> = ({
  avatar,
  setAvatar,
  handleChangeAvatar,
  widthAvatar,
  heightAvatar,
}: any) => {
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
          <View
            style={
              !!widthAvatar && !!heightAvatar
                ? [
                    styles.avatar,
                    { width: widthAvatar - 2, height: heightAvatar - 2 },
                  ]
                : styles.avatar
            }
          >
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <UserDefault
                width={!!widthAvatar ? widthAvatar : 140}
                height={!!heightAvatar ? heightAvatar : 140}
              />
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
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#23292E",
    width: 138,
    height: 138,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    bottom: 0,
    right: 0,
  },
});
