import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import Typography from "./Typography";
import { TextStyle } from "react-native";

interface OutlineTypographyProps {
  children: React.ReactNode;
  style: TextStyle;
  type: string;
}

const OutlineTypography: FC<OutlineTypographyProps> = ({
  children,
  style,
  type,
}) => {
  if (type === "title") {
    return (
      <View style={styles.outlinedText}>
        <View style={styles.containerTitleOut}>
          <Typography type="title" style={{ ...styles.titleOut, ...style }}>
            {children}
          </Typography>
        </View>
      </View>
    );
  } else if (type === "regular") {
    return (
      <View style={styles.outlinedText}>
        <View style={styles.containerTitleOut}>
          <Typography type="regular" style={{ ...styles.titleOut, ...style }}>
            {children}
          </Typography>
        </View>
      </View>
    );
  } else if (type === "bold") {
    return (
      <View style={styles.outlinedText}>
        <View style={styles.containerTitleOut}>
          <Typography type="bold" style={{ ...styles.titleOut, ...style }}>
            {children}
          </Typography>
        </View>
      </View>
    );
  } else if (type === "semibold") {
    return (
      <View style={styles.outlinedText}>
        <View style={styles.containerTitleOut}>
          <Typography type="semibold" style={{ ...styles.titleOut, ...style }}>
            {children}
          </Typography>
        </View>
      </View>
    );
  } else if (type === "medium") {
    return (
      <View style={styles.outlinedText}>
        <View style={styles.containerTitleOut}>
          <Typography type="medium" style={{ ...styles.titleOut, ...style }}>
            {children}
          </Typography>
        </View>
      </View>
    );
  }
};

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
    borderRadius: 12,
    borderColor: "#7210FF",
    borderWidth: 2,
  },
});

export default OutlineTypography;
