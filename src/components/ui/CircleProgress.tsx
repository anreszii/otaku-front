import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { CircleProgress as Circle } from "../../icons";

export default function CircleProgress() {
  const spinValue = useRef(new Animated.Value(0.01)).current;
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
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
