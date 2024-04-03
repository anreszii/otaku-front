import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { PickAvatar } from "components/pick-avatar";

export const FillAvatar = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <PickAvatar avatar={avatar} setAvatar={setAvatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignItems: "center",
  },
  avatar: {
    width: 140,
    height: 140,
  },
});
