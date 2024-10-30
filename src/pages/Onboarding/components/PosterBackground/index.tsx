import { StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import { ImageBackground } from "expo-image";
import { Overlay } from "ui";

export const PosterBackground = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <ImageBackground
      source={require("../../../../../assets/images/backgroundOnboarding.png")}
      style={styles.container}
      cachePolicy="memory-disk"
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
