import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "./Typography";

interface BagdeRatingProps {
  title: string;
  style?: ViewStyle;
}

const BagdeRating: React.FC<BagdeRatingProps> = ({ title, style }) => {
  const containerStyle: ViewStyle = {
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    width: "100%",
    ...style,
  };

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["#7210FF", "#9D59FF"]}
      style={containerStyle}
    >
      <View>
        <Typography type="button" style={styles.titleGradient}>
          {title}
        </Typography>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  titleGradient: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});

export default BagdeRating;
