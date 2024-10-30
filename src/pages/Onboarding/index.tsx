import { View, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Button } from "ui";
import { OnboardingData, OnboardingDots, PosterBackground } from "./components";
import { instructions } from "./data";
import { InstructionItem } from "./types";
import useStorage from "shared/hooks/useStorage";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";
import {
  withSequence,
  withTiming,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

interface RenderItemProps {
  item: InstructionItem;
  index: number;
}

const ANIMATION_CONFIG = {
  POSITION_DURATION: 300,
  OPACITY_DURATION: 200,
  SPRING_DAMPING: 10,
  INITIAL_POSITION: 40,
  ANIMATION_POSITION: -20,
};

const Onboarding: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<Carousel<InstructionItem> | null>(null);
  const { setValue } = useStorage("seeOnboarding", false);
  const navigation = useTypedNavigation();

  const animations = Array(3)
    .fill(null)
    .map(() => ({
      position: useSharedValue(ANIMATION_CONFIG.INITIAL_POSITION),
      opacity: useSharedValue(0),
    }));

  const handleAnimation = (index: number) => {
    const { position, opacity } = animations[index];
    position.value = ANIMATION_CONFIG.INITIAL_POSITION;
    opacity.value = 0;

    position.value = withSequence(
      withTiming(ANIMATION_CONFIG.ANIMATION_POSITION, {
        duration: ANIMATION_CONFIG.POSITION_DURATION,
      }),
      withSpring(0, { damping: ANIMATION_CONFIG.SPRING_DAMPING })
    );

    opacity.value = withTiming(index === 1 ? 0.6 : 1, {
      duration: ANIMATION_CONFIG.OPACITY_DURATION,
    });
  };

  const handleNavigation = () => {
    setValue(true);
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  };

  const handleButtonPress = (isLast: boolean) => {
    setActiveSlide(activeSlide + 1);
    if (isLast) {
      handleNavigation();
    } else {
      carouselRef.current?.snapToNext();
    }
  };

  const renderItem = ({ item, index }: RenderItemProps) => {
    const isLast = index === instructions.length - 1;
    animations.forEach((_, i) => handleAnimation(i));

    return (
      <View style={styles.itemContent}>
        <OnboardingData title={item.title} description={item.description} />
        <Button
          style={styles.button}
          variant="contain"
          title={isLast ? "Начать" : "Далее"}
          onPress={() => handleButtonPress(isLast)}
        />
      </View>
    );
  };

  return (
    <PosterBackground>
      <View style={styles.instructionContainer}>
        <Pagination
          dotsLength={instructions.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          renderDots={OnboardingDots}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <Carousel
          ref={carouselRef}
          data={instructions}
          renderItem={renderItem}
          sliderWidth={320}
          itemWidth={300}
          sliderHeight={120}
          itemHeight={100}
          onSnapToItem={setActiveSlide}
          containerCustomStyle={styles.carousel}
        />
      </View>
    </PosterBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "60%",
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
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "rgba(238, 238, 238, 0.1)",
    paddingTop: 20,
    paddingHorizontal: 5,
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  itemContent: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 250,
  },
});

export default Onboarding;
