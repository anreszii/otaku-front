import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect } from "react";
import { CircleProgress as Circle } from "../../icons";

export default function CircleProgress() {
  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  useEffect(() => {
    spin();
  }, []);

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Circle style={{}} />
    </Animated.View>
  );
}
