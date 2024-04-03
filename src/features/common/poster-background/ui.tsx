import { StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import { ImageBackground } from "expo-image";
import Overlay from "shared/ui/overlay";

export const PosterBackground = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <ImageBackground
      source={require("assets/backgroundOnboarding.png")}
      style={styles.container}
    >
      <Overlay />
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181A20",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
});
