import { StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import { ImageBackground } from "expo-image";
import Overlay from "../Overlay";

const PosterBackground: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <ImageBackground
      source={require("../../../assets/images/backgroundOnboarding.png")}
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

export default PosterBackground;
