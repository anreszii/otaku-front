import { View, StyleSheet } from "react-native";
import Crop from "react-native-avatar-crop";
import {
  ImageResult,
  manipulateAsync,
  SaveFormat,
} from "expo-image-manipulator";
import { Modal } from "shared/ui/modal";
import { Button } from "shared/index";

interface CroppingAvatarProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
  uri: string;
  width: number;
}

type Crop = (quality?: number | undefined) => Promise<{
  displaySize: { height: number; width: number };
  offset: { x: number; y: number };
  size: { height: number; width: number };
}>;

export const CroppingAvatar = ({
  visible,
  setVisible,
  setAvatar,
  uri,
  width,
}: CroppingAvatarProps) => {
  let crop: Crop;

  const croppingImage = async () => {
    const cropped = await crop();
    console.log(cropped);
    const result: ImageResult = await manipulateAsync(
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
          //@ts-ignore
          onCrop={(cropCallback) => (crop = cropCallback)}
          backgroundColor={"#ffffff"}
          maxZoom={3}
          opacity={0.7}
          resizeMode={"contain"}
        />
        <Button
          variant="contain"
          title="Обрезать"
          onPress={() => croppingImage()}
          style={{ marginTop: 10, marginBottom: 12 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#1F2325",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    width: "100%",
    backgroundColor: "#23292E",
    padding: 16,
    alignSelf: "center",
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
