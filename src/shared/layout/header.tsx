import { Image } from "expo-image";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Header = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: "#0B1218",
        paddingHorizontal: 24,
        alignItems: "center",
      }}
    >
      <Image
        source={require("assets/aniyp.png")}
        style={{ width: 104, height: 56 }}
      />
    </View>
  );
};
