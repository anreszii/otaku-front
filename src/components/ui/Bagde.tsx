import { StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "./Typography";

export default function Bagde({ title, gradient, style }: any) {
  return (
    <>
      {gradient ? (
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#7210FF", "#9D59FF"]}
          style={{
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 14,
            paddingLeft: 14,
            borderRadius: 25,
            width: "100%",
            ...style,
          }}
        >
          <View style={{ margin: 2 }}>
            <Typography type="button" style={styles.titleGradient}>
              {title}
            </Typography>
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#7210FF", "#9D59FF"]}
          style={{
            width: "100%",
            height: 44,
            borderRadius: 25,
            ...style,
          }}
        >
          <View
            style={{
              borderRadius: 25,
              flex: 1,
              margin: 2,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 14,
              paddingRight: 14,
            }}
          >
            <Typography type="button" gradient={true} style={styles.titleBasic}>
              {title}
            </Typography>
          </View>
        </LinearGradient>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleGradient: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 25.2,
    letterSpacing: 0.2,
  },
  titleBasic: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 25.2,
    letterSpacing: 0.2,
  },
});
