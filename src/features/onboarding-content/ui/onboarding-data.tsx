import { View, Animated, StyleSheet } from "react-native";
import React from "react";
import { TypographyComponent } from "shared/index";

type Props = {
  title: string;
  description: string;
};

export const OnboardingData = ({ title, description }: Props) => {
  const AnimatedText = Animated.createAnimatedComponent(TypographyComponent);

  return (
    <>
      <View>
        <AnimatedText style={[styles.instructionText, styles.instructionTitle]}>
          {title}
        </AnimatedText>
      </View>
      <View>
        <AnimatedText
          style={[styles.instructionText, styles.instructionDescription]}
        >
          {description}
        </AnimatedText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181A20",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  carousel: {
    flexGrow: 0,
    marginBottom: 35,
  },
  paginationContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 40,
  },
  instructionContainer: {
    width: "90%",
    backgroundColor: "#2B3033",
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "rgba(238, 238, 238, 0.1)",
    paddingTop: 20,
    paddingHorizontal: 5,
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  instructionText: {
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
    justifyContent: "flex-end",
  },
  instructionTitle: {
    fontWeight: "600",
    fontSize: 20,
  },
  instructionDescription: {
    opacity: 0.6,
    fontWeight: "500",
    fontSize: 16,
  },
  spacing: {
    justifyContent: "space-between",
  },
});
