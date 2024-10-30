import { Image } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface IntroProps {
  setIsIntro: (value: boolean) => void;
}

const Intro: React.FC<IntroProps> = ({ setIsIntro }) => {
  const logoScale = useSharedValue(1);
  const screenOpacity = useSharedValue(1);

  React.useEffect(() => {
    setTimeout(() => {
      logoScale.value = withTiming(10, {
        duration: 900,
        easing: Easing.inOut(Easing.exp),
      });
      screenOpacity.value = withTiming(0, {
        duration: 900,
        easing: Easing.inOut(Easing.exp),
      });
    }, 300);

    setTimeout(() => {
      setIsIntro(false);
    }, 1200);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: screenOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={require("../../../assets/images/otakuLogo.png")}
        style={styles.letter}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B1218",
  },
  letter: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").height * 0.25,
  },
});

export default Intro;
