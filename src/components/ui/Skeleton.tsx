import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface SkeletonProps {
  width?: number;
  height?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height }) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const shimmerTranslate = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View style={{ ...styles.container, width: width, height: height }}>
      <Animated.View
        style={[
          styles.shimmer,
          { transform: [{ translateX: shimmerTranslate }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
    borderRadius: 10,
  },
  shimmer: {
    width: "50%",
    height: "100%",
    backgroundColor: "#F0F0F0",
  },
});

export default Skeleton;
