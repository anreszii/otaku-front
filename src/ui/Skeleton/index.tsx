import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface SkeletonProps {
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({ style }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0.5, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      ),
    };
  });

  return <Animated.View style={[styles.skeleton, style, animatedStyle]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#2A2A2A",
    borderRadius: 4,
  },
});
