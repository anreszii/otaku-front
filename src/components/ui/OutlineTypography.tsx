import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Typography from "./Typography";

export default function OutlineTypography(
  { children }: any,
  style: any,
  type?: any
) {
  if (type === "button") {
    return (
      <View style={styles.outlinedText}>
        <View style={styles.containerTitleOut}>
          <Typography type="button" style={{ ...styles.titleOut, ...style }}>
            {children}
          </Typography>
        </View>
      </View>
    );
  } else if (type === "title") {
    return (
      <View style={styles.outlinedText}>
        <View style={styles.containerTitleOut}>
          <Typography type="title" style={{ ...styles.titleOut, ...style }}>
            {children}
          </Typography>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.outlinedText}>
        <View style={styles.containerTitleOut}>
          <Typography type="sub" style={{ ...styles.titleOut, ...style }}>
            {children}
          </Typography>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerTitleOut: {
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  titleOut: {
    color: "#7210FF",
  },
  outlinedText: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderColor: "#7210FF",
    borderWidth: 2,
  },
});
